import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../types/todo";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { showCompleted?: boolean }>({
      query: ({ showCompleted }) => `/todos?showCompleted=${showCompleted}`,
      providesTags: ["Todo"],
    }),

    addTodo: builder.mutation<
      Todo,
      { title: string; description?: string; completed: boolean }
    >({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation<Todo, { id: string; completed: boolean }>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
