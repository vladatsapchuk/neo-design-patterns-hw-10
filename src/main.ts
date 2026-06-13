import { TaskManager } from "./services/TaskManager";

const manager = new TaskManager();

// Допоміжна функція, щоб гарно показувати стан задач.
function printState(title: string): void {
  console.log(`\n${title}`);
  console.log(manager.getTasks());
}

// Додаємо нову задачу.
const taskId = manager.addTask({
  title: "Завершити домашнє завдання",
  priority: "high",
});

printState("--- Після додавання задачі ---");

// Оновлюємо задачу.
manager.updateTask(taskId, {
  title: "Завершити складне домашнє завдання",
  priority: "medium",
});

printState("--- Після оновлення задачі ---");

// Позначаємо задачу як виконану.
manager.completeTask(taskId, true);

printState("--- Після позначення як виконаної ---");

// Видаляємо задачу.
manager.removeTask(taskId);

printState("--- Після видалення задачі ---");

// Скасовуємо видалення.
manager.undo();

printState("--- Після undo видалення ---");

// Скасовуємо зміну статусу.
manager.undo();

printState("--- Після undo виконання задачі ---");

// Скасовуємо оновлення.
manager.undo();

printState("--- Після undo оновлення задачі ---");

// Скасовуємо додавання.
manager.undo();

printState("--- Після undo додавання задачі ---");

// Відновлюємо додавання.
manager.redo();

printState("--- Після redo додавання задачі ---");

// Відновлюємо оновлення.
manager.redo();

printState("--- Після redo оновлення задачі ---");

// Відновлюємо виконання.
manager.redo();

printState("--- Після redo виконання задачі ---");

// Відновлюємо видалення.
manager.redo();

printState("--- Після redo видалення задачі ---");