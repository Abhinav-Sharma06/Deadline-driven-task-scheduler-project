import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddTaskPage from "./pages/AddTaskPage";
import CompletedTasksPage from "./pages/CompletedTasksPage"

function App() {

  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addTask" element={<AddTaskPage/>} />
        <Route path = "/completedTasks" element={<CompletedTasksPage />}/>
      </Routes>
    </div>
  );
}

export default App;
