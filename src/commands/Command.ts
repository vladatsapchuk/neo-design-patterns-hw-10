// Базовий контракт для будь-якої команди.
// Кожна команда має вміти виконатись, скасуватись і повторитись.
export interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}