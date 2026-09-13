import { Routes, Route } from 'react-router-dom';

import AppLayout from './Layout/AppLayOut';
import Dashboard from './components/Dashboard/Dashboard';
import Employees from './components/Employee/Employee';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import Reports from './pages/Reports/Reports';
import NotFound from './components/NotFound/NotFound';
import Notification from './components/Notification/Notification';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './components/Unauthorized/Unauthorized';

function App() {
  return (
    <>
      <Notification />

      <Routes>
        {/* All authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Admin + Manager */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
          <Route element={<AppLayout />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
