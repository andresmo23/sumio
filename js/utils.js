// ? Funciones puras

// ********************************* Funciones Esenciales ***************************************

// funcion crear gasto
export function createExpense(arrExpenses, fmDescription, fmAmount, fmCategory, fmType) {
  const newExpense = {
    id: crypto.randomUUID(),
    description: fmDescription,
    amount: fmAmount,
    category: fmCategory,
    type: fmType,
    date: new Date().getTime(),
  };

  return [...arrExpenses, newExpense];
}

// funcion para eliminar gasto de manera inmutable
export function removeExpenseById(arrExpenses, expenseId) {
  return arrExpenses.filter((expense) => expense.id !== expenseId);
}

// funcion para editar un gasto de forma inmutable
export function editExpenseById(arrExpenses, expenseId, updatedFields) {
  return arrExpenses.map((expense) => {
    if (expense.id !== expenseId) return expense;

    return { ...expense, ...updatedFields };
  });
}

// funcion para obtener el gasto por id y poder usarlo en el modal
export function getExpenseById(arrExpenses, expenseId) {
  return arrExpenses.find((expense) => expense.id === expenseId);
}

// ********************************* Funciones Auxiliares **************************************

// funcion para formatear el timestamp de la fecha
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// funcion plantilla de botones
function createButtons(label, className, name, cardId, iconHTML) {
  const button = document.createElement("button");
  button.classList.add("sumio__btn", className);
  button.setAttribute("aria-label", label);
  button.dataset.name = name;
  button.dataset.id = cardId;
  button.innerHTML = iconHTML;

  return button;
}

// funcion para generar los botones
export function generateExpenseButtons(expenseId) {
  const btnDelete = createButtons(
    "Eliminar gasto",
    "btn--delete",
    "delete",
    expenseId,
    `<i class="fa-solid fa-trash"></i>`
  );

  const btnEdit = createButtons(
    "Editar gasto",
    "btn--edit",
    "edit",
    expenseId,
    `<i class="fa-solid fa-pen-to-square"></i>`
  );

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("sumio__btn--actions");

  actionContainer.appendChild(btnDelete);
  actionContainer.appendChild(btnEdit);

  return actionContainer;
}

// funcion auxiliar para crear li con spans dentro y darle mayor claridad al renderizado
export function createItem(labelText, valueText) {
  const li = document.createElement("li");
  li.classList.add("card__item");

  const label = document.createElement("span");
  label.classList.add("card__item-label");
  label.textContent = labelText;

  const valueT = document.createElement("span");
  valueT.classList.add("card__item-value");
  valueT.textContent = valueText;

  li.appendChild(label);
  li.appendChild(valueT);

  return li;
}

// funcion que ayuda a la UI capitalizando la primera letra
export function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// funcion para formatear el tipo de moneda a COLOMBIANA
export function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    currencyDisplay: "narrowSymbol", // para que aparezca el simbolo $ en vez del COP
    minimumFractionDigits: 0,
  }).format(value);
}

export function toggleTheme(root, themeToggleBtn) {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme, themeToggleBtn);
}

export function updateIcon(theme, themeToggleBtn) {
  const icon = themeToggleBtn.querySelector("i");
  if (!icon) return;
  icon.classList.toggle("fa-sun", theme === "light");
  icon.classList.toggle("fa-moon", theme === "dark");
}

// ******************************** Funciones Resumen Gastos **********************************

// funcion para el total de gastos generales
export function totalExpenses(arrExpenses) {
  return arrExpenses.reduce((acc, { amount }) => {
    if (typeof amount !== "number" || isNaN(amount)) return acc;
    return acc + amount;
  }, 0);
}

// funcion para el total por categoria
export function totalExpensesByCategory(arrExpenses, fmCategory) {
  const filteredByCategory = arrExpenses.filter((expense) => expense.category === fmCategory);

  return filteredByCategory.reduce((acc, { amount }) => {
    if (typeof amount !== "number" || isNaN(amount)) return acc;
    return acc + amount;
  }, 0);
}

// funcion para el total por fecha
export function totalExpensesByDate(arrExpenses, targetDate) {
  if (!targetDate) return 0;

  const { start, end } = getDayRangeLocal(targetDate);

  const filteredByDate = arrExpenses.filter(
    (expense) => expense.date >= start && expense.date < end
  );

  return filteredByDate.reduce((acc, { amount }) => {
    if (typeof amount !== "number" || isNaN(amount)) return acc;
    return acc + amount;
  }, 0);
}

// ******************************** Funciones filtros **********************************

// funcion para filtrar por categoria
export function filterExpensesByCategory(arrExpenses, category) {
  return arrExpenses.filter((expense) => expense.category === category);
}

// funcion para filtrar por fecha
export function filterExpensesByDate(arrExpenses, selectedDateString) {
  if (!selectedDateString) return arrExpenses;
  const { start, end } = getDayRangeLocal(selectedDateString);
  return arrExpenses.filter((expense) => expense.date >= start && expense.date < end);
}

function getDayRangeLocal(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const start = new Date(year, month - 1, day).getTime(); // Local 00:00
  const end = new Date(year, month - 1, day + 1).getTime(); // Local 00:00 del siguiente día
  return { start, end };
}
