import styled from "styled-components";
import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./store/api";

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
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const {
    data: todos = [],
    isLoading,
    error,
  } = useGetTodosQuery({ showCompleted });
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async (title: string, description?: string) => {
    try {
      await addTodo({ title, description, completed: false }).unwrap();
    } catch (err) {
      // Error handling is managed by RTK Query
      console.error("Failed to add todo:", err);
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await updateTodo({
        id,
        completed: !todo.completed,
      }).unwrap();
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <AppContainer>
      <Header>Todos</Header>

      {error && (
        <ErrorMessage>
          {error instanceof Error ? error.message : "An error occurred"}
        </ErrorMessage>
      )}

      <CreateTodo onAdd={handleAddTodo} />

      <TodoList
        todos={todos}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        isLoading={isLoading}
      />
    </AppContainer>
  );
}
