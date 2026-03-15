"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
  id: string;
  title: string;
}

// Define the context state
interface TodoContextState {
  todos: Todo[];
  todo: Todo;
  addTodo: () => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: () => void;
  setTodo: (todo: Todo) => void;
}

// Create the context
const TodoContext = createContext<TodoContextState | undefined>(undefined);

// Create the provider component
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "Learn React", id: crypto.randomUUID() },
    { title: "Learn Node", id: crypto.randomUUID() },
  ]);
  const [todo, setTodo] = useState({
    title: "Learn Mongo",
    id: crypto.randomUUID(),
  });

  const addTodo = () => {
    // change the id in case is was populated by the user pressing edit
    setTodos((todos) => [...todos, { ...todo, id: crypto.randomUUID() }]);
    setTodo({ title: "", id: crypto.randomUUID() });
  };
  const deleteTodo = ({ id }: Todo) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  const updateTodo = () => {
    setTodos((todos) =>
      todos.map((item) => (item.id === todo.id ? todo : item)),
    );
    setTodo({ title: "", id: crypto.randomUUID() });
  };
  const value: TodoContextState = {
    todo,
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    setTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// Create a custom hook to use the counter context
export const useTodos = () => {
  const context = useContext(TodoContext);
  return context;
};
