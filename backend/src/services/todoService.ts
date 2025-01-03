import { randomUUID } from "crypto";
import { Todo } from "../types/todo";

export class TodoService {
  private todos: Map<string, Todo> = new Map();

  async createTodo(
    todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ): Promise<Todo> {
    const id = randomUUID();
    const now = new Date();

    const todo: Todo = {
      ...todoData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.todos.set(id, todo);
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.todos.get(id) || null;
  }

  async updateTodo(
    id: string,
    updates: Partial<Omit<Todo, "id" | "createdAt">>
  ): Promise<Todo | null> {
    const todo = this.todos.get(id);
    if (!todo) return null;

    const updatedTodo: Todo = {
      ...todo,
      ...updates,
      updatedAt: new Date(),
    };

    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<boolean> {
    return this.todos.delete(id);
  }
}
