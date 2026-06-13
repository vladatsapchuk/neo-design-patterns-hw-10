import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

// Команда оновлення задачі.
export class UpdateTaskCommand extends AbstractCommand {
  private previousTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  // Виконати: зберегти стару версію і застосувати оновлення.
  public execute(): void {
    const currentTask = this.taskList.getTaskById(this.taskId);

    if (!currentTask) {
      return;
    }

    this.previousTask = currentTask;

    this.taskList.updateTask(this.taskId, this.updates);
  }

  // Скасувати: повернути попередню версію задачі.
  public undo(): void {
    if (this.previousTask) {
      this.taskList.updateTask(this.taskId, this.previousTask);
    }
  }
}