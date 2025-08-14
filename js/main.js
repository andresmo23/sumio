// ? Archivo principal que contiene: importaciones, referencias al DOM, variable global, eventos

// *Importaciones necesarias
import {
  createExpense,
  removeExpenseById,
  editExpenseById,
  getExpenseById,
  totalExpenses,
  totalExpensesByCategory,
  totalExpensesByDate,
  filterExpensesByCategory,
  filterExpensesByDate,
  toggleTheme,
} from "./utils.js";
import {
  renderExpenses,
  showEditModal,
  hideEditModal,
  getEditFormData,
  renderSummary,
} from "./ui.js";
import {
  saveExpensesToStorage,
  getExpensesFromStorage,
  clearExpensesFromStorage,
  initializeTheme,
} from "./storage.js";
import { validateFormFields } from "./formValidation.js";

// *Referencias necesarias
const btnClearHistory = document.querySelector(".sumio__btn.btn--clear");
const btnCreateExpense = document.querySelector(".sumio__btn.btn--create");
const modalEdit = document.getElementById("edit__modal");
const btnApplyFilter = document.querySelector(".sumio__btn.btn__aplly-filter");
export const containerExpenses = document.querySelector(".section--expenses");

const themeToggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

// *Variable de estado global
let originalExpenses = getExpensesFromStorage();
renderExpenses(originalExpenses);
renderSummary(totalExpenses(originalExpenses));

// boton para limpiar el localStorage
btnClearHistory.addEventListener("click", () => {
  clearExpensesFromStorage();
  originalExpenses = [];
  renderExpenses(originalExpenses);
  renderSummary(totalExpenses(originalExpenses));
});

// crear gasto
btnCreateExpense.addEventListener("click", (e) => {
  e.preventDefault();
  // clearAllErrors();

  const formDescription = document.getElementById("form__description");
  const formAmount = document.getElementById("form__amount");
  const formCategory = document.getElementById("form__category");
  const formType = document.getElementById("form__type");

  const valDescrip = formDescription.value;
  const valAmou = parseFloat(formAmount.value);
  const valCateg = formCategory.value;
  const valType = formType.value === "necesario";

  //validacion
  if (!validateFormFields("form")) return;

  const newExpenses = createExpense(originalExpenses, valDescrip, valAmou, valCateg, valType);
  originalExpenses = newExpenses;
  saveExpensesToStorage(originalExpenses);
  renderExpenses(originalExpenses);
  renderSummary(totalExpenses(originalExpenses));
  // console.log("Mostrando nuevos datos:", originalExpenses);

  formDescription.value = "";
  formAmount.value = "";
  formCategory.value = "Categoria";
  formType.value = "Extra o Necesario";
});

let currentEditingId = null; // variable temporal para guardar el id

// delegacion de eventos para eliminar y mostrar el modal de editar
containerExpenses.addEventListener("click", (e) => {
  // verificar que se haga clic en un boton, sino es un boton ignora
  const button = e.target.closest("button");
  if (!button) return;

  const expenseId = button.dataset.id; // Id del boton cliceado
  const action = button.dataset.name; // Nombre si es eliminar o editar

  if (action === "delete") {
    const newExpenses = removeExpenseById(originalExpenses, expenseId);
    originalExpenses = newExpenses;
    saveExpensesToStorage(originalExpenses);
    renderExpenses(originalExpenses);
    renderSummary(totalExpenses(originalExpenses));
    return;
  }

  if (action === "edit") {
    const expenseToEdit = getExpenseById(originalExpenses, expenseId);
    currentEditingId = expenseId;
    showEditModal(expenseToEdit);
  }
});

// editar gasto
modalEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  // clearAllErrors();
  const updatedData = getEditFormData();

  // validaciones
  if (!validateFormFields("edit")) return;

  const newExpenses = editExpenseById(originalExpenses, currentEditingId, updatedData);
  originalExpenses = newExpenses;
  saveExpensesToStorage(originalExpenses);
  renderExpenses(originalExpenses);
  renderSummary(totalExpenses(originalExpenses));
  hideEditModal();
});

// filtrar por categoria o fecha
btnApplyFilter.addEventListener("click", () => {
  const categoryFilter = document.getElementById("filter--select");
  const dateFilter = document.getElementById("filter--date");

  const catFilterValue = categoryFilter.value;
  const datFilterValue = dateFilter.value;

  // solo categoria
  if (catFilterValue !== "todas" && datFilterValue === "") {
    const filteredExpenses = filterExpensesByCategory(originalExpenses, catFilterValue);
    renderExpenses(filteredExpenses);
    renderSummary(totalExpensesByCategory(filteredExpenses, catFilterValue));
  }

  // solo fecha
  if (catFilterValue === "todas" && datFilterValue !== "") {
    const filteredExpenses = filterExpensesByDate(originalExpenses, datFilterValue);
    renderExpenses(filteredExpenses);
    renderSummary(totalExpensesByDate(filteredExpenses, datFilterValue));
  }

  // ambas categoria y fecha
  if (catFilterValue !== "todas" && datFilterValue !== "") {
    const filteredByCategory = filterExpensesByCategory(originalExpenses, catFilterValue);
    const filteredExpenses = filterExpensesByDate(filteredByCategory, datFilterValue);
    renderExpenses(filteredExpenses);
    renderSummary(totalExpensesByCategory(filteredExpenses, catFilterValue));
  }

  // ningun filtro
  if (catFilterValue === "todas" && datFilterValue === "") {
    renderExpenses(originalExpenses);
    renderSummary(totalExpenses(originalExpenses));
  }
});

themeToggleBtn.addEventListener("click", () => {
  toggleTheme(root, themeToggleBtn);
});

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme(root, themeToggleBtn);
});
