// import Employee from "../components/Employee/Employee";
import type { Employee } from "../Types/EmployeeTypes";
const API_URL = "http://localhost:8000";






export async function getEmployees(): Promise<Employee[]> {
        const response = await fetch(`${API_URL}/employees`);
        if(!response.ok){
            throw new Error("Failed to fetch employees");
        }

        const result = await response.json();
        return result.data;
        
} 

