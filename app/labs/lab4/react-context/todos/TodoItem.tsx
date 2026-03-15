import React from "react";
import { ListGroupItem, Button } from "react-bootstrap";
import { useTodos } from "./todosContext";
export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const { deleteTodo, setTodo } = useTodos()!;
  return (
    <ListGroupItem
      key={todo.id}
      className="d-flex flex-row-reverse align-items-center"
    >
      <Button
        onClick={() => deleteTodo(todo)}
        id="wd-delete-todo-click"
        className="btn btn-danger ms-2"
      >
        {" "}
        Delete{" "}
      </Button>
      <Button
        onClick={() => setTodo(todo)}
        id="wd-set-todo-click"
        className="btn btn-primary ms-2"
      >
        {" "}
        Edit{" "}
      </Button>
      <span className="me-auto">{todo.title}</span>
    </ListGroupItem>
  );
}
