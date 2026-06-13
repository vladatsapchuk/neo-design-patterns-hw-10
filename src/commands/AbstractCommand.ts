import { Command } from "./Command";

// Базовий клас для команд.
// redo за замовчуванням просто повторює execute.
export abstract class AbstractCommand implements Command {
  public abstract execute(): void;

  public abstract undo(): void;

  public redo(): void {
    this.execute();
  }
} 