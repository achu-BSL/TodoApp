import "./App.css";
import { TodoApp } from "./components/TodoApp";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-10">Todo App</h1>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </div>
  );
}

export default App;
