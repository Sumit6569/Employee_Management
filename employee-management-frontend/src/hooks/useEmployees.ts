import { useEffect, useState } from "react";
import type { Employee } from "../Types/EmployeeTypes";
import { getEmployees } from "../services/employeeService";



function useEmployee(){
    const [employee,setEmpolyee]= useState<Employee[]| []>([]);
    const [isLoading,setLoading]= useState(true);
    const [error,setError]  = useState<string | null>(null);

    useEffect(()=>{
                   fetchEmployee()           
    },[])
      
    const fetchEmployee = async()=>{
        try {
            setLoading(true);
            setError(null);
            const data =  await getEmployees();
            console.log(data);
            setEmpolyee(data);
        } catch (error) {
            setError( error instanceof Error
            ? error.message
            : "Something went wrong");
        }finally{
            setLoading(false);
            
        }
    }


    console.log(employee);

    

    return{
        employee,
        isLoading,
        error,
    };

    
}


export default useEmployee;