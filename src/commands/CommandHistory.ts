import { Command } from "./Command";

// CommandHistory зберігає історію команд.
// Він дозволяє робити undo і redo.
export class CommandHistory {
  private commands: Command[] = [];
  private currentIndex = -1;

  // Виконує команду і додає її в історію.
  public executeCommand(command: Command): void {
    command.execute();

    // Якщо після undo виконати нову команду,
    // старий redo-шлях треба видалити.
    if (this.currentIndex < this.commands.length - 1) {
      this.commands.splice(this.currentIndex + 1);
    }

    this.commands.push(command);
    this.currentIndex = this.commands.length - 1;
  }

  // Скасовує останню виконану команду.
  public undo(): void {
    if (this.currentIndex < 0) {
      return;
    }

    this.commands[this.currentIndex].undo();
    this.currentIndex -= 1;
  }

  // Повторює наступну скасовану команду.
  public redo(): void {
    if (this.currentIndex >= this.commands.length - 1) {
      return;
    }

    this.currentIndex += 1;
    this.commands[this.currentIndex].redo();
  }
}