# 🧮 Sumio – Gestor de gastos personales

> Tu rastreador de gastos simple, visual y práctico.

---

## 🧠 ¿Qué hace el proyecto?

Una aplicación para **gestionar gastos personales** desde el navegador. Permite:

- ➕ Agregar un gasto (descripción, monto, categoría)
- 🔁 Editar un gasto (todo menos la fecha)
- ❌ Eliminar gastos
- ✅ Marcar como "necesario" o "extra"
- 🔍 Filtrar por **categoría** o **fecha**
- 💰 Ver total de gastos (general o por categoría)
- 💾 Guardar y recuperar los datos desde `localStorage`

---

## 📦 Modelo de datos

Al agregar un gasto se genera un objeto con esta forma:

```js
const gasto = {
  id: "string", // generado con crypto.randomUUID()
  description: "string",
  amount: number,
  category: "string", // seleccionada desde un <select>
  isNecessary: boolean, // true = necesario, false = extra
  date: Date // generado automáticamente con new Date()
}
```
---

# 🎯 Plano técnico de Sumio

## 🔧 Funcionalidades

- [x] Agregar gasto al DOM y al array
- [x] Eliminar gasto
- [x] Editar gasto (menos la fecha)
- [x] Mostrar gastos en pantalla
- [x] Guardar gastos en localStorage
- [x] Filtrar gastos por categoría o fecha
- [x] Mostrar total general o por categoría
- [x] Validación de inputs
- [x] Separación por módulos JS
- [x] Plantilla reutilizable para botones
- [x] Listeners bien organizados

---

## 🛠 Funciones planeadas
- [x] addTcreateExpenseask() -- agregar gasto al array de manera inmutable.
- [x] formatDate() -- formatear el timestamp para que sea DD-MM-YYYY.
- [x] createButtons() -- plantilla para botones.
- [x] generateExpenseButtons() -- generador de botones.
- [x] renderExpenses() -- mostrar lo que hay en el array en pantalla.
- [x] createItem() -- plantilla para li's con spans dentro. 
- [x] capitalizeFirstLetter() -- dar una capitalizacion mas ordenada.
- [x] removeExpenseById() -- eliminar tarea por id.
- [x] saveExpensesToStorage() -- guarda datos en el localstorage.
- [x] getExpensesFromStorage() -- obtiene esos datos para mostrarlos.
- [x] clearExpensesFromStorage() -- limpia por completo el localstorage.
- [x] editExpenseById() -- edita un gasto y devuelve un nuevo arreglo de forma inmutable. 
- [x] getExpenseById() -- Busca el gasto por ID y lo asigna a una variable global para su edición.
- [x] showEditModal() -- muestra el modal con los datos precargados.
- [x] hideEditModal()--  oculta el modal nuevamente.
- [x] getEditFormData() -- Extrae los datos actualizados del formulario de edición para aplicarlos al gasto.
- [x] totalExpenses() -- Calcula el total de gastos sumando los valores `amount` de cada objeto en el array. 
- [x] totalExpensesByCategory() -- Calcula el total de gastos para una categoria específica.
- [x] totalExpensesByDate() -- Calcula el total de gastos para una fecha específica.
- [x] filterExpensesByCategory() -- Filtra los gastos por categoría y devuelve un nuevo arreglo.
- [x] filterExpensesByDate() -- Filtra los gastos por fecha exacta usando rangos de timestamps en hora local. Evita desfases por zona horaria al construir la fecha manualmente. Usa la función auxiliar `getDayRangeLocal(dateString)`.
- [x] renderSummary() -- Recibe un número y lo muestra en el span `.summary-expense` como resumen de gastos.
- [x] formatCOP() -- Formatea la moneda a moneda colombiana. 
- [x] showErrorMessage() -- mostrar mensaje de error en pantalla.
- [x] clearAllErrors() -- limpia todos los mensajes de error de la pantalla.
- [x] getDayRangeLocal() -- Convierte un string `"YYYY-MM-DD"` en un rango `{start, end}` de timestamps locales. Asegura que el filtrado por día sea preciso en zonas horarias distintas a UTC.

---

## 👓 Variables globales
- [x] Referencias necesarias al DOM
- [x] un arreglo vació con scoope global que será actualizada en diferentes momentos del archivo

---

## 📚 Notas de arquitectura
Se busca mantener el principio DRY al evitar duplicación de lógica en la creación de botones

Los botones deben tener aria-label y data-name para facilitar su identificación en listeners

--- 

## Validaciones
🔹 1. Descripción (texto)
- No debe estar vacía.
- No debe contener solo símbolos.
- Debe tener al menos 2 caracteres alfabéticos.

🔹 2. Monto
- Debe ser un número.
- Mayor que cero.
- No debe ser NaN, negativo ni vacío.

🔹 3. Categoría
- No debe ser "Categoria" (la opción por defecto).
- Debe tener un value válido.

🔹 4. Tipo (extra o necesario)
- No debe ser "Extra o Necesario" (la opción por defecto).
- Debe tener un value válido.

---

## 🎨 Diseño y estilo
- 🧑‍🎨 Mobile-first: luego se adapta a pantallas grandes
- ⚙️ Usa Flexbox para estructuras pequeñas
- 🧱 Usa CSS Grid para organizar la lista de gastos
- 🎯 Estilos responsivos con media queries
- 💡 Uso de pseudo-clases: :hover, :focus, :nth-child(odd)
- ✨ Animación ligera al cargar o al agregar elementos
- 👾 Modo oscuro y claro

| Archivo             | Descripción                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `main.js`           | Conecta HTML y JS, define eventos globales                             |
| `ui.js`             | Funciones visuales: renderizar lista, mostrar mensajes, limpiar inputs |
| `storage.js`        | Guardar, obtener y limpiar datos desde `localStorage`                  |
| `formValidation.js` | Validaciones del formulario (campos vacíos, valores válidos)           |
| `utils.js`          | Funciones puras: generar ID, formatear fecha, crear botones, etc.      |

### *explicaciones de codigo para mí*

 ```js
 let originalExpenses = []; 
```
- Asi era antes de introducir el localstorage ahora el valor original pasa a ser lo ultimo que guardó el storage y ya no es un arreglo vacio a menos que se limpie con clearStorage o manualmente desde devsTools

**funcion pura de editar**

```js
  return arrExpenses.map((expense) => {
    if (expense.id !== expenseId) return expense; // mantener los gastos no editados

    // devolver el gasto editado con los nuevos campos
    return {
      ...expense, // mantener los campos originales
      ...updatedFields, // sobreescribir con los nuevos valores
    };
  });
```