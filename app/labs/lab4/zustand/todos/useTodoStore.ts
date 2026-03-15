import { create } from "zustand";

export interface Todo {
  title: string;
  id: string;
}

// Define the todo state
interface TodoState {
  todo: Todo;
  todos: Todo[];
  addTodo: () => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: () => void;
  setTodo: (todo: Todo) => void;
}

// Use create function to create a hook giving us access to the state
export const useTodoStore = create<TodoState>((set) => ({
  todo: { title: "Learn Mongo", id: crypto.randomUUID() },
  todos: [
    { title: "Learn React", id: crypto.randomUUID() },
    { title: "Learn Node", id: crypto.randomUUID() },
  ],
  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, { ...state.todo, id: crypto.randomUUID() }],
      todo: { title: "", id: crypto.randomUUID() },
    })),
  deleteTodo: (todo) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== todo.id),
    })),
  updateTodo: () =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === state.todo.id ? state.todo : item,
      ),
      todo: { title: "", id: crypto.randomUUID() },
    })),
  setTodo: (todo) => set(() => ({ todo })),
}));
