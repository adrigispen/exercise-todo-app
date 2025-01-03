import express, { Request, Response } from "express";
import cors from "cors";
import { TodoService } from "./services/todoService";
import { validate } from "./middleware/validate";
import { TodoSchema } from "./validation/schemas";

export function createApp(todoService: TodoService) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Create Todo
  const createTodo = async (req: Request, res: Response) => {
    try {
      const todo = await todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: "Invalid todo data" });
    }
  };

  // Get All Todos
  const getAllTodos = async (req: Request, res: Response) => {
    const showCompleted = req.query.showCompleted === "true" ? true : false;
    const todos = await todoService.filterTodos(showCompleted);
    res.json(todos);
  };

  // Get Todo by ID
  const getTodoById = async (req: Request<{ id: string }>, res: Response) => {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  };

  // Update Todo
  const updateTodo = async (req: Request<{ id: string }>, res: Response) => {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  };

  // Delete Todo
  const deleteTodo = async (req: Request<{ id: string }>, res: Response) => {
    const success = await todoService.deleteTodo(req.params.id);
    if (!success) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.status(204).send();
  };

  // Routes
  app.post("/api/todos", validate(TodoSchema.create), createTodo);
  app.get("/api/todos", getAllTodos);
  app.get("/api/todos/:id", validate(TodoSchema.params, "params"), getTodoById);
  app.put(
    "/api/todos/:id",
    [validate(TodoSchema.params, "params"), validate(TodoSchema.update)],
    updateTodo
  );
  app.delete(
    "/api/todos/:id",
    validate(TodoSchema.params, "params"),
    deleteTodo
  );

  return app;
}
