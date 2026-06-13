// Модель однієї задачі.
// Це структура даних, з якою працює весь TODO-застосунок.
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  tags?: string[];
}