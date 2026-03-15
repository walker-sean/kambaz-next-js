import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function TodoForm() {
  const { todo, addTodo, updateTodo, setTodo } = useTodos()!;

  return (
    <ListGroupItem className="d-flex flex-row-reverse">
      <Button
        onClick={() => addTodo()}
        id="wd-add-todo-click"
        className="btn btn-success ms-2"
      >
        {" "}
        Add{" "}
      </Button>
      <Button
        onClick={() => updateTodo()}
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
