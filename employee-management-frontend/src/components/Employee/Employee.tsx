import { useEffect, useRef, useState } from 'react';

import EmployeeList from './EmployeeLIst';
import CreateEmployee from './CreateEmployee';
import UpdateEmployee from './updateEmployee';

import useEmployeeFilters from '../../hooks/Employee/useEmployeeFilters';
import useEmployees from '../../hooks/Employee/useEmployees';

import type { Employee, UpdateEmployeeInput } from '../../Types/EmployeeTypes';

interface EmployeeModalState {
  isCreating: boolean;
  selectedEmployee: Employee | null;
}

const INITIAL_MODAL_STATE: EmployeeModalState = {
  isCreating: false,
  selectedEmployee: null,
};

function Employees() {
  const {
    state: { employees, error, isLoading, isCreating, isUpdating },
    actions: { createEmployee, updateEmployee, deleteEmployee },
  } = useEmployees();

  const {
    filterdEmployee,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    resetFilters,
  } = useEmployeeFilters(employees);

  // Clubbed modal/form state
  const [modalState, setModalState] = useState<EmployeeModalState>(INITIAL_MODAL_STATE);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleCreate = (): void => {
    setModalState((prev) => ({
      selectedEmployee: null,
      isCreating: !prev.isCreating,
    }));
  };

  const handleEdit = (employee: Employee): void => {
    setModalState({
      isCreating: false,
      selectedEmployee: employee,
    });
  };

  const handleCancelEdit = (): void => {
    setModalState((prev) => ({
      ...prev,
      selectedEmployee: null,
    }));
  };

  const handleUpdate = async (id: number, employee: UpdateEmployeeInput): Promise<void> => {
    await updateEmployee(id, employee);
    setModalState((prev) => ({
      ...prev,
      selectedEmployee: null,
    }));
  };

  const hasActiveFilters = search !== '' || department !== 'All' || status !== 'All';

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">Loading Employees...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your employee directory, update profiles, and perform operations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleCreate}
          className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors shadow-xs ${
            modalState.isCreating
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {modalState.isCreating ? '✕ Close Form' : '+ Create Employee'}
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/50 p-4 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Create / Edit Modals */}
      {modalState.isCreating && (
        <div>
          <CreateEmployee onSubmit={createEmployee} isSubmitting={isCreating} />
        </div>
      )}

      {modalState.selectedEmployee && (
        <div>
          <UpdateEmployee
            employee={modalState.selectedEmployee}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            isSubmitting={isUpdating}
          />
        </div>
      )}

      {/* Controls Bar */}
      <div className="grid gap-3 sm:grid-cols-12 rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 shadow-xs">
        <div className="sm:col-span-6">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search employee by name, email or role..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex gap-2">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              title="Reset Filters"
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Employee List */}
      {filterdEmployee.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">
            No employees found matching your filter criteria.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <EmployeeList
          employees={filterdEmployee}
          onEdit={handleEdit}
          onDelete={deleteEmployee}
        />
      )}
    </section>
  );
}

export default Employees;
