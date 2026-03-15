"use client";
import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { Todo, useTodoStore } from "./useTodoStore";
import TodoForm from "./TodoForm";
export default function TodoList() {
  const { todos } = useTodoStore();

  return (
    <div id="wd-todo-list-react-context">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
