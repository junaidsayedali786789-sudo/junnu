const products = [
  {
    id: 1,
    section: "seasonal",
    name: "Lalbagh Mango - Sindhura",
    image: "https://www.spotlessfruits.com/cdn/shop/products/LALBAUGSINDHURAMANGOES-SPOTLESSFRUITSINDIA_1000x1000.png?v=1634913021",
    oldPrice: 499,
    price: 450,
    options: ["1 KG"],
    description: "Season-first Lalbagh Sindhura mangoes for quick city delivery.",
    soldOut: false
  },
  {
    id: 2,
    section: "seasonal",
    name: "Water Chestnut Green",
    image: "https://www.spotlessfruits.com/cdn/shop/files/WaterChestnut-SpotlessFruitsIndia_2080dc3d-9a76-429a-b153-df85d2e6af09_1000x1000.png?v=1723350530",
    oldPrice: 1200,
    price: 375,
    options: ["1 KG"],
    description: "Fresh green water chestnut delivered directly to your home.",
    soldOut: false
  },
  {
    id: 3,
    section: "seasonal",
    name: "Honey Pineapple - Imported",
    image: "https://www.spotlessfruits.com/cdn/shop/files/HoneyPineapple-SpotlessFruitsIndia_1000x1000.png?v=1732181719",
    oldPrice: 2000,
    price: 1600,
    options: ["4", "6", "8", "12"],
    description: "Imported baby honey pineapples with a fragrant, sweet bite.",
    soldOut: true
  },
  {
    id: 4,
    section: "seasonal",
    name: "Mangosteen - Imported",
    image: "https://www.spotlessfruits.com/cdn/shop/files/Mangosteen-SpotlessFruitsIndia_1000x1000.png?v=1732182719",
    oldPrice: null,
    price: 950,
    options: ["500 GMS", "1 KG"],
    description: "Premium imported mangosteen for a rich tropical dessert.",
    soldOut: true
  },
  {
    id: 5,
    section: "seasonal",
    name: "Imported Alphonso Mangoes",
    image: "https://www.spotlessfruits.com/cdn/shop/files/AlphonsoMango-SouthAfrica_1000x1000.png?v=1731763381",
    oldPrice: 4000,
    price: 3400,
    options: ["12 Mangoes", "24 Mangoes"],
    description: "South African Alphonso mangoes, semi-ripe to ripe.",
    soldOut: true
  },
  {
    id: 6,
    section: "seasonal",
    name: "Longan - Imported",
    image: "https://www.spotlessfruits.com/cdn/shop/files/LONGAN-SPOTLESSFRUITSINDA_1000x1000.png?v=1723277879",
    oldPrice: 600,
    price: 300,
    options: ["500 GMS", "1 KG"],
    description: "Juicy imported longan with delicate floral sweetness.",
    soldOut: true
  },
  {
    id: 7,
    section: "premium",
    name: "Fresh Mulberry",
    image: "https://www.spotlessfruits.com/cdn/shop/products/SpotlessFruitsIndia-Mulberry_1000x1000.png?v=1621839039",
    oldPrice: 300,
    price: 180,
    options: ["100 Grams"],
    description: "Fresh imported mulberry packed for snacking and desserts.",
    soldOut: false
  },
  {
    id: 8,
    section: "premium",
    name: "Pink Guava - Imported",
    image: "https://www.spotlessfruits.com/cdn/shop/files/PinkGuava-SpotlessFruitsIndia_1000x1000.png?v=1723350424",
    oldPrice: 600,
    price: 400,
    options: ["500 GMS", "1 KG"],
    description: "Imported pink guava with soft texture and aromatic flavor.",
    soldOut: true
  },
  {
    id: 9,
    section: "premium",
    name: "Guava Melon",
    image: "https://www.spotlessfruits.com/cdn/shop/files/GUAVAMELON-SPOTLESSFRUITSINDIA_1000x1000.png?v=1741694013",
    oldPrice: 1200,
    price: 380,
    options: ["1 KG"],
    description: "A bright seasonal fruit pick for fresh fruit platters.",
    soldOut: false
  },
  {
    id: 10,
    section: "premium",
    name: "Red Cherry Imported - Chile",
    image: "https://www.spotlessfruits.com/cdn/shop/files/CherryImported-SpotlessFruits_ee806e66-9824-470f-a6dc-e370ec522e17_1000x1000.png?v=1689660035",
    oldPrice: 1400,
    price: 1200,
    options: ["500 Grams", "1 KG"],
    description: "Imported Chilean cherries for gifting, snacking and desserts.",
    soldOut: true
  },
  {
    id: 11,
    section: "berries",
    name: "Fresh Blueberry - Imported",
    image: "https://www.spotlessfruits.com/cdn/shop/products/FreshBlueberry-SpotlessFruitsIndia_1000x1000.png?v=1624076971",
    oldPrice: 499,
    price: 450,
    options: ["125 GMS"],
    description: "Fresh imported blueberries in a compact ready-to-eat pack.",
    soldOut: false
  },
  {
    id: 12,
    section: "berries",
    name: "Fresh Raspberry",
    image: "https://www.spotlessfruits.com/cdn/shop/products/SpotlessFruitsIndia-Raspberry_1000x1000.png?v=1621838617",
    oldPrice: 849,
    price: 749,
    options: ["125 Grams"],
    description: "Delicate imported raspberries for pastries and breakfast bowls.",
    soldOut: false
  },
  {
    id: 13,
    section: "berries",
    name: "Fresh Blackberry",
    image: "https://www.spotlessfruits.com/cdn/shop/products/SpotlessFruitsIndia-Blackberry_1000x1000.png?v=1621838838",
    oldPrice: 1899,
    price: 1600,
    options: ["125 Grams"],
    description: "Fresh imported blackberries with a deep, tart sweetness.",
    soldOut: false
  },
  {
    id: 14,
    section: "berries",
    name: "Fresh Strawberry - Indian",
    image: "https://www.spotlessfruits.com/cdn/shop/products/fruit_01-600x600_1000x1000.jpg?v=1616429726",
    oldPrice: null,
    price: 2500,
    options: ["1 KG", "500 GRAMS"],
    description: "Fresh Indian strawberries for smoothies, cakes and salads.",
    soldOut: true
  },
  {
    id: 15,
    section: "dry",
    name: "Kimia Dates / Kimia Khajur",
    image: "https://www.spotlessfruits.com/cdn/shop/files/KIMIADATES-SPOTLESSFRUITSINDIA_1000x1000.png?v=1726494207",
    oldPrice: 245,
    price: 190,
    options: ["500 Grams"],
    description: "Soft Kimia dates in a convenient one-box pack.",
    soldOut: false
  },
  {
    id: 16,
    section: "dry",
    name: "Premium Medjool Dates",
    image: "https://www.spotlessfruits.com/cdn/shop/files/MEDJOOLDATES-SPOTLESSFRUITSINDIA_1000x1000.png?v=1726495744",
    oldPrice: 850,
    price: 750,
    options: ["500 Grams", "1 KG"],
    description: "Jumbo Medjool dates with a rich caramel-like sweetness.",
    soldOut: true
  },
  {
    id: 17,
    section: "dry",
    name: "Premium Quality Ajwa Dates",
    image: "https://www.spotlessfruits.com/cdn/shop/files/PREMIUMQUALITYAJWADATES-SPOTLESSFRUITSINDIA_1000x1000.png?v=1726496750",
    oldPrice: 900,
    price: 725,
    options: ["500 Grams", "1 KG"],
    description: "Premium Ajwa dates curated for gifting and daily snacking.",
    soldOut: true
  },
  {
    id: 18,
    section: "dry",
    name: "Premium Roasted Salted Cashew",
    image: "https://www.spotlessfruits.com/cdn/shop/files/cashew-nuts-salted-922863_1000x1000.jpg?v=1726493503",
    oldPrice: 1200,
    price: 1050,
    options: ["500 Grams", "1 KG", "2 KG"],
    description: "Roasted salted cashews with a crisp, savory finish.",
    soldOut: true
  }
];

