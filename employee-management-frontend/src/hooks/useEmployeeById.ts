import React, { useEffect, useState } from 'react'
import type { Employee } from '../Types/EmployeeTypes';
import { getEmployeeById } from '../services/employeeService';

function useEmployeeById(id:number) {
    const [employee,setEmployee] = useState<Employee | null>(null);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        featchEmployeeById(id)
    },[]);

    const featchEmployeeById =  async (id:number)=>{
        try {
            setLoading(true);
            const employee = await getEmployeeById(id);
            setEmployee(employee);

        } catch (error) {
              setError( error instanceof Error
            ? error.message
            : "Something went wrong");
        }finally{
            setLoading(false);
        }
        

    }
  return {
    employee,
    error,
     isLoading
  }
}

export default useEmployeeById