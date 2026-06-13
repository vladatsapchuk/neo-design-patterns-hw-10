import { Task } from "./Task";

// TaskList відповідає тільки за збереження та зміну задач.
// Це "коробка", у якій лежать усі задачі.
export class TaskList {
  private tasks: Map<string, Task> = new Map();

  // Додає задачу в колекцію.
  public addTask(task: Task): void {
    this.tasks.set(task.id, this.cloneTask(task));
  }

  // Видаляє задачу за id і повертає її копію.
  public removeTask(id: string): Task | undefined {
    const task = this.tasks.get(id);

    if (!task) {
      return undefined;
    }

    this.tasks.delete(id);

    return this.cloneTask(task);
  }

  // Оновлює частину полів задачі.
  public updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const task = this.tasks.get(id);

    if (!task) {
      return undefined;
    }

    const updatedTask: Task = {
      ...task,
      ...updates,
    };

    this.tasks.set(id, this.cloneTask(updatedTask));

    return this.cloneTask(updatedTask);
  }

  // Змінює статус completed.
  public completeTask(id: string, completed: boolean = true): Task | undefined {
    const task = this.tasks.get(id);

    if (!task) {
      return undefined;
    }

    const updatedTask: Task = {
      ...task,
      completed,
    };

    this.tasks.set(id, this.cloneTask(updatedTask));

    return this.cloneTask(updatedTask);
  }

  // Повертає всі задачі як масив копій, щоб зовнішній код не міг зламати Map.
  public getAllTasks(): Task[] {
    return Array.from(this.tasks.values()).map(task => this.cloneTask(task));
  }

  // Повертає одну задачу за id.
  public getTaskById(id: string): Task | undefined {
    const task = this.tasks.get(id);

    return task ? this.cloneTask(task) : undefined;
  }

  // Допоміжний метод для безпечного копіювання задачі.
  private cloneTask(task: Task): Task {
    return {
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      tags: task.tags ? [...task.tags] : undefined,
    };
  }
}