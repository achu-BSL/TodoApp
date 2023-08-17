import { FC } from "react";
import { MenuBar } from "./menu/MenuBar";
import { TodoBucket } from "./TodoBucket";
import { TodoList } from "./TodoList";
import { useTodoContext } from "../context/TodoContext";

export const TodoApp: FC = () => {
  const { isTodoBucket } = useTodoContext();
  return (
    <>
      <div className="flex container">
        <MenuBar />
        <div className="bg-pink-400 bg-opacity-20 container m-5 py-6 px-4 rounded-md shadow-lg">
          {isTodoBucket ? <TodoBucket /> : <TodoList />}
        </div>
      </div>
    </>
  );
};
