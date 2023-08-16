import { createContext, useContext } from "react";

interface TodoContextInterface {

}

const TodoContext = createContext({} as TodoContextInterface);

export const useTodoContext = () => {
    useContext(TodoContext);
}

