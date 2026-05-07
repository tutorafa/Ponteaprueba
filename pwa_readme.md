# Ponte a Prueba — PWA

## Estructura de archivos

```
ponte-a-prueba/
├── index.html          ← App principal (descargar del artefacto Claude)
├── manifest.json       ← Manifiesto PWA
├── sw.js               ← Service Worker (funciona offline)
├── icons/
│   ├── icon.svg        ← Icono fuente (para referencia)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-180.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
```

---

## Cómo generar los iconos PNG

Usa el archivo `icon.svg` y conviértelo a PNG en estos tamaños.

**Opción A — Online gratuito (sin instalar nada):**
1. Ve a https://svgtopng.com o https://cloudconvert.com/svg-to-png
2. Sube `icon.svg`
3. Exporta en cada tamaño: 72, 96, 128, 144, 152, 180, 192, 384, 512
4. Guarda cada PNG en la carpeta `icons/` con el nombre correspondiente

**Opción B — Con ImageMagick (terminal):**
```bash
for size in 72 96 128 144 152 180 192 384 512; do
  convert -background none icon.svg -resize ${size}x${size} icons/icon-${size}.png
done
```

**Opción C — Con Inkscape:**
```bash
for size in 72 96 128 144 152 180 192 384 512; do
  inkscape icon.svg --export-png=icons/icon-${size}.png -w $size -h $size
done
```

---

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (ej: `ponte-a-prueba`)
2. Sube todos los archivos manteniendo la estructura de carpetas
3. Ve a **Settings → Pages → Source → main branch → / (root)**
4. GitHub generará una URL tipo: `https://tuusuario.github.io/ponte-a-prueba/`
5. Comparte esa URL por WhatsApp — se abre directamente en el navegador

---

## Instalar como app en el móvil

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparecerá un banner "Añadir a pantalla de inicio" — pulsa **Instalar**
3. O bien: menú ⋮ → **Añadir a pantalla de inicio**

### iPhone / iPad (Safari)
1. Abre la URL en Safari
2. Pulsa el botón **Compartir** (cuadrado con flecha ↑)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Confirma → aparece el icono en el escritorio

### PC / Mac (Chrome o Edge)
1. Abre la URL en Chrome o Edge
2. En la barra de direcciones aparece un icono de instalar (⊕)
3. O bien: menú ⋮ → **Instalar Ponte a Prueba**

---

## Funciona 100% offline
Una vez instalada, la app funciona sin conexión a internet gracias al Service Worker.
