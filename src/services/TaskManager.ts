import { TaskList } from "../models/TaskList";
import { CommandHistory } from "../commands/CommandHistory";
import { Task } from "../models/Task";
import { AddTaskCommand } from "../commands/AddTaskCommand";
import { RemoveTaskCommand } from "../commands/RemoveTaskCommand";
import { UpdateTaskCommand } from "../commands/UpdateTaskCommand";
import { CompleteTaskCommand } from "../commands/CompleteTaskCommand";

// TaskManager — головний сервіс для зовнішнього коду.
// Він не змінює задачі напряму, а створює команди.
export class TaskManager {
  private taskList = new TaskList();
  private history = new CommandHistory();

  // Додає нову задачу через AddTaskCommand.
  public addTask(task: Omit<Task, "id" | "createdAt" | "completed">): string {
    const newTask: Task = {
      id: this.generateId(),
      createdAt: new Date(),
      completed: false,
      ...task,
    };

    this.history.executeCommand(
      new AddTaskCommand(this.taskList, newTask)
    );

    return newTask.id;
  }

  // Видаляє задачу через RemoveTaskCommand.
  public removeTask(id: string): void {
    this.history.executeCommand(
      new RemoveTaskCommand(this.taskList, id)
    );
  }

  // Оновлює задачу через UpdateTaskCommand.
  public updateTask(id: string, updates: Partial<Task>): void {
    this.history.executeCommand(
      new UpdateTaskCommand(this.taskList, id, updates)
    );
  }

  // Міняє completed через CompleteTaskCommand.
  public completeTask(id: string, completed: boolean = true): void {
    this.history.executeCommand(
      new CompleteTaskCommand(this.taskList, id, completed)
    );
  }

  // Скасувати останню дію.
  public undo(): void {
    this.history.undo();
  }

  // Повторити останню скасовану дію.
  public redo(): void {
    this.history.redo();
  }

  // Отримати поточний список задач.
  public getTasks(): Task[] {
    return this.taskList.getAllTasks();
  }

  // Простий генератор унікального id.
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}