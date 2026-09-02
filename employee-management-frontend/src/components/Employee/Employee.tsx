import {
  useEffect,
  useRef,
  useState,
} from "react";

import EmployeeList from "./EmployeeLIst";
import CreateEmployee from "./CreateEmployee";
import UpdateEmployee from "./updateEmployee";

import useEmployeeFilters from "../../hooks/useEmployeeFilters";
import useEmployees from "../../hooks/useEmployees";

import type { Employee, UpdateEmployeeInput } from "../../Types/EmployeeTypes";

function Employees() {
  const {
    state: {
      employees,
      error,
      isLoading,
      isCreating,
      isUpdating,
    },
    actions: {
      createEmployee,
      updateEmployee,
      deleteEmployee,
    },
  } = useEmployees();

  const {
    filterdEmployee,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
  } = useEmployeeFilters(employees);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showCreateEmployeeForm, setShowCreateEmployeeForm] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleEdit(employee: Employee): void {
    setSelectedEmployee(employee);
  }

  async function handleUpdate(id: number, employee: UpdateEmployeeInput): Promise<void> {
    await updateEmployee(id, employee);
    setSelectedEmployee(null);
  }

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading Employees...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employees
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Manage your employee list and operations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateEmployeeForm(!showCreateEmployeeForm)}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-900"
        >
          {showCreateEmployeeForm ? "Close Form" : "+ Create Employee"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-950/50 p-4 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Controls Bar */}
      <div className="mb-6 grid gap-4 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search employee by name, email or role..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {showCreateEmployeeForm && (
        <div className="mb-6">
          <CreateEmployee onSubmit={createEmployee} isSubmitting={isCreating} />
        </div>
      )}

      {selectedEmployee && (
        <div className="mb-6">
          <UpdateEmployee
            employee={selectedEmployee}
            onSubmit={handleUpdate}
            isSubmitting={isUpdating}
          />
        </div>
      )}

      <EmployeeList
        employees={filterdEmployee}
        onEdit={handleEdit}
        onDelete={deleteEmployee}
      />
    </section>
  );
}

export default Employees;