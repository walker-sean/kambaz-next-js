import ZustandCounter from "./counter";
import TodoList from "./todos/ZustandTodoList";
export default function ZustandExamples() {
  return (
    <div>
      <h2>Zustand Examples</h2>
      <ZustandCounter />
      <hr />
      <TodoList />
    </div>
  );
}
