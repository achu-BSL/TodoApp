import React, { FC, FormEvent, useRef, useState } from "react";
import { TodoInterface } from "./TodoList";
import { useTodoContext } from "../context/TodoContext";
import CloseIcon from "@mui/icons-material/Close";

export interface TodoBucketInterface {
  bucket_id: string;
  title: string;
  todos: TodoInterface[];
}

export const TodoBucket: FC = () => {
  const { state, addTodo, deleteTodo, changeTodoStatus, deleteBucket } =
    useTodoContext();
  const input = useRef<HTMLInputElement>(null);

  /**
   * Form submit handler.
   * this function allow us to add todo
   * in specific bucket.
   *
   * @param {FormEvent} e - The formevent
   * @param bucket_id - The bucket_id to invoke addTodo function.
   */
  function submitHandler(e: FormEvent, bucket_id: string) {
    // Prevent the default form submission behavior (reloading the page)
    e.preventDefault();
    // Get the form element from the event.
    const formElement = e.currentTarget as HTMLFormElement;
    // Initialize a FormData object to retrieve form input data.
    const formData = new FormData(formElement);
    // Get the input value from the FormData using the "todo-label" key
    const inpVal = formData.get("todo-label") as string;
    // Invoke the addTodo function with the input value and bucket ID..
    addTodo(inpVal, bucket_id);
    // Reset the form fields to clear user-entered data
    formElement.reset();
  }

  return (
    <div className="flex gap-4">
      {state.todoBucket.map((bucket) => (
        <div
          className="relative bg-pink-300 bg-opacity-30 border border-slate-900 px-2 py-3 rounded-lg shadow-lg h-auto"
          key={bucket.bucket_id}
        >
          <h1 className="text-xl font-bold mb-1">{bucket.title}</h1>
          <div className="border border-slate-900 mb-5 mt-1 opacity-20"></div>
          <div className="flex flex-col gap-2 flex-grow">
            {bucket.todos.map((todo) => (
              <div
                className="relative rounded-lg flex justify-between border border-slate-700 px-3 py-4 bg-pink-400 bg-opacity-40 shadow-lg"
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
                    onChange={() => changeTodoStatus(todo.id, bucket.bucket_id)}
                    type="checkbox"
                    name="status"
                    id="status"
                    checked
                    className="w-4"
                  />
                ) : (
                  <input
                    onChange={() => changeTodoStatus(todo.id, bucket.bucket_id)}
                    type="checkbox"
                    name="status"
                    id="status"
                    className="w-4"
                  />
                )}
                <button
                  className="absolute right-0 top-0"
                  onClick={() => deleteTodo(todo.id, bucket.bucket_id)}
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => submitHandler(e, bucket.bucket_id)}>
            <input
              className="bg-transparent border-b-2 border-slate-800 mt-3 focus:border-pink-600 focus:outline-none px-1"
              ref={input}
              type="text"
              name="todo-label"
            />
            <button>Add</button>
          </form>
          <button
            className="absolute right-1 top-0.5"
            onClick={() => deleteBucket(bucket.bucket_id)}
          >
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  );
};
