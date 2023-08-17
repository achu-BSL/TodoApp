import { ReactNode, createContext, useContext, useState } from "react";
import { TodoInterface } from "../components/TodoList";
import { TodoBucketInterface } from "../components/TodoBucket";

interface TodoProviderProps {
  children: ReactNode;
}

interface stateInterface {
  todoList: TodoInterface[];
  todoBucket: TodoBucketInterface[];
}

interface TodoContextInterface {
  addTodo: (task_label: string, bucket_id?: string) => void;
  deleteTodo: (id: string, bucket_id?: string) => void;
  changeTodoStatus: (id: string, bucket_id?: string) => void;
  toggleOption: () => void;
  addBucket: (title: string) => void;
  deleteBucket: (bucket_id: string) => void;
  state: stateInterface;
  isTodoBucket: boolean;
}

const TodoContext = createContext({} as TodoContextInterface);

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, setState] = useState<stateInterface>({
    todoBucket: [],
    todoList: [],
  });
  const [isTodoBucket, setIsTodoBucket] = useState(false);

  /**
   * Add new todo bucket.
   *
   * @param title - The todo bucket title.
   */
  const addBucket = (title: string) => {
    const bucket_id = Math.floor(Math.random() * 10000000000).toString();
    const newBucket: TodoBucketInterface = {
      title,
      bucket_id,
      todos: [],
    };
    setState((prevState) => ({
      ...prevState,
      todoBucket: [...prevState.todoBucket, newBucket],
    }));
  };

  /**
   * Dlete todo bucket by it's bucket_id.
   * @param bucket_id - The bucket id to find the specific bucket to remove.
   */
  const deleteBucket = (bucket_id: string) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoBucket: prevState.todoBucket.filter(
          (bucket) => bucket.bucket_id !== bucket_id
        ),
      };
    });
  };

  /**
   * Toggle menu option;
   */
  const toggleOption = () => {
    setIsTodoBucket((prev) => !prev);
  };

  /**
   * Create new todo.
   *
   * @param task_label - The todo name for creating new todo.
   * @param bucket_id -!Optional - The bucket_id of specific bucket. This allows
   * to add new todo in specific bucket.
   */
  const addTodo = (task_label: string, bucket_id?: string): void => {
    //generating id for todo.
    const id = Math.floor(Math.random() * 10000000000).toString();
    const newTodo = { task_label, id, isCompleted: false };
    //condtion for where the todo should add.
    bucket_id
      ? setState((prevState) => {
          return {
            ...prevState,
            todoBucket: prevState.todoBucket.map((bucket) => {
              if (bucket.bucket_id === bucket_id) {
                return { ...bucket, todos: [...bucket.todos, newTodo] };
              }
              return bucket;
            }),
          };
        })
      : setState((prevState) => {
          return {
            ...prevState,
            todoList: [...prevState.todoList, newTodo],
          };
        });
  };

  /**
   * Toggle status by it's id.
   *
   * @param id - The todo Id to change the status of
   * specific todo.
   */
  const changeTodoStatus = (id: string, bucket_id?: string) => {
    bucket_id
      ? setState((prevState) => {
          return {
            ...prevState,
            todoBucket: prevState.todoBucket.map((bucket) => {
              if (bucket.bucket_id === bucket_id) {
                return {
                  ...bucket,
                  todos: bucket.todos.map((todo) => {
                    if (todo.id === id) {
                      return { ...todo, isCompleted: !todo.isCompleted };
                    }
                    return todo;
                  }),
                };
              }
              return bucket;
            }),
          };
        })
      : setState((prevState) => {
          return {
            ...prevState,
            todoList: prevState.todoList.map((todo) => {
              if (todo.id === id) {
                console.log(!todo.isCompleted);
                return { ...todo, isCompleted: !todo.isCompleted };
              }
              return todo;
            }),
          };
        });
  };

  /**
   * Delete todo by it's id.
   * This function can use delete todo from both todolist or
   * .todobucket.
   *
   * @param id - The id for find the specific todo for delete.
   * @param bucket_id -!Optional - The bucket id to delete todo from the bucket.
   */
  const deleteTodo = (id: string, bucket_id?: string) => {
    bucket_id
      ? setState((prevState) => {
          return {
            ...prevState,
            todoBucket: prevState.todoBucket.map((bucket) => {
              if (bucket.bucket_id === bucket_id) {
                return {
                  ...bucket,
                  todos: bucket.todos.filter((todo) => todo.id != id),
                };
              }
              return bucket;
            }),
          };
        })
      : setState((prevState) => {
          return {
            ...prevState,
            todoList: prevState.todoList.filter((todo) => todo.id !== id),
          };
        });
  };

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        deleteTodo,
        addBucket,
        deleteBucket,
        changeTodoStatus,
        toggleOption,
        isTodoBucket,
        state,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
