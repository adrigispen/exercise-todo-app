import { Type } from "@sinclair/typebox";

export const TodoSchema = {
  create: Type.Object({
    title: Type.String({ minLength: 1, maxLength: 100 }),
    description: Type.Optional(Type.String({ maxLength: 5000 })),
    completed: Type.Boolean(),
  }),

  update: Type.Partial(
    Type.Object({
      title: Type.String({ minLength: 1, maxLength: 100 }),
      description: Type.String({ maxLength: 5000 }),
      completed: Type.Boolean(),
    })
  ),

  params: Type.Object({
    id: Type.String(),
  }),
};
