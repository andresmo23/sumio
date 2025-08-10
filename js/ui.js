// ? funciones visuales

// importaciones necesarias
import {
  formatDate,
  generateExpenseButtons,
  createItem,
  capitalizeFirstLetter,
  formatCOP,
} from "./utils.js";
import { containerExpenses } from "./main.js";

// funcion para renderizar en el DOM
export function renderExpenses(arrExpenses) {
  containerExpenses.innerHTML = "";

  arrExpenses.forEach((expense) => {
    const containerCards = document.createElement("div");
    containerCards.classList.add("sumio__card");
    containerCards.dataset.id = expense.id;

    const listItems = document.createElement("ul");
    listItems.classList.add("card__list--items");

    listItems.appendChild(createItem("Descripción:", capitalizeFirstLetter(expense.description)));

    const formatMonto = formatCOP(expense.amount);
    listItems.appendChild(createItem("Monto:", formatMonto));

    listItems.appendChild(createItem("Categoria:", capitalizeFirstLetter(expense.category)));

    const typeText = expense.type ? "Necesario" : "Extra";
    listItems.appendChild(createItem("Tipo:", typeText));

    const formattedDate = formatDate(expense.date);
    listItems.appendChild(createItem("Fecha:", formattedDate));

    const containerButtons = generateExpenseButtons(expense.id);
    listItems.appendChild(containerButtons);

    containerCards.appendChild(listItems);
    containerExpenses.appendChild(containerCards);
  });
}

// funcion para mostrar los valores precargados del modal
export function showEditModal(expense) {
  document.getElementById("edit__description").value = expense.description;
  document.getElementById("edit__amount").value = expense.amount;
  document.getElementById("edit__category").value = expense.category;
  document.getElementById("edit__type").value = expense.type ? "necesario" : "extra";
  document.getElementById("edit__modal").classList.remove("hiden");
}

// funcion para ocultar el modal
export function hideEditModal() {
  document.getElementById("edit__modal").classList.add("hiden");
}

// funcion para obtener los datos o valores escritos
export function getEditFormData() {
  return {
    description: document.getElementById("edit__description").value,
    amount: parseFloat(document.getElementById("edit__amount").value),
    category: document.getElementById("edit__category").value,
    type: document.getElementById("edit__type").value === "necesario",
  };
}

// funcion para mostrar el monto
export function renderSummary(total) {
  const spanSummary = document.querySelector(".summary-expense");
  spanSummary.textContent = formatCOP(total);
}

// funcion mostrar mensaje de error en input
export function showMessageError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// funcion para borrar todos los mensajes de error
export function clearAllErrors() {
  const errorMessages = document.querySelectorAll(".error__message");
  errorMessages.forEach((message) => {
    message.textContent = "";
    message.style.display = "none";
  });
}
