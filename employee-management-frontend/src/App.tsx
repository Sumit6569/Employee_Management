import { Routes, Route } from "react-router-dom";

import AppLayout from "./Layout/AppLayOut";
import Dashboard from "./components/Dashboard/Dashboard";
import Employees from "./components/Employee/Employee";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route
           path="/employees/:id"
           element={<EmployeeDetails />}
          />
      </Route>
    </Routes>
  );
}

export default App;