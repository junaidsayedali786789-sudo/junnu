(function () {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });

  const tokenInput = document.getElementById("adminToken");
  const saveToken = document.getElementById("saveToken");
  const recentRows = document.getElementById("recentRows");
  const categoryBars = document.getElementById("categoryBars");

  function authHeaders() {
    const token = localStorage.getItem("supportemAdminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function setText(id, value) {
    document.getElementById(id).textContent = value;
  }

  function formatDate(value) {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  async function loadDashboard() {
    recentRows.innerHTML = '<tr><td colspan="5">Loading dashboard...</td></tr>';
    const response = await fetch("/api/dashboard/summary", { headers: authHeaders() });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Could not load dashboard");
    }

    const pending =
      (data.totals.byStatus.created?.count || 0) +
      (data.totals.byStatus.qr_created?.count || 0);

    setText("totalRaised", formatter.format(data.totals.paidAmount || 0));
    setText("paidDonations", data.totals.paidDonations || 0);
    setText("allDonations", data.totals.donations || 0);
    setText("pendingDonations", pending);

    recentRows.innerHTML = data.recentDonations.length
      ? data.recentDonations
          .map(
            (donation) => `
              <tr>
                <td>${donation.donorName || "Kind supporter"}</td>
                <td>${formatter.format(donation.amount || 0)}</td>
                <td><span class="status ${donation.status}">${donation.status}</span></td>
                <td>${donation.message || "General support"}</td>
                <td>${formatDate(donation.createdAt)}</td>
              </tr>
            `
          )
          .join("")
      : '<tr><td colspan="5">No donations recorded yet.</td></tr>';

    const max = Math.max(...data.categories.map((item) => item.amount), 1);
    categoryBars.innerHTML = data.categories.length
      ? data.categories
          .map((item) => {
            const width = Math.max(8, Math.round((item.amount / max) * 100));
            return `
              <div class="category-bar">
                <div>
                  <strong>${item.name}</strong>
                  <span>${item.count} donations - ${formatter.format(item.amount)}</span>
                </div>
                <i style="width: ${width}%"></i>
              </div>
            `;
          })
          .join("")
      : "<p>No category data yet.</p>";
  }

  saveToken.addEventListener("click", async () => {
    localStorage.setItem("supportemAdminToken", tokenInput.value.trim());
    try {
      await loadDashboard();
    } catch (error) {
      recentRows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
    }
  });

  tokenInput.value = localStorage.getItem("supportemAdminToken") || "";
  loadDashboard().catch((error) => {
    recentRows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  });
})();
