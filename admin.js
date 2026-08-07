/**
 * Panel de administración - Resto de la Bodega
 * Los cambios se guardan en localStorage y la carta los lee automáticamente.
 */

(function () {
  "use strict";

  // ===== Config =====
  // Cambiá esta contraseña por la que quieras
  const ADMIN_PASSWORD = "bodega2026";

  const STORAGE_KEY = "bodega_menu_overrides";
  const CONFIG_KEY = "bodega_config";

  // ===== State =====
  let overrides = loadOverrides();   // { [id]: { precio?, hidden? } }
  let config = loadConfig();

  // ===== Storage helpers =====
  function loadOverrides() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveOverrides() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
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

  function saveConfig() {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  }

  // ===== Effective menu (base + overrides) =====
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

  // ===== Auth =====
  function isLoggedIn() {
    return sessionStorage.getItem("bodega_admin") === "1";
  }

  function login(password) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bodega_admin", "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem("bodega_admin");
    document.getElementById("admin-panel").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("admin-password").value = "";
  }

  function showPanel() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("admin-panel").classList.remove("hidden");
    renderItems();
    loadSettingsUI();
  }

  // ===== Toast =====
  function toast(msg, isError) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.toggle("error", !!isError);
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2200);
  }

  // ===== Render items =====
  function renderItems() {
    const list = document.getElementById("items-list");
    const search = (document.getElementById("search-items").value || "").toLowerCase().trim();
    const groupFilter = document.getElementById("filter-group").value;
    const visFilter = document.getElementById("filter-visibility").value;

    let items = getEffectiveMenu();

    if (groupFilter !== "all") {
      items = items.filter((i) => i.parent_group === groupFilter);
    }
    if (visFilter === "visible") {
      items = items.filter((i) => i.hidden === 0);
    } else if (visFilter === "hidden") {
      items = items.filter((i) => i.hidden === 1);
    }
    if (search) {
      items = items.filter(
        (i) =>
          i.nombre.toLowerCase().includes(search) ||
          (i.tipo || "").toLowerCase().includes(search) ||
          (i.descripcion || "").toLowerCase().includes(search)
      );
    }

    if (items.length === 0) {
      list.innerHTML = `<div class="empty-list">No se encontraron platos</div>`;
      return;
    }

    // Agrupar visualmente por tipo
    list.innerHTML = "";
    let lastTipo = null;

    items.forEach((item) => {
      if (item.tipo !== lastTipo) {
        lastTipo = item.tipo;
        const header = document.createElement("div");
        header.style.cssText =
          "font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);padding:0.75rem 0.25rem 0.35rem;";
        header.textContent = item.tipo;
        list.appendChild(header);
      }

      const row = document.createElement("div");
      row.className = "admin-item" + (item.hidden === 1 ? " is-hidden" : "");
      row.dataset.id = item.id;

      row.innerHTML = `
        <div class="admin-item-info">
          <div class="admin-item-name">${escapeHtml(item.nombre)}</div>
          <div class="admin-item-meta">${item.parent_group} · ${item.tipo}</div>
        </div>
        <div class="admin-item-price">
          <span>$</span>
          <input type="number" value="${item.precio}" min="0" step="100" data-id="${item.id}" class="price-input">
        </div>
        <div class="admin-item-actions">
          <button class="icon-btn toggle-vis ${item.hidden === 1 ? "" : "active"}" data-id="${item.id}" title="${item.hidden === 1 ? "Mostrar" : "Ocultar"}">
            ${item.hidden === 1 ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
      `;
      list.appendChild(row);
    });

    // Eventos
    list.querySelectorAll(".price-input").forEach((input) => {
      input.addEventListener("change", onPriceChange);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
      });
    });
    list.querySelectorAll(".toggle-vis").forEach((btn) => {
      btn.addEventListener("click", onToggleVisibility);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function onPriceChange(e) {
    const id = e.target.dataset.id;
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      toast("Precio inválido", true);
      renderItems();
      return;
    }
    if (!overrides[id]) overrides[id] = {};
    overrides[id].precio = value;
    saveOverrides();
    toast("Precio actualizado");
  }

  function onToggleVisibility(e) {
    const btn = e.currentTarget;
    const id = btn.dataset.id;
    const current = getEffectiveMenu().find((i) => String(i.id) === String(id));
    const newHidden = current.hidden === 1 ? 0 : 1;

    if (!overrides[id]) overrides[id] = {};
    overrides[id].hidden = newHidden;
    saveOverrides();
    renderItems();
    toast(newHidden === 1 ? "Plato ocultado" : "Plato visible");
  }

  // ===== Settings =====
  function loadSettingsUI() {
    document.getElementById("cfg-show-prices").checked = config.showPrices;
    document.getElementById("cfg-show-cart").checked = config.showCart;
    document.getElementById("cfg-whatsapp").value = config.whatsapp || "";
  }

  function saveSettings() {
    config.showPrices = document.getElementById("cfg-show-prices").checked;
    config.showCart = document.getElementById("cfg-show-cart").checked;
    config.whatsapp = document.getElementById("cfg-whatsapp").value.trim();
    saveConfig();
    toast("Configuración guardada");
  }

  function resetAll() {
    if (!confirm("¿Restablecer todos los cambios? Se perderán precios editados, platos ocultos y configuración.")) {
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONFIG_KEY);
    overrides = {};
    config = loadConfig();
    renderItems();
    loadSettingsUI();
    toast("Todo restablecido");
  }

  // ===== Tabs =====
  function setupTabs() {
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
      });
    });
  }

  // ===== Init =====
  function init() {
    // Login form
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("admin-password").value;
      if (login(pass)) {
        showPanel();
      } else {
        document.getElementById("login-error").classList.remove("hidden");
      }
    });

    document.getElementById("logout-btn").addEventListener("click", logout);
    document.getElementById("save-settings").addEventListener("click", saveSettings);
    document.getElementById("reset-btn").addEventListener("click", resetAll);

    // Filters
    document.getElementById("search-items").addEventListener("input", renderItems);
    document.getElementById("filter-group").addEventListener("change", renderItems);
    document.getElementById("filter-visibility").addEventListener("change", renderItems);

    setupTabs();

    if (isLoggedIn()) {
      showPanel();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
