"use client";

import CounterContext from "./counter";
import { CounterProvider } from "./counter/context";
import TodoList from "./todos/ReactContextTodoList";
import { TodoProvider } from "./todos/todosContext";

export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </div>
  );
}
