import styled from "styled-components";
import { useEffect, useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/todo";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fee2e2;
  border: 1px solid #dc2626;
  border-radius: 4px;
  color: #dc2626;
`;

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [showCompleted]);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const url = `/api/todos?showCompleted=${showCompleted}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch todos");

      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string, description?: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false }),
      });

      if (!response.ok) throw new Error("Failed to add todo");

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
      throw err;
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo = await response.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  return (
    <AppContainer>
      <Header>Todos</Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <CreateTodo onAdd={addTodo} />

      <TodoList
        todos={todos}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        isLoading={isLoading}
      />
    </AppContainer>
  );
}
