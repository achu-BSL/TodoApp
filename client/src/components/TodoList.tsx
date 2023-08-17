import { useTodoContext } from "../context/TodoContext";
export interface TodoInterface {
  id: number;
  name: string;
  isCompleted: boolean;
}

export const TodoList = () => {
  const { todos, changeTodoStatus } = useTodoContext();
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <div
          className="flex justify-between bg-pink-300 p-5 bg-opacity-75 font-serif rounded-md border-2 border-pink-900"
          key={todo.id}
        >
          <h1
            className={
              todo.isCompleted
                ? "text-stone-500 line-through text-xl"
                : "text-xl"
            }
          >
            {todo.name}
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
        </div>
      ))}
    </div>
  );
};
