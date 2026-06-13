import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

// Команда видалення задачі.
export class RemoveTaskCommand extends AbstractCommand {
  private removedTask?: Task;

  constructor(
    private taskList: TaskList,
    private taskId: string
  ) {
    super();
  }

  // Виконати: видалити задачу і запам'ятати її.
  public execute(): void {
    const task = this.taskList.removeTask(this.taskId);

    if (task) {
      this.removedTask = task;
    }
  }

  // Скасувати: повернути видалену задачу назад.
  public undo(): void {
    if (this.removedTask) {
      this.taskList.addTask(this.removedTask);
    }
  }
}