// import Employee from "../components/Employee/Employee";

import type { Employee } from "../Types/EmployeeTypes";
const API_URL = "http://localhost:8000";






export async function getEmployees(): Promise<Employee[]> {
        const response = await fetch(`${API_URL}/employees`);
        if(!response.ok){
            throw new Error("Failed to fetch employees");
        }

        const result = await response.json();
        console.log("result",result.data);
        return result.data;
        
} 

export async function getEmployeeById(id:number):Promise<Employee> {
    const employee = await fetch(`${API_URL}/employees/${id}`);
    if(!employee.ok){
        throw new Error("something went wrong")
    }
    const result = await employee.json();
    console.log("Employee by id",result.data);
    return result.data;
}
