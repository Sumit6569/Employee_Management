import httpClient from "./httpClient";

import type {
  Employee,
  CreateEmployeeInput,
  
  ApiResponse,
} from "../Types/EmployeeTypes";



export async function getEmployees(): Promise<ApiResponse<Employee[]>> {
        const employees = await httpClient.get<ApiResponse<Employee[]>>("/employees");
        console.log("result",employees.data);
        return employees.data;
        
} 

export async function getEmployeeById(id:number):Promise<Employee> {
    const employee = await httpClient.get<ApiResponse<Employee>>(`/employee/${id}`); 
    console.log("Employee by id",employee.data);
    return employee.data.data;
}

export async function createEmployee(employee: CreateEmployeeInput):Promise<Employee> {
    const response = await httpClient.post<ApiResponse<Employee>>("/employees",employee);
    return response.data.data;
}

