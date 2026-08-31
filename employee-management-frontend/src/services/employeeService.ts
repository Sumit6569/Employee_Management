import { get,post, put } from "./httpClient";
import type {
  Employee,
  CreateEmployeeInput,
} from "../Types/EmployeeTypes";



export async function getEmployees(): Promise<Employee[]> {
return await get<Employee[]>("/employees");
} 

export async function getEmployeeById(id:number):Promise<Employee> {
   return await get<Employee>(`/employee/${id}`);    
}

export async function createEmployee(employee: CreateEmployeeInput):Promise<Employee> {
    return post<Employee,CreateEmployeeInput>("/employees",employee); 
}

export async function updateEmployee(id:number,employee:CreateEmployeeInput):Promise<Employee> {
  return put<Employee,CreateEmployeeInput>(`/employees/${id}`,employee);
}

