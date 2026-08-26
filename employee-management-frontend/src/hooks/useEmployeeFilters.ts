import type { Employee } from "../Types/EmployeeTypes";
import { employees } from "../data/Employeedata";
import { useState } from "react";

function useEmployeeFilters(employees:Employee[]){
    const [search, setSearch] = useState("");
      const [department,setDepartment] = useState("All");
      const [status,setStatus] = useState("All");

  

    const filterdEmployee =  employees.filter((employee)=>{
      const matchesSearch =employee.name.toLowerCase().includes(search.toLowerCase());
    
      const matchesDepartment =department === "All" ||employee.department === department;
     
      const matchStatus = status==="All" || status === employee.status
      
      return matchesSearch && matchesDepartment && matchStatus;
    });


    return{
        filterdEmployee,
        search,
        setSearch,
        department,
        setDepartment,
        status,
        setStatus,
        

    }
      
}

export default useEmployeeFilters;