import { useParams,useNavigate } from "react-router-dom";
import type { Employee } from "../../Types/EmployeeTypes";
import { employees } from "../../data/Employeedata";
import { useEffect } from "react";
import useEmployeeById from "../../hooks/useEmployeeById";

interface EmployeeDetailsProps {
  employee?: Employee | null;
}

function EmployeeDetails() {

  const { id } = useParams();
  const {employee,error,isLoading} = useEmployeeById(Number(id));

  console.log("emp fr useid",employee);
  const navigate = useNavigate();
  useEffect(()=>{

  },[])



  
  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-500">
          Loading employee details...
        </h2>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-red-600">
          Employee Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <button
      onClick={()=>navigate('/employees')}
  className="mb-6 rounded-lg bg-gray-200 px-4 py-2"
>
  ← Back to Employees
</button>
      <h2 className="text-xl font-bold">
        Employee Details
      </h2>

      <div className="mt-4 space-y-2">
        <p>Name: {employee.name}</p>
        <p>Email: {employee.email}</p>
        <p>Department: {employee.department}</p>
        <p>Role: {employee.role}</p>
        <p>Joining Date: {employee.joiningDate}</p>
        <p>Status: {employee.status}</p>
      </div>
    </div>
  );
}

export default EmployeeDetails;