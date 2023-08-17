import { useTodoContext } from "../context/TodoContext";
import CloseIcon from "@mui/icons-material/Close";
export interface TodoInterface {
  id: string;
  task_label: string;
  isCompleted: boolean;
}

export const TodoList = () => {
  const { state, changeTodoStatus, deleteTodo } = useTodoContext();
  return (
    <div className="flex flex-col gap-2">
      {state.todoList.map((todo) => (
        <div
          className="relative flex justify-between bg-pink-300 p-5 bg-opacity-75 font-serif rounded-md border-2 border-pink-900"
          key={todo.id}
        >
          <h1
            className={
              todo.isCompleted
                ? "text-stone-500 line-through text-xl"
                : "text-xl"
            }
          >
            {todo.task_label}
          </h1>
          {todo.isCompleted ? (
            <input
              onChange={() => changeTodoStatus(todo.id)}
              type="checkbox"
              name="status"
              id="status"
              checked
              className="w-5"
            />
          ) : (
            <input
              onChange={() => changeTodoStatus(todo.id)}
              type="checkbox"
              name="status"
              id="status"
              className="w-5"
            />
          )}
          <button className="absolute right-1 top-0.5" onClick={() => deleteTodo(todo.id)}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      ))}
    </div>
  );
};
