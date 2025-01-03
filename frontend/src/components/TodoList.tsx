import styled from "styled-components";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/todo";

const Container = styled.div`
  margin-top: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #4b5563;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

interface TodoListProps {
  todos: Todo[];
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function TodoList({
  todos,
  showCompleted,
  onShowCompletedChange,
  onToggle,
  onDelete,
  isLoading,
}: TodoListProps) {
  if (isLoading) {
    return <EmptyState>Loading todos...</EmptyState>;
  }

  return (
    <Container>
      <FilterContainer>
        <Checkbox
          type="checkbox"
          id="show-completed"
          checked={showCompleted}
          onChange={(e) => onShowCompletedChange(e.target.checked)}
        />
        <Label htmlFor="show-completed">Show completed</Label>
      </FilterContainer>

      {todos.length === 0 ? (
        <EmptyState>
          {showCompleted
            ? "Nothing started, nothing finished. Add your tasks!"
            : "You're done here! No active todos"}
        </EmptyState>
      ) : (
        <List>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </List>
      )}
    </Container>
  );
}
