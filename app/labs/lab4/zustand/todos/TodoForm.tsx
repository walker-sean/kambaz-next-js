"use client";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function TodoForm() {
  const { addTodo, updateTodo, todo, setTodo } = useTodoStore();
  return (
    <ListGroupItem className="d-flex flex-row-reverse">
      <Button
        onClick={addTodo}
        id="wd-add-todo-click"
        className="btn btn-success ms-2"
      >
        {" "}
        Add{" "}
      </Button>
      <Button
        onClick={updateTodo}
        id="wd-update-todo-click"
        className="btn btn-warning ms-2"
      >
        {" "}
        Update{" "}
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
    </ListGroupItem>
  );
}
