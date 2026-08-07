/**
 * Resto de la Bodega - Carta Digital
 * Versión propia, limpia y sin dependencias de pago
 */

(function () {
  "use strict";

  // ===== Overrides del panel admin (localStorage) =====
  const OVERRIDES_KEY = "bodega_menu_overrides";
  const CONFIG_KEY = "bodega_config";

  function loadOverrides() {
    try {
      return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function loadConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
      if (saved) return saved;
    } catch {}
    return {
      showPrices: typeof SHOW_PRICES !== "undefined" ? SHOW_PRICES : true,
      showCart: typeof SHOW_CART !== "undefined" ? SHOW_CART : true,
      whatsapp: typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "",
    };
  }

  const overrides = loadOverrides();
  const config = loadConfig();

  // Menú efectivo = datos base + cambios del admin
  function getEffectiveMenu() {
    return MENU_DATA.map((item) => {
      const ov = overrides[item.id] || {};
      return {
        ...item,
        precio: ov.precio != null ? ov.precio : item.precio,
        hidden: ov.hidden != null ? ov.hidden : item.hidden,
      };
    });
  }

  // ===== Estado =====
  let cart = JSON.parse(localStorage.getItem("cart_bodega") || "{}");

  // ===== Utilidades =====
  function formatPrice(value) {
    if (value == null || isNaN(Number(value))) return "";
    return "$" + Math.floor(Number(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function saveCart() {
    localStorage.setItem("cart_bodega", JSON.stringify(cart));
    updateCartUI();
  }

  function getCartCount() {
    return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  }

  function getCartTotal() {
    return Object.values(cart).reduce((sum, item) => sum + item.precio * item.qty, 0);
  }

  // ===== Render del menú =====
  function renderMenu() {
    const container = document.getElementById("menu");
    const navLinks = document.getElementById("navbar-links");
    container.innerHTML = "";
    navLinks.innerHTML = "";

    const effectiveMenu = getEffectiveMenu();

    PARENT_GROUPS.forEach((group) => {
      const items = effectiveMenu.filter(
        (i) => i.parent_group === group.id && i.hidden === 0
      );
      if (items.length === 0) return;

      // Nav link (traducido)
      const groupLabel = t(group.id) || group.title;
      const navA = document.createElement("a");
      navA.href = `#group-${group.id}`;
      navA.textContent = groupLabel;
      navA.addEventListener("click", () => {
        document.getElementById("navbar-links").classList.remove("open");
      });
      navLinks.appendChild(navA);

      // Parent group
      const groupEl = document.createElement("section");
      groupEl.className = "parent-group";
      groupEl.id = `group-${group.id}`;

      const title = document.createElement("h2");
      title.className = "parent-group-title";
      title.textContent = groupLabel;
      groupEl.appendChild(title);

      // Agrupar por tipo (sección)
      const sections = {};
      items.forEach((item) => {
        if (!sections[item.tipo]) sections[item.tipo] = [];
        sections[item.tipo].push(item);
      });

      Object.entries(sections).forEach(([tipo, sectionItems]) => {
        const sectionEl = document.createElement("div");
        sectionEl.className = "section";

        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "section-title";
        sectionTitle.textContent = t(tipo) || tipo;
        sectionEl.appendChild(sectionTitle);

        sectionItems.forEach((item) => {
          sectionEl.appendChild(createMenuItem(item));
        });

        groupEl.appendChild(sectionEl);
      });

      container.appendChild(groupEl);
    });
  }

  function createMenuItem(item) {
    const el = document.createElement("article");
    el.className = "menu-item";
    el.dataset.id = item.id;

    // Foto (placeholder por ahora)
    const photo = document.createElement("div");
    photo.className = "item-photo" + (item.img_url ? "" : " placeholder");
    if (item.img_url) {
      const img = document.createElement("img");
      img.src = item.img_url;
      img.alt = item.nombre;
      img.loading = "lazy";
      photo.appendChild(img);
    }
    el.appendChild(photo);

    // Body
    const body = document.createElement("div");
    body.className = "item-body";

    const name = document.createElement("div");
    name.className = "item-name";
    name.textContent = item.nombre;
    body.appendChild(name);

    if (item.descripcion) {
      const desc = document.createElement("div");
      desc.className = "item-desc";
      desc.textContent = item.descripcion;
      body.appendChild(desc);
    }

    const footer = document.createElement("div");
    footer.className = "item-footer";

    // Precio (se puede ocultar globalmente desde el admin)
    if (config.showPrices) {
      const price = document.createElement("div");
      price.className = "item-price";
      price.textContent = formatPrice(item.precio);
      footer.appendChild(price);
    }

    // Botón agregar al carrito (solo si el carrito está activo)
    if (config.showCart) {
      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.setAttribute("aria-label", "Agregar al pedido");
      addBtn.textContent = "+";
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(item);
      });
      footer.appendChild(addBtn);
    }

    body.appendChild(footer);
    el.appendChild(body);

    return el;
  }

  // ===== Carrito =====
  function addToCart(item) {
    const key = String(item.id);
    if (cart[key]) {
      cart[key].qty += 1;
    } else {
      cart[key] = {
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        qty: 1,
      };
    }
    saveCart();

    // Feedback visual rápido
    const btn = document.querySelector(`.menu-item[data-id="${item.id}"] .add-btn`);
    if (btn) {
      btn.textContent = "✓";
      setTimeout(() => (btn.textContent = "+"), 600);
    }
  }

  function changeQty(id, delta) {
    const key = String(id);
    if (!cart[key]) return;
    cart[key].qty += delta;
    if (cart[key].qty <= 0) delete cart[key];
    saveCart();
    renderCartItems();
  }

  function clearCart() {
    cart = {};
    saveCart();
    renderCartItems();
  }

  function updateCartUI() {
    const count = getCartCount();
    const countEl = document.getElementById("cart-count");
    if (count > 0) {
      countEl.textContent = count;
      countEl.classList.remove("hidden");
    } else {
      countEl.classList.add("hidden");
    }
  }

  function renderCartItems() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const items = Object.values(cart);

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart">
          <span>🛒</span>
          <p>${t("emptyCart")}</p>
        </div>`;
      totalEl.textContent = "$0";
      return;
    }

    container.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nombre}</div>
          <div class="cart-item-price">${formatPrice(item.precio)} c/u</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
        </div>
      `;
      container.appendChild(row);
    });

    // Eventos de cantidad
    container.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const delta = btn.dataset.action === "plus" ? 1 : -1;
        changeQty(id, delta);
      });
    });

    totalEl.textContent = formatPrice(getCartTotal());
  }

  function openCart() {
    renderCartItems();
    document.getElementById("cart-modal").classList.remove("hidden");
  }

  function closeCart() {
    document.getElementById("cart-modal").classList.add("hidden");
  }

  function confirmOrder() {
    const items = Object.values(cart);
    if (items.length === 0) return;

    const phone = config.whatsapp || (typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "");
    if (!phone) {
      alert(t("noWhatsapp"));
      return;
    }

    let message = t("orderGreeting") + "%0A%0A";
    items.forEach((item) => {
      message += `• ${item.qty}x ${item.nombre} — ${formatPrice(item.precio * item.qty)}%0A`;
    });
    message += `%0A*${t("total")}: ${formatPrice(getCartTotal())}*`;

    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  }

  // ===== UI helpers =====
  function handleScroll() {
    const navbar = document.getElementById("navbar");
    const scrollTopBtn = document.getElementById("scroll-top");
    const scrollBottomBtn = document.getElementById("scroll-bottom");
    const y = window.scrollY;

    if (y > 80) navbar.classList.add("visible");
    else navbar.classList.remove("visible");

    if (y > 300) scrollTopBtn.classList.add("visible");
    else scrollTopBtn.classList.remove("visible");

    const nearBottom = window.innerHeight + y >= document.body.offsetHeight - 200;
    if (y > 100 && !nearBottom) scrollBottomBtn.classList.add("visible");
    else scrollBottomBtn.classList.remove("visible");
  }

  // ===== i18n UI =====
  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    // Marcar idioma activo en el switcher
    const current = getLang();
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === current);
    });
    document.documentElement.lang = current;
  }

  function changeLanguage(lang) {
    setLang(lang);
    applyStaticI18n();
    renderMenu();
    updateCartUI();
  }

  // ===== Init =====
  function init() {
    applyStaticI18n();
    renderMenu();
    updateCartUI();

    // Ocultar carrito si está desactivado (desde admin o config)
    if (!config.showCart) {
      const cartBtn = document.getElementById("cart-button");
      if (cartBtn) cartBtn.style.display = "none";
    }

    // Loader
    setTimeout(() => {
      document.getElementById("loader").classList.add("hidden");
    }, 800);

    // Idioma
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => changeLanguage(btn.dataset.lang));
    });

    // Eventos
    document.getElementById("cart-button").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    document.getElementById("clear-cart").addEventListener("click", clearCart);
    document.getElementById("confirm-order").addEventListener("click", confirmOrder);

    document.getElementById("cart-modal").addEventListener("click", (e) => {
      if (e.target.id === "cart-modal") closeCart();
    });

    document.getElementById("hamburger").addEventListener("click", () => {
      document.getElementById("navbar-links").classList.toggle("open");
    });

    document.getElementById("scroll-top").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.getElementById("scroll-bottom").addEventListener("click", () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
