
const products = [
  {
    id: 1,
    name: "Modern Sofa",
    category: "Living Room",
    price: 24999,
    material: "Fabric",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    description: "A comfortable sofa for your living room."
  },
  {
    id: 2,
    name: "Wooden Bed",
    category: "Bedroom",
    price: 32999,
    material: "Wood",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    description: "Elegant design for a peaceful bedroom."
  },
  {
    id: 3,
    name: "Dining Table",
    category: "Dining",
    price: 18999,
    material: "Wood",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
    description: "A stylish table for family meals."
  },
  {
    id: 4,
    name: "Office Chair",
    category: "Office",
    price: 5999,
    material: "Fabric",
    image: "https://images.unsplash.com/photo-1505843490701-5be5d1b1a1b3?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable seating for work and study."
  },
  {
    id: 5,
    name: "Wooden Coffee Table",
    category: "Living Room",
    price: 7499,
    material: "Wood",
    image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=600&q=80",
    description: "A simple table with timeless style."
  },
  {
    id: 6,
    name: "Bedside Table",
    category: "Bedroom",
    price: 3999,
    material: "Wood",
    image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=600&q=80",
    description: "Keep your nighttime essentials nearby."
  },
  {
    id: 7,
    name: "Accent Chair",
    category: "Living Room",
    price: 8999,
    material: "Fabric",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
    description: "Add comfort and character to your space."
  },
  {
    id: 8,
    name: "Decorative Lamp",
    category: "Decor",
    price: 1999,
    material: "Metal",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "Warm lighting for a cozy home."
  }
];

let cart = [];
let currentCategory = "All";

const productList = document.getElementById("product-list");
const cartPanel = document.getElementById("cart-panel");

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function renderProducts(list = products) {
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML =
      "<p>No products found. Try another search.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.onerror = function () {
      this.style.display = "none";
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "category-name";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent =
      product.description + " Material: " + product.material + ".";

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(product.id));

    info.append(category, name, description, price, button);
    card.append(image, info);
    productList.appendChild(card);
  });
}

function filterProducts(category, button) {
  currentCategory = category;

  document.querySelectorAll(".category").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  searchProducts();
}

function searchProducts() {
  const query = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();

  const filtered = products.filter(product => {
    const matchesCategory =
      currentCategory === "All" ||
      product.category === currentCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.material.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
  cartPanel.classList.add("open");
}

function changeQuantity(id, change) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");

  cartItems.innerHTML = "";

  let count = 0;
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return;

    count += item.quantity;
    total += product.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");

    const name = document.createElement("h4");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = formatPrice(product.price * item.quantity);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.addEventListener("click", () =>
      changeQuantity(item.id, -1)
    );

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.addEventListener("click", () =>
      changeQuantity(item.id, 1)
    );

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.className = "remove-button";
    remove.addEventListener("click", () =>
      removeFromCart(item.id)
    );

    controls.append(minus, quantity, plus, remove);
    details.append(name, price, controls);
    row.appendChild(details);
    cartItems.appendChild(row);
  });

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty. Start shopping!";
  }

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent =
    formatPrice(total);

  document.getElementById("checkout-summary").textContent =
    "Order total: " + formatPrice(total);
}

function toggleCart() {
  cartPanel.classList.toggle("open");
}

function showCheckout() {
  if (cart.length === 0) {
    alert("Please add products to your cart first.");
    return;
  }

  cartPanel.classList.remove("open");

  const checkout = document.getElementById("checkout");
  checkout.classList.add("visible");
  document.getElementById("checkout-summary").textContent =
    "Order total: " + formatPrice(
      cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
      }, 0)
    );

  checkout.scrollIntoView({ behavior: "smooth" });
}

function placeOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const customer = document.getElementById("customer-name").value;
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  alert(
    "Thank you, " + customer + "!\n" +
    "Your demo order has been placed.\n" +
    "Order total: " + formatPrice(total) +
    "\nThis is a demonstration only."
  );

  cart = [];
  renderCart();
  document.getElementById("checkout-form").reset();
  document.getElementById("checkout").classList.remove("visible");
  document.getElementById("home").scrollIntoView({
    behavior: "smooth"
  });
}

function sendMessage(event) {
  event.preventDefault();

  alert(
    "Thank you, " +
    document.getElementById("contact-name").value +
    "! Your demo message has been received."
  );

  event.target.reset();
}

renderProducts();
renderCart();
