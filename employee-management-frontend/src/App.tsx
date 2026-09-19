import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './Layout/AppLayOut';
import Notification from './components/Notification/Notification';
import ProtectedRoute from './routes/ProtectedRoute';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Employees = lazy(() => import('./components/Employee/Employee'));
const EmployeeDetails = lazy(() => import('./components/Employee/EmployeeDetails'));
const Reports = lazy(() => import('./pages/Reports/Reports'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Unauthorized = lazy(() => import('./components/Unauthorized/Unauthorized'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Notification />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* All authenticated users (Admin, Manager, Employee) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Admin + Manager restricted routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
            <Route element={<AppLayout />}>
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>

          {/* Fallback routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
