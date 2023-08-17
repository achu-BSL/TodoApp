import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";

export const TodoListOption: FC = () => {
    const { toggleOption } = useTodoContext();
    return (
        <>
        <div className="shadow-lg rounded-md p-3 bg-fuchsia-300">Todo List</div>
        <div
          onClick={toggleOption}
          className="rounded-md shadow-lg p-3 bg-fuchsia-200 hover:bg-fuchsia-300"
        >
          Todo Buckets
        </div>
      </>
    );
}