const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

const THEME_STORAGE_KEY = "theme-preference";

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.checked = theme === "dark";
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

applyTheme(getInitialTheme());

themeToggle.addEventListener("change", () => {
  const nextTheme = themeToggle.checked ? "dark" : "light";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  const item = document.createElement("li");
  item.className = "todo-item";

  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;
  label.addEventListener("click", () => {
    item.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    item.remove();
  });

  item.append(label, deleteButton);
  todoList.appendChild(item);

  todoInput.value = "";
  todoInput.focus();
});
