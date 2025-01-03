import styled from "styled-components";
import { useState } from "react";

const Form = styled.form`
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
`;

interface CreateTodoProps {
  onAdd: (title: string, description?: string) => Promise<void>;
}

export function CreateTodo({ onAdd }: CreateTodoProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const trimmedText = text.trim();
      const title = trimmedText.slice(0, 50);
      const description = trimmedText.slice(50);
      console.log(title, description);

      await onAdd(title, description);
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          disabled={isSubmitting}
        />
        <AddButton type="submit" disabled={!text.trim() || isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Todo"}
        </AddButton>
      </InputGroup>
    </Form>
  );
}
