import { FC } from "react";
import { NewOne } from "./NewOne";
import { useTodoContext } from "../../context/TodoContext";
import { TodoBucketOption } from "./TodoBucketOption";
import { TodoListOption } from "./TodoListOption";

export const MenuBar: FC = () => {
  const { isTodoBucket } = useTodoContext();
  return (
    <>
      <div>
        <NewOne />
        <div className="flex gap-2 flex-col px-2 py-3 container rounded-lg shadow-lg mt-3">
          {isTodoBucket ? <TodoBucketOption /> : <TodoListOption />}
        </div>
      </div>
    </>
  );
};
