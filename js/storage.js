// ? Guardar, obtener y limpiar datos desde localStorage

// funcion para guardar en el localstorage
export function saveExpensesToStorage(arrExpenses) {
  localStorage.setItem("sumioKey", JSON.stringify(arrExpenses));
}

// funcion para obtener la llave y convertir el json a arreglo nuevamente
export function getExpensesFromStorage() {
  const data = localStorage.getItem("sumioKey");
  return data ? JSON.parse(data) : [];
}

// se usa cuando el usuario quiera eliminar su historial de gastos
// si se hacen pruebas y se quiere empezar desde cero
export function clearExpensesFromStorage() {
  localStorage.removeItem("sumioKey");
}

export function initializeTheme(root, themeToggleBtn) {
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme, themeToggleBtn);
}
