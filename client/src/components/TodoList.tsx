import { useState } from "react";
import { NewTodo } from "./NewTodo";

export interface TodoInterface {
  id: number;
  name: string;
  isCompleted: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  /**
   * Create new todo.
   * 
   * @param name - The todo name for creating new todo.
   */
  const addTodo = (name: string) => {
    const id = Math.floor(Math.random() * 10000000000);
    setTodos((prevTodos) => [...prevTodos, { name, isCompleted: false, id }]);
  };

  /**
   * Toggle status by it's id.
   * 
   * @param id - The todo Id to change the status of
   * specific todo.
   */
  const changeTodoStatus = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          console.log(!todo.isCompleted);
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
  };

  return (
    <>
      <NewTodo onAdd={addTodo} />
      {todos.map((todo) => (
        <div className="flex" key={todo.id}>
          <h1 className={todo.isCompleted ? "text-slate-400": ''}>{todo.name}</h1>
          {todo.isCompleted ? (
            <input
              onChange={() => changeTodoStatus(todo.id)}
              type="checkbox"
              name="status"
              id="status"
              checked
            />
          ) : (
            <input
              onChange={() => changeTodoStatus(todo.id)}
              type="checkbox"
              name="status"
              id="status"
            />
          )}
        </div>
      ))}
    </>
  );
};
