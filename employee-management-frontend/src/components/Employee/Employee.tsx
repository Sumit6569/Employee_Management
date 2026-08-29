import { useEffect, useRef, useState } from "react";
import EmployeeList from "./EmployeeLIst";
import { employees } from "../../data/Employeedata";
import type { Employee } from "../../Types/EmployeeTypes";
import EmployeeDetails from "./EmployeeDetails";
import useEmployeeFilters from "../../hooks/useEmployeeFilters";
import useEmployee from "../../hooks/useEmployees";
function Employees() {


  const {filterdEmployee,search,setSearch,department,setDepartment,status,setStatus} =  useEmployeeFilters(employees);
 
  const {employee,error,isLoading} = useEmployee();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },1500)
    // inputRef.current?.focus();
  
  },[]);
useEffect(() => {
  if (!isLoading) {
    inputRef.current?.focus();
  }
}, [isLoading]);
  



  
  
  return isLoading ? (<h2>Loading Employee</h2>) : (
    
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Employees
        </h2>

        <p className="mt-1 text-gray-500">
          Manage your employees.
        </p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search employee..."
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />
      <select
  value={department}
  onChange={(event) => setDepartment(event.target.value)}
  className="mb-6 rounded-lg border border-gray-300 bg-white px-4 py-3"
>
  <option value="All">All Departments</option>
  <option value="Engineering">Engineering</option>
  <option value="Design">Design</option>
  <option value="Human Resources">Human Resources</option>
       </select>
<select
  value={status}
  onChange={(event) => setStatus(event.target.value)}
  className="ml-10 mb-6 rounded-lg border border-gray-300 bg-white px-4 py-3"
>
  <option value="All">All</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
  
    </select>
       // old Code for state lift up
      {/* <EmployeeList employees={filterdEmployee} onEmployeeClick={handleEmployeeClick}/> */}
       <EmployeeList employees={filterdEmployee}/>
     {/* {employee && <EmployeeDetails employee={employee}/>} */}
    </section>

    
  );
  
  
}

export default Employees;