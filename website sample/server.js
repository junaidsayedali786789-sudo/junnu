const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(__dirname, "data");
const contactsFile = path.join(dataDir, "contacts.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(contactsFile)) fs.writeFileSync(contactsFile, "[]\n");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleContact(req, res) {
  try {
    const body = await readBody(req);
    const payload = JSON.parse(body || "{}");
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const phone = String(payload.phone || "").trim();
    const service = String(payload.service || "").trim();
    const message = String(payload.message || "").trim();

    if (!name || !isValidEmail(email) || !message) {
      sendJson(res, 400, { ok: false, message: "Please enter a name, valid email, and message." });
      return;
    }

    ensureDataFile();
    const contacts = JSON.parse(fs.readFileSync(contactsFile, "utf8") || "[]");
    contacts.push({
      id: Date.now().toString(36),
      name,
      email,
      phone,
      service,
      message,
      createdAt: new Date().toISOString()
    });
    fs.writeFileSync(contactsFile, `${JSON.stringify(contacts, null, 2)}\n`);
    sendJson(res, 201, { ok: true, message: "Thanks. Starpointmediame will contact you shortly." });
  } catch (error) {
    sendJson(res, 500, { ok: false, message: "Something went wrong. Please try again." });
  }
}

function serveStatic(req, res) {
  let requestedPath = decodeURIComponent(req.url.split("?")[0]);

  if (requestedPath === "/") requestedPath = "/index.html";
  const filePath = path.normalize(path.join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(path.join(publicDir, "404.html"), "utf8"));
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/contact") {
    handleContact(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Method not allowed");
});

server.listen(PORT, () => {
  console.log(`Starpointmediame running on localhost:${PORT}`);
});
