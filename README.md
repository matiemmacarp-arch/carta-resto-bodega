# Resto de la Bodega · Carta Digital

Versión propia, limpia y **sin costo mensual**.

---

## 1. Probar en local

Abrí `index.html` en el navegador, o mejor con un servidor local:

```bash
# Desde la carpeta resto-menu
python3 -m http.server 8080
```

Después entrá a: http://localhost:8080

- Carta: http://localhost:8080
- Admin: http://localhost:8080/admin.html  
  Contraseña: `bodega2026`

---

## 2. Despliegue (publicar online)

### Opción A — Netlify (recomendada, 2 minutos)

1. Entrá a [https://app.netlify.com](https://app.netlify.com) y creá una cuenta (podés con Google/GitHub).
2. En el dashboard, arrastrá **toda la carpeta `resto-menu`** a la zona que dice *"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"*.
3. Esperá unos segundos. Te da una URL tipo:
   ```
   https://algo-random.netlify.app
   ```
4. (Opcional) Cambiá el nombre:
   - Site settings → Domain management → Options → Edit site name  
   Ejemplo: `restodelabodega.netlify.app`
5. Listo. Esa URL es tu carta digital.

**Para actualizar después:**  
Volvé a arrastrar la carpeta (o conectá un repo de GitHub y cada push se publica solo).

---

### Opción B — Vercel

1. Entrá a [https://vercel.com](https://vercel.com) y registrate.
2. **Add New Project** → *Upload* (o conectá GitHub).
3. Subí la carpeta `resto-menu`.
4. Dejá la configuración por defecto y dale Deploy.
5. Te da una URL tipo `https://resto-menu.vercel.app`.

---

### Opción C — Cloudflare Pages

1. Entrá a [https://pages.cloudflare.com](https://pages.cloudflare.com).
2. **Create a project** → *Upload assets*.
3. Subí la carpeta.
4. Te da una URL `*.pages.dev`.

---

### Opción D — GitHub Pages (gratis y con control de versiones)

1. Creá un repositorio en GitHub (ej: `carta-bodega`).
2. Subí todos los archivos de `resto-menu` a la raíz del repo.
3. Andá a **Settings → Pages**.
4. Source: **Deploy from a branch** → branch `main` → folder `/ (root)`.
5. Save. En 1-2 minutos la carta queda en:
   ```
   https://TU-USUARIO.github.io/carta-bodega/
   ```

---

### Opción E — Hosting propio / cPanel / FTP

1. Conectate por FTP o File Manager.
2. Subí **todo el contenido** de `resto-menu` a la carpeta pública (`public_html`, `www`, etc.).
3. Si querés que esté en un subdirectorio:
   ```
   tudominio.com/carta/
   ```
   subí los archivos dentro de la carpeta `carta`.
4. Listo.

---

## 3. Dominio propio (opcional)

Si tenés un dominio (ej: `restodelabodega.com.ar`):

**En Netlify:**
1. Site settings → Domain management → Add custom domain.
2. Poné tu dominio.
3. Netlify te indica los DNS que tenés que configurar en tu registrador (normalmente un CNAME o los nameservers de Netlify).

**En Cloudflare Pages / Vercel:** el proceso es similar (Custom domain).

---

## 4. Generar el código QR

1. Copiá la URL pública de tu carta (ej: `https://restodelabodega.netlify.app`).
2. Andá a cualquiera de estos:
   - [https://www.qr-code-generator.com](https://www.qr-code-generator.com)
   - [https://qr.io](https://qr.io)
   - [https://www.qrcode-monkey.com](https://www.qrcode-monkey.com)
3. Pegá la URL → descargá el QR en PNG o SVG.
4. Imprimilo y ponelo en las mesas / mostrador.

**Tip:** si más adelante cambiás de URL, usá un acortador o un dominio propio para no tener que reimprimir los QR.

---

## 5. Configuración inicial recomendada

1. Entrá a `/admin.html`
2. Contraseña: `bodega2026` (cambiala en `admin.js` → `ADMIN_PASSWORD`)
3. Pestaña **Configuración**:
   - Poné el número de WhatsApp real (solo números, con código de país, sin +)
   - Activá/desactivá precios y carrito según quieras
4. Pestaña **Platos**:
   - Ocultá los que no quieras mostrar
   - Ajustá precios si hace falta

---

## 6. Actualizar el menú más adelante

| Qué querés hacer              | Dónde |
|-------------------------------|-------|
| Cambiar precio / ocultar plato | Panel Admin (`/admin.html`) |
| Agregar plato nuevo permanente | Editar `menu-data.js` y volver a subir |
| Cambiar WhatsApp              | Admin → Configuración |
| Subir fotos                   | Carpeta `fotos/` + poner ruta en `img_url` |
| Cambiar contraseña admin      | `admin.js` → `ADMIN_PASSWORD` |

**Importante:** los cambios del panel Admin se guardan en el **navegador** donde los hacés (localStorage).  
Para que valgan en todos los dispositivos, después de ajustar precios/visibilidad, conviene pasar esos valores definitivos a `menu-data.js` y volver a publicar.

---

## 7. Estructura de archivos

```
resto-menu/
├── index.html      ← Carta pública
├── admin.html      ← Panel de administración
├── style.css
├── admin.css
├── script.js
├── admin.js
├── menu-data.js    ← Datos base del menú
└── README.md
```

---

## Resumen rápido de despliegue

1. Probar local → `python3 -m http.server 8080`
2. Arrastrar carpeta a **Netlify**
3. Configurar WhatsApp y contraseña en el Admin
4. Generar QR con la URL
5. Imprimir y listo

Cualquier duda, avisame.
