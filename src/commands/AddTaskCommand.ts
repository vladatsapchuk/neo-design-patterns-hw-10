import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

// Команда додавання задачі.
export class AddTaskCommand extends AbstractCommand {
  constructor(
    private taskList: TaskList,
    private task: Task
  ) {
    super();
  }

  // Виконати: додати задачу.
  public execute(): void {
    this.taskList.addTask(this.task);
  }

  // Скасувати: видалити цю задачу.
  public undo(): void {
    this.taskList.removeTask(this.task.id);
  }
}