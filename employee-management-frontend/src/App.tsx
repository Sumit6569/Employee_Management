import { Routes, Route } from "react-router-dom";

import AppLayout from "./Layout/AppLayOut";
import Dashboard from "./components/Dashboard/Dashboard";
import Employees from "./components/Employee/Employee";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import NotFound from "./components/NotFound/NotFound";
import Notification from "./components/Notification/Notification";
function App() {
  return (
    <>
      <Notification />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;