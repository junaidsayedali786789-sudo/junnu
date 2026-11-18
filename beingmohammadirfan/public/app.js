(function () {
  const modal = document.getElementById("donationModal");
  const form = document.getElementById("donationForm");
  const result = document.getElementById("paymentResult");
  const purposeInput = document.getElementById("donationPurpose");
  const amountInput = document.getElementById("amount");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  let submitMode = "checkout";

  function setResult(message, tone) {
    result.className = `payment-result ${tone || ""}`;
    result.innerHTML = message;
  }

  function getDonationPayload() {
    const formData = new FormData(form);
    return {
      donorName: formData.get("donorName") || "Kind supporter",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      amount: Number(formData.get("amount")),
      message: formData.get("message") || "General donation"
    };
  }

  async function requestJson(url, options) {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }

  async function startCheckout(payload) {
    if (!window.Razorpay) {
      throw new Error("Razorpay checkout did not load. Please check your internet connection.");
    }

    const [config, order] = await Promise.all([
      requestJson("/api/payments/config"),
      requestJson("/api/payments/order", {
        method: "POST",
        body: JSON.stringify(payload)
      })
    ]);

    if (!config.keyId) {
      throw new Error("Razorpay key is missing on the server.");
    }

    const checkout = new window.Razorpay({
      key: config.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "SUPPOREM.org",
      description: payload.message,
      order_id: order.orderId,
      prefill: {
        name: payload.donorName,
        email: payload.email,
        contact: payload.phone
      },
      notes: {
        donationId: order.donationId,
        receipt: order.receipt
      },
      theme: { color: "#4b137d" },
      handler: async function (response) {
        await requestJson("/api/payments/verify", {
          method: "POST",
          body: JSON.stringify(response)
        });
        setResult("Thank you. Your donation has been verified successfully.", "success");
      }
    });

    checkout.open();
  }

  async function generateQr(payload) {
    const qr = await requestJson("/api/payments/qr", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    setResult(
      `<strong>Scan this QR to donate Rs ${qr.amount}</strong><img class="generated-qr" src="${qr.imageUrl}" alt="Generated UPI QR code">`,
      "success"
    );
  }

  document.querySelectorAll("[data-open-donate]").forEach((button) => {
    button.addEventListener("click", () => {
      purposeInput.value = button.dataset.purpose || "General donation";
      setResult("", "");
      modal.showModal();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => modal.close());
  });

  document.querySelectorAll("[data-amount]").forEach((button) => {
    button.addEventListener("click", () => {
      amountInput.value = button.dataset.amount;
    });
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      submitMode = button.dataset.mode;
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = getDonationPayload();

    if (!payload.amount || payload.amount < 10) {
      setResult("Please enter a donation amount of at least Rs 10.", "error");
      return;
    }

    setResult("Preparing your donation...", "");
    try {
      if (submitMode === "qr") {
        await generateQr(payload);
      } else {
        await startCheckout(payload);
      }
    } catch (error) {
      setResult(error.message, "error");
    }
  });

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
})();
