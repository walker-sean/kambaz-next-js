import React from "react";
import { ListGroup } from "react-bootstrap";
import { Todo, useTodos } from "./todosContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
export default function TodoList() {
  const { todos } = useTodos()!;

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
