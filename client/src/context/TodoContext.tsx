import { ReactNode, createContext, useContext, useState } from "react";
import { TodoInterface } from "../components/TodoList";


interface TodoProviderProps {
    children: ReactNode;
}

interface TodoContextInterface {
    addTodo: (name: string) => void;
    changeTodoStatus: (id: number) => void;
    todos: TodoInterface[];
    isTodoBucket: boolean;
    toggleOption: () => void;
}

const TodoContext = createContext({} as TodoContextInterface);

export const useTodoContext = () => {
    return useContext(TodoContext);
}

export const TodoProvider = ({children}: TodoProviderProps) => {

  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [isTodoBucket, setIsTodoBucket] = useState(false);


  const toggleOption = () => {
    setIsTodoBucket(prev => !prev);
  }

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
        <TodoContext.Provider value={{addTodo, changeTodoStatus, todos, isTodoBucket, toggleOption}}>
            {children}
        </TodoContext.Provider>
    );
}