const glow = document.querySelector(".cursor-glow");

if (glow) {
  window.addEventListener("pointermove", event => {
    glow.style.transform = `translate(${event.clientX - 160}px, ${event.clientY - 160}px)`;
  });
}

const form = document.querySelector("#contactForm");
const statusBox = document.querySelector("#formStatus");

if (form && statusBox) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    statusBox.textContent = "Sending...";
    statusBox.className = "form-status";

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      statusBox.textContent = result.message;
      statusBox.classList.add(result.ok ? "success" : "error");
      if (result.ok) form.reset();
    } catch (error) {
      statusBox.textContent = "Network error. Please try again.";
      statusBox.classList.add("error");
    }
  });
}
