import styled from "styled-components";
import { Todo } from "../types/todo";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
`;

const Title = styled.span<{ completed: boolean }>`
  font-size: 1rem;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#999" : "inherit")};
`;

const Description = styled.p<{ completed: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.completed ? "#999" : "#333")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  margin: 0;
  padding: 0;
  font-style: italic;
`;

const TodoText = styled.div`
  display: flex;
  align-items: left;
  gap: 0.2rem;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #fee2e2;
  }
`;

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <ListItem>
      <Content>
        <Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <TodoText>
          <Title completed={todo.completed}>{todo.title}</Title>
          {todo.description && (
            <Description completed={todo.completed}>
              {todo.description}
            </Description>
          )}
        </TodoText>
      </Content>
      <DeleteButton onClick={() => onDelete(todo.id)}>Delete</DeleteButton>
    </ListItem>
  );
}
