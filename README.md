# 🧮 Sumio – Gestor de gastos personales

> Tu rastreador de gastos simple, visual y práctico.

---

## 🚀 ¿Qué es Sumio?

Sumio es una aplicación web para **gestionar tus gastos personales** de forma clara y visual. Pensada para usuarios que quieren llevar control sin complicaciones, directamente desde el navegador.

---

## ✨ Funcionalidades principales

- ➕ Agregar gastos con descripción, monto y categoría
- 🔁 Editar gastos (excepto la fecha)
- ❌ Eliminar gastos
- ✅ Marcar como "necesario" o "extra"
- 🔍 Filtrar por categoría o fecha
- 💰 Ver total general, por categoría o fecha
- 💾 Guardar datos en `localStorage` para persistencia

---

## 🖥️ Demo

👉 [Probar Sumio en GitHub Pages](https://andresmo23.github.io/sumio/)

---

## 🛠️ Tecnologías usadas

- HTML5 + CSS3 (Mobile-first, modo oscuro, animaciones)
- JavaScript modular (ES Modules)
- `localStorage` para persistencia
- Flexbox + Grid para diseño responsivo

---

## 📦 Estructura del proyecto

```plaintext
📁 src/
├── main.js              # Conecta HTML y JS, define eventos globales
├── ui.js                # Renderiza lista, muestra mensajes, limpia inputs
├── storage.js           # Guarda y recupera datos del localStorage
├── formValidation.js    # Validaciones de campos
└── utils.js             # Funciones puras: ID, fecha, botones, etc.
```

---

## 📚 Validaciones

- Descripción: no vacía, sin símbolos, mínimo 2 letras
- Monto: número positivo, no NaN
- Categoría: debe ser válida
- Tipo: "necesario" o "extra", no por defecto

---

## 📐 Principios de arquitectura

- Separación por módulos
- Funciones puras reutilizables
- Evita duplicación (DRY)
- Accesibilidad: aria-label, data-name en botones
- Precisión en fechas: filtrado local sin desfases de zona horaria

---

## 🙌 Autor
Desarrollado por Gonzalo Montoya si te gustó, ¡dale una estrella ⭐ en GitHub!