const grids = {
  seasonal: document.querySelector("#seasonalGrid"),
  premium: document.querySelector("#premiumGrid"),
  berries: document.querySelector("#berriesGrid"),
  dry: document.querySelector("#dryGrid")
};

const cart = new Map();
const cartDrawer = document.querySelector("#cartDrawer");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const toast = document.querySelector("#toast");

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-IN")}.00`;
}

function productCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.name = `${product.name} ${product.description}`.toLowerCase();
  card.innerHTML = `
    <span class="sale-badge">${product.soldOut ? "Sold Out" : "Sale"}</span>
    <div class="product-media">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <h3>${product.name}</h3>
    <p class="description">${product.description}</p>
    <div class="price">
      ${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ""}
      <span>${formatPrice(product.price)}</span>
    </div>
    <div class="options">${product.options.map(option => `<span>${option}</span>`).join("")}</div>
    <button data-id="${product.id}" ${product.soldOut ? "disabled" : ""}>${product.soldOut ? "Sold Out" : "Add To Cart"}</button>
  `;
  return card;
}

function renderProducts() {
  Object.values(grids).forEach(grid => {
    grid.innerHTML = "";
  });

  products.forEach(product => {
    grids[product.section].appendChild(productCard(product));
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1600);
}

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("open");
}

function updateCart() {
  const items = Array.from(cart.values());
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(total);

  if (!items.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is currently empty.</p>';
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-row">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <strong>${item.name}</strong>
        <span>${item.quantity} × ${formatPrice(item.price)}</span>
      </div>
      <button data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product || product.soldOut) return;

  const current = cart.get(product.id) || { ...product, quantity: 0 };
  current.quantity += 1;
  cart.set(product.id, current);
  updateCart();
  showToast("Product added to cart");
}

function filterProducts(term) {
  const needle = term.trim().toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    card.classList.toggle("hidden", needle && !card.dataset.name.includes(needle));
  });
}

function tickCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setDate(now.getDate() + 12);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - now);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
}

renderProducts();
updateCart();
tickCountdown();
setInterval(tickCountdown, 1000);

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-id]");
  const removeButton = event.target.closest("[data-remove]");

  if (addButton) {
    addToCart(addButton.dataset.id);
  }

  if (removeButton) {
    cart.delete(Number(removeButton.dataset.remove));
    updateCart();
  }
});

document.querySelector("#cartOpen").addEventListener("click", openCart);
document.querySelector("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelector("#searchToggle").addEventListener("click", () => {
  document.querySelector("#searchPanel").classList.toggle("open");
  document.querySelector("#searchInput").focus();
});

document.querySelector("#searchInput").addEventListener("input", event => {
  filterProducts(event.target.value);
});

document.querySelector(".menu-button").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("open");
});

document.querySelector("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast("Thanks for subscribing");
});