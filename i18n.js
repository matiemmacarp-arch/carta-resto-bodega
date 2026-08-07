/**
 * Traducciones - Resto de la Bodega
 * Idiomas: es | en | pt | fr
 */

const I18N = {
  es: {
    menu: "MENÚ",
    howToGet: "Cómo llegar",
    instagram: "Instagram",
    viewMenu: "Ver carta",
    order: "Pedido",
    yourOrder: "Tu pedido",
    total: "Total",
    empty: "Vaciar",
    sendOrder: "Enviar pedido",
    cartNote: "El pedido se enviará por WhatsApp",
    emptyCart: "Tu pedido está vacío",
    footerPhrase: "Carta digital propia · Sin intermediarios",
    // Grupos
    comidas: "Comidas",
    bebidas: "Bebidas",
    cafeteria: "Cafetería",
    // Secciones
    ENTRADAS: "Entradas",
    ENSALADAS: "Ensaladas",
    SOPAS: "Sopas",
    PRINCIPALES: "Principales",
    PASTAS: "Pastas",
    GUARNICIONES: "Guarniciones",
    POSTRES: "Postres",
    VINOS: "Vinos",
    TRAGOS: "Tragos",
    CERVEZAS: "Cervezas",
    "GASEOSAS Y JUGOS": "Gaseosas y jugos",
    "DESAYUNOS Y MERIENDAS": "Desayunos y meriendas",
    // WhatsApp
    orderGreeting: "¡Hola! Quiero hacer el siguiente pedido:",
    noWhatsapp: "No hay número de WhatsApp configurado.",
  },
  en: {
    menu: "MENU",
    howToGet: "Directions",
    instagram: "Instagram",
    viewMenu: "View menu",
    order: "Order",
    yourOrder: "Your order",
    total: "Total",
    empty: "Clear",
    sendOrder: "Send order",
    cartNote: "Order will be sent via WhatsApp",
    emptyCart: "Your order is empty",
    footerPhrase: "Our own digital menu · No middlemen",
    comidas: "Food",
    bebidas: "Drinks",
    cafeteria: "Café",
    ENTRADAS: "Starters",
    ENSALADAS: "Salads",
    SOPAS: "Soups",
    PRINCIPALES: "Mains",
    PASTAS: "Pasta",
    GUARNICIONES: "Sides",
    POSTRES: "Desserts",
    VINOS: "Wines",
    TRAGOS: "Cocktails",
    CERVEZAS: "Beers",
    "GASEOSAS Y JUGOS": "Soft drinks & juices",
    "DESAYUNOS Y MERIENDAS": "Breakfast & snacks",
    orderGreeting: "Hi! I'd like to place the following order:",
    noWhatsapp: "WhatsApp number is not configured.",
  },
  pt: {
    menu: "CARDÁPIO",
    howToGet: "Como chegar",
    instagram: "Instagram",
    viewMenu: "Ver cardápio",
    order: "Pedido",
    yourOrder: "Seu pedido",
    total: "Total",
    empty: "Limpar",
    sendOrder: "Enviar pedido",
    cartNote: "O pedido será enviado pelo WhatsApp",
    emptyCart: "Seu pedido está vazio",
    footerPhrase: "Cardápio digital próprio · Sem intermediários",
    comidas: "Comidas",
    bebidas: "Bebidas",
    cafeteria: "Cafeteria",
    ENTRADAS: "Entradas",
    ENSALADAS: "Saladas",
    SOPAS: "Sopas",
    PRINCIPALES: "Principais",
    PASTAS: "Massas",
    GUARNICIONES: "Acompanhamentos",
    POSTRES: "Sobremesas",
    VINOS: "Vinhos",
    TRAGOS: "Drinks",
    CERVEZAS: "Cervejas",
    "GASEOSAS Y JUGOS": "Refrigerantes e sucos",
    "DESAYUNOS Y MERIENDAS": "Café da manhã e lanches",
    orderGreeting: "Olá! Gostaria de fazer o seguinte pedido:",
    noWhatsapp: "Número do WhatsApp não configurado.",
  },
  fr: {
    menu: "MENU",
    howToGet: "Itinéraire",
    instagram: "Instagram",
    viewMenu: "Voir la carte",
    order: "Commande",
    yourOrder: "Votre commande",
    total: "Total",
    empty: "Vider",
    sendOrder: "Envoyer",
    cartNote: "La commande sera envoyée par WhatsApp",
    emptyCart: "Votre commande est vide",
    footerPhrase: "Carte digitale · Sans intermédiaires",
    comidas: "Plats",
    bebidas: "Boissons",
    cafeteria: "Café",
    ENTRADAS: "Entrées",
    ENSALADAS: "Salades",
    SOPAS: "Soupes",
    PRINCIPALES: "Plats principaux",
    PASTAS: "Pâtes",
    GUARNICIONES: "Accompagnements",
    POSTRES: "Desserts",
    VINOS: "Vins",
    TRAGOS: "Cocktails",
    CERVEZAS: "Bières",
    "GASEOSAS Y JUGOS": "Sodas et jus",
    "DESAYUNOS Y MERIENDAS": "Petit-déjeuner et collations",
    orderGreeting: "Bonjour ! Je voudrais passer la commande suivante :",
    noWhatsapp: "Numéro WhatsApp non configuré.",
  },
};

const LANG_KEY = "bodega_lang";
const SUPPORTED_LANGS = ["es", "en", "pt", "fr"];

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  // Detectar idioma del navegador
  const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(nav)) return nav;
  return "es";
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = "es";
  localStorage.setItem(LANG_KEY, lang);
  return lang;
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
}
