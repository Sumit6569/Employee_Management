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

import type { Employee } from "../../Types/EmployeeTypes";

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

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState<Employee | null>(null);
  const[showCreateEmployeeForm,setShowCreateEmployeeFrom] = useState(false);

  const inputRef =
    useRef<HTMLInputElement | null>(null);

  function handleEdit(employee: Employee): void {
    setSelectedEmployee(employee);
  }

  async function handleUpdate(
    id: number,
    employee: Employee
  ): Promise<void> {
    await updateEmployee(id, employee);

    setSelectedEmployee(null);
  }

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  if (isLoading) {
    return <h2>Loading Employees...</h2>;
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Employees
        </h2>

        <p className="mt-1 text-gray-500">
          Manage your employees.
        </p>
      </div>

      {error && (
        <p className="mb-4 text-red-600">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search employee..."
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />

      <select
        value={department}
        onChange={(event) =>
          setDepartment(event.target.value)
        }
        className="mb-6 rounded-lg border border-gray-300 bg-white px-4 py-3"
      >
        <option value="All">
          All Departments
        </option>

        <option value="Engineering">
          Engineering
        </option>

        <option value="Design">
          Design
        </option>

        <option value="Human Resources">
          Human Resources
        </option>
      </select>

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value)
        }
        className="ml-10 mb-6 rounded-lg border border-gray-300 bg-white px-4 py-3"
      >
        <option value="All">
          All
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>
      <button onClick={()=>setShowCreateEmployeeFrom(!showCreateEmployeeForm)}  className="rounded-lg bg-yellow-600 px-4 py-2 text-sm text-white hover:bg-pink-700 ml-6"> CreateEmloyee</button>

      
        { showCreateEmployeeForm &&   <CreateEmployee onSubmit={createEmployee} isSubmitting={isCreating}/>}
    

      {selectedEmployee && (
        <UpdateEmployee
          employee={selectedEmployee}
          onSubmit={handleUpdate}
          isSubmitting={isUpdating}
        />
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