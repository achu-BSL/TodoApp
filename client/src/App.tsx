import "./App.css";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-10">Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;
