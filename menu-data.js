/**
 * Datos del menú - Resto de la Bodega
 * 
 * ========== CONFIGURACIÓN RÁPIDA ==========
 * 
 * SHOW_PRICES = true  → se muestran los precios
 * SHOW_PRICES = false → se ocultan todos los precios
 * 
 * Para ocultar un plato individual:
 *   cambiá  hidden: 0  →  hidden: 1
 * 
 * Para agregar / editar platos:
 * - id: número único
 * - nombre: nombre del plato
 * - precio: número (sin $ ni puntos)
 * - descripcion: texto opcional
 * - tipo: nombre de la sección (ENTRADAS, PRINCIPALES, etc.)
 * - parent_group: "comidas" | "bebidas" | "cafeteria"
 * - img_url: URL de la foto (dejar "" por ahora)
 * - hidden: 0 = visible, 1 = oculto
 */

// ▼▼▼ CONFIGURACIÓN ▼▼▼
const SHOW_PRICES = true;   // false = oculta todos los precios
const SHOW_CART   = true;   // false = oculta el botón de pedido / carrito
// ▲▲▲ CONFIGURACIÓN ▲▲▲

const MENU_DATA = [
  // ========== COMIDAS ==========
  // ENTRADAS
  { id: 361, nombre: "Empanada Carne / Pollo", precio: 4000, descripcion: "Creole empanada", tipo: "ENTRADAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 362, nombre: "Tabla de fiambres y quesos", precio: 35000, descripcion: "Charcuterie board", tipo: "ENTRADAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 380, nombre: "Rabas", precio: 25000, descripcion: "Calamares rebozados", tipo: "ENTRADAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 381, nombre: "Langostinos rebozados", precio: 27000, descripcion: "Prawns", tipo: "ENTRADAS", img_url: "", hidden: 0, parent_group: "comidas" },

  // ENSALADAS
  { id: 401, nombre: "Ensalada César", precio: 12000, descripcion: "Lechuga, pollo, croutons, parmesano", tipo: "ENSALADAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 402, nombre: "Ensalada mixta", precio: 9000, descripcion: "Tomate, lechuga, cebolla", tipo: "ENSALADAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 403, nombre: "Ensalada de la casa", precio: 14000, descripcion: "Con mix de verdes y aderezo especial", tipo: "ENSALADAS", img_url: "", hidden: 0, parent_group: "comidas" },

  // SOPAS
  { id: 411, nombre: "Sopa del día", precio: 8500, descripcion: "Consultar", tipo: "SOPAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 412, nombre: "Crema de zapallo", precio: 9000, descripcion: "", tipo: "SOPAS", img_url: "", hidden: 0, parent_group: "comidas" },

  // PRINCIPALES
  { id: 421, nombre: "Ojo de bife", precio: 32000, descripcion: "A punto, con guarnición", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 422, nombre: "Bife de chorizo", precio: 28000, descripcion: "Con papas o ensalada", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 423, nombre: "Vacío a la parrilla", precio: 26000, descripcion: "", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 424, nombre: "Pollo al horno", precio: 18000, descripcion: "Con papas", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 425, nombre: "Trucha patagónica", precio: 24000, descripcion: "Al limón o manteca", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 426, nombre: "Milanesa napolitana", precio: 16000, descripcion: "Con papas fritas", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 427, nombre: "Milanesa clásica", precio: 14000, descripcion: "Con papas fritas", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 428, nombre: "Lomo a la pimienta", precio: 30000, descripcion: "", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 429, nombre: "Costillas BBQ", precio: 27000, descripcion: "", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 430, nombre: "Bondiola a la cerveza", precio: 22000, descripcion: "", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 431, nombre: "Matambre a la pizza", precio: 20000, descripcion: "", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 432, nombre: "Brochettes de carne", precio: 19000, descripcion: "Con vegetales", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 433, nombre: "Hamburguesa completa", precio: 15000, descripcion: "Con papas", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 434, nombre: "Hamburguesa doble", precio: 18000, descripcion: "Doble carne, doble queso", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 435, nombre: "Tortilla de papas", precio: 11000, descripcion: "Clásica o rellena", tipo: "PRINCIPALES", img_url: "", hidden: 0, parent_group: "comidas" },

  // PASTAS
  { id: 441, nombre: "Ñoquis caseros", precio: 13000, descripcion: "Salsa a elección", tipo: "PASTAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 442, nombre: "Ravioles de ricota", precio: 14000, descripcion: "Salsa a elección", tipo: "PASTAS", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 443, nombre: "Fetuccini al pesto", precio: 13500, descripcion: "", tipo: "PASTAS", img_url: "", hidden: 0, parent_group: "comidas" },

  // GUARNICIONES
  { id: 451, nombre: "Papas fritas", precio: 6000, descripcion: "", tipo: "GUARNICIONES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 452, nombre: "Puré de papas", precio: 5500, descripcion: "", tipo: "GUARNICIONES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 453, nombre: "Ensalada mixta (porción)", precio: 5000, descripcion: "", tipo: "GUARNICIONES", img_url: "", hidden: 0, parent_group: "comidas" },

  // POSTRES
  { id: 461, nombre: "Flan casero", precio: 7000, descripcion: "Con dulce de leche o crema", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 462, nombre: "Tiramisú", precio: 8500, descripcion: "", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 463, nombre: "Brownie con helado", precio: 9000, descripcion: "", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 464, nombre: "Panqueque de dulce de leche", precio: 8000, descripcion: "", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 465, nombre: "Helado (2 bochas)", precio: 6000, descripcion: "Sabores a elección", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },
  { id: 466, nombre: "Tabla de quesos y dulces", precio: 12000, descripcion: "", tipo: "POSTRES", img_url: "", hidden: 0, parent_group: "comidas" },

  // ========== BEBIDAS ==========
  // VINOS
  { id: 382, nombre: "Pueblada Syrah", precio: 23000, descripcion: "60% Malbec 40% Syrah", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 384, nombre: "Malbec Reserva", precio: 35000, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 501, nombre: "Malbec State", precio: 15800, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 502, nombre: "Chardonnay", precio: 18000, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 503, nombre: "Sauvignon Blanc", precio: 18000, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 504, nombre: "Pueblada Rosé", precio: 23000, descripcion: "Cabernet Franc", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 505, nombre: "Vino de la casa (copa)", precio: 4500, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 506, nombre: "Vino de la casa (botella)", precio: 14000, descripcion: "", tipo: "VINOS", img_url: "", hidden: 0, parent_group: "bebidas" },

  // TRAGOS
  { id: 511, nombre: "Fernet con Coca", precio: 7000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 512, nombre: "Gin Tonic", precio: 8500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 513, nombre: "Cuba Libre", precio: 7500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 514, nombre: "Mojito", precio: 8000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 515, nombre: "Aperol Spritz", precio: 9000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 516, nombre: "Negroni", precio: 9500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 517, nombre: "Whisky (medida)", precio: 8000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 518, nombre: "Campari", precio: 7000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 519, nombre: "Vermut", precio: 5500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 520, nombre: "Cynar", precio: 6000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 521, nombre: "Gancia", precio: 5500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 522, nombre: "Caipirinha", precio: 8000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 523, nombre: "Daiquiri", precio: 8500, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 524, nombre: "Margarita", precio: 9000, descripcion: "", tipo: "TRAGOS", img_url: "", hidden: 0, parent_group: "bebidas" },

  // CERVEZAS
  { id: 531, nombre: "Cerveza rubia (pinta)", precio: 5500, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 532, nombre: "Cerveza negra (pinta)", precio: 5500, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 533, nombre: "Cerveza IPA (pinta)", precio: 6000, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 534, nombre: "Cerveza en botella", precio: 4500, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 535, nombre: "Cerveza sin alcohol", precio: 4000, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 536, nombre: "Chop (1L)", precio: 9000, descripcion: "", tipo: "CERVEZAS", img_url: "", hidden: 0, parent_group: "bebidas" },

  // GASEOSAS Y JUGOS
  { id: 541, nombre: "Coca-Cola / Sprite / Fanta", precio: 3500, descripcion: "Lata o vaso", tipo: "GASEOSAS Y JUGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 542, nombre: "Agua mineral", precio: 2500, descripcion: "Con o sin gas", tipo: "GASEOSAS Y JUGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 543, nombre: "Jugo exprimido", precio: 4500, descripcion: "Naranja o pomelo", tipo: "GASEOSAS Y JUGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 544, nombre: "Limonada", precio: 4000, descripcion: "", tipo: "GASEOSAS Y JUGOS", img_url: "", hidden: 0, parent_group: "bebidas" },
  { id: 545, nombre: "Agua saborizada", precio: 3000, descripcion: "", tipo: "GASEOSAS Y JUGOS", img_url: "", hidden: 0, parent_group: "bebidas" },

  // ========== CAFETERÍA ==========
  { id: 551, nombre: "Café solo", precio: 2500, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 552, nombre: "Café con leche", precio: 3000, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 553, nombre: "Cortado", precio: 2800, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 554, nombre: "Capuchino", precio: 3500, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 555, nombre: "Submarino", precio: 4000, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 556, nombre: "Té / Infusión", precio: 2500, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 557, nombre: "Medialunas (2 u)", precio: 3500, descripcion: "De grasa o manteca", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 558, nombre: "Tostado jamón y queso", precio: 5500, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 559, nombre: "Tostadas con mermelada", precio: 4000, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 560, nombre: "Yogur con granola", precio: 5000, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 561, nombre: "Tortilla de huevo", precio: 6000, descripcion: "", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
  { id: 562, nombre: "Jugo de naranja + medialunas", precio: 6500, descripcion: "Combo desayuno", tipo: "DESAYUNOS Y MERIENDAS", img_url: "", hidden: 0, parent_group: "cafeteria" },
];

const PARENT_GROUPS = [
  { id: "comidas", title: "Comidas" },
  { id: "bebidas", title: "Bebidas" },
  { id: "cafeteria", title: "Cafetería" },
];

// Número de WhatsApp del restaurante (formato internacional sin +)
const WHATSAPP_NUMBER = "5492994123456"; // ← CAMBIAR por el número real
