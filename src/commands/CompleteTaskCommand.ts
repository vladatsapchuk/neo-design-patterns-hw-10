import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";

// Команда зміни completed-статусу.
export class CompleteTaskCommand extends AbstractCommand {
  private previousCompleted?: boolean;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private completed: boolean = true
  ) {
    super();
  }

  // Виконати: зберегти старий статус і поставити новий.
  public execute(): void {
    const currentTask = this.taskList.getTaskById(this.taskId);

    if (!currentTask) {
      return;
    }

    this.previousCompleted = currentTask.completed;

    this.taskList.completeTask(this.taskId, this.completed);
  }

  // Скасувати: повернути старий статус completed.
  public undo(): void {
    if (this.previousCompleted !== undefined) {
      this.taskList.completeTask(this.taskId, this.previousCompleted);
    }
  }
}