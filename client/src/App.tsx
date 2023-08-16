import "./App.css";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-10">Todo App</h1>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default App;
