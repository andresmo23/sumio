import { showMessageError, clearAllErrors } from "./ui.js";

// ? funciones para las validaciones necesarias a los inputs

// descripción
function isValidDescription(text) {
  const regex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  return regex.test(text.trim());
}

// monto
function isValidAmount(value) {
  return typeof value === "number" && !isNaN(value) && value > 0;
}

// categoria
function isValidCategory(category) {
  return category !== "Categoria";
}

// tipo
function isValidType(type) {
  //   return type === "extra" || type === "necesario";
  return typeof type === "boolean";
}

// Función principal
export function validateFormFields(formType) {
  clearAllErrors();

  let descriptionId, amountId, categoryId, typeId;
  let errorSuffix = "";

  if (formType === "edit") {
    descriptionId = "edit__description";
    amountId = "edit__amount";
    categoryId = "edit__category";
    typeId = "edit__type";
    errorSuffix = "--edit";
  } else {
    descriptionId = "form__description";
    amountId = "form__amount";
    categoryId = "form__category";
    typeId = "form__type";
    errorSuffix = "";
  }

  const description = document.getElementById(descriptionId).value.trim();
  const amount = parseFloat(document.getElementById(amountId).value);
  const category = document.getElementById(categoryId).value;
  const type = document.getElementById(typeId).value === "necesario";

  let hasError = false;

  if (!isValidDescription(description)) {
    showMessageError(`error__description${errorSuffix}`, "La descripción es obligatoria.");
    hasError = true;
  }

  if (!isValidAmount(amount)) {
    showMessageError(`error__amount${errorSuffix}`, "El monto debe ser mayor a cero.");
    hasError = true;
  }

  if (!isValidCategory(category)) {
    showMessageError(`error__category${errorSuffix}`, "Selecciona una categoría válida.");
    hasError = true;
  }

  if (!isValidType(type)) {
    showMessageError(`error__type${errorSuffix}`, "Selecciona un tipo válido.");
    hasError = true;
  }

  return !hasError;
}
