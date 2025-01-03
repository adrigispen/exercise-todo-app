import request from "supertest";
import { Express } from "express";
import { TodoService } from "../services/todoService";
import { createApp } from "../app";

describe("Todo API", () => {
  let todoService: TodoService;
  let app: Express;

  beforeEach(() => {
    todoService = new TodoService();
    app = createApp(todoService);
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const todoData = {
        title: "Test todo",
        description: "Test description",
        completed: false,
      };

      const response = await request(app)
        .post("/api/todos")
        .send(todoData)
        .expect(201);

      expect(response.body).toMatchObject({
        ...todoData,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it("should validate required fields", async () => {
      const invalidTodo = {
        description: "Missing title",
      };

      const response = await request(app)
        .post("/api/todos")
        .send(invalidTodo)
        .expect(400);

      expect(response.body).toHaveProperty("errors");
    });
  });
  describe("GET /api/todos", () => {
    it("should return empty array when no todos exist", async () => {
      const response = await request(app).get("/api/todos").expect(200);

      expect(response.body).toEqual([]);
    });

    it("should return all todos", async () => {
      // Create a few todo items
      const todoData1 = {
        title: "Test todo 1",
        description: "small todo",
        completed: false,
      };

      const todoData2 = {
        title: "Test todo 2",
        description: "large todo",
        completed: false,
      };

      await request(app).post("/api/todos").send(todoData1);
      await request(app).post("/api/todos").send(todoData2);

      const response = await request(app).get("/api/todos").expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject(todoData1);
      expect(response.body[1]).toMatchObject(todoData2);
    });

    it("should filter by completed status", async () => {
      // Create completed and uncompleted todos
      await request(app)
        .post("/api/todos")
        .send({ title: "Todo 1", completed: true });

      await request(app)
        .post("/api/todos")
        .send({ title: "Todo 2", completed: false });

      const nonCompletedResponse = await request(app)
        .get("/api/todos?showCompleted=false")
        .expect(200);

      expect(nonCompletedResponse.body).toHaveLength(1);
      expect(nonCompletedResponse.body[0].completed).toBe(false);
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update an existing todo", async () => {
      // Create a todo first
      const createResponse = await request(app).post("/api/todos").send({
        title: "Original title",
        completed: false,
      });

      const todoId = createResponse.body.id;
      const updateData = {
        title: "Updated title",
        completed: true,
      };

      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toMatchObject({
        ...updateData,
        id: todoId,
      });
    });

    it("should return 404 for non-existent todo", async () => {
      await request(app)
        .put("/api/todos/nonexistent")
        .send({ title: "Updated title" })
        .expect(404);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete an existing todo", async () => {
      // Create a todo first
      const createResponse = await request(app).post("/api/todos").send({
        title: "To be deleted",
        completed: false,
      });

      const todoId = createResponse.body.id;

      // Delete the todo
      await request(app).delete(`/api/todos/${todoId}`).expect(204);

      // Verify it's deleted
      await request(app).get(`/api/todos/${todoId}`).expect(404);
    });

    it("should return 404 for non-existent todo", async () => {
      await request(app).delete("/api/todos/nonexistent").expect(404);
    });
  });
});
