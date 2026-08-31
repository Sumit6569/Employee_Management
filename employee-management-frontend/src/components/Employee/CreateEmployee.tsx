import React from 'react'
import { useState } from 'react'
import type { CreateEmployeeInput, Employee } from '../../Types/EmployeeTypes'



interface CreateEmployeeProps {
  onSubmit: (employee: CreateEmployeeInput) => Promise<void>;
  isSubmitting: boolean;
}

function CreateEmployee({onSubmit,isSubmitting}:CreateEmployeeProps) {

    const [formData,setFormData] = useState<CreateEmployeeInput>({
        name:"",
        department:"",
        email:"",
        role:"",
        joiningDate:"",
        status:"Active",
    });

    function handleChange(event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>){
        const {name,value} = event.target;

        setFormData((previous)=>({
            ...previous,
            [name]:value
        }));
    }

    async function handleSubmit(event:React.SubmitEvent<HTMLFormElement>):Promise<void> {
        event.preventDefault();
        await onSubmit(formData);
    }




  return (
    <>
    <form onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
    
    >
        <h2 className="text-xl font-bold">
        Create Employee
      </h2>

      <input name='name' value={formData.name} onChange={handleChange} placeholder='Name' required className="w-full rounded-lg border p-3"/>
      <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email' required className="w-full rounded-lg border p-3"/>
      <select  name='department' value={formData.department} onChange={handleChange} required  className="w-full rounded-lg border p-3">
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Desing">Desing</option>
                <option value="Human Resources">Human Resources</option>

      </select>
      <input type="text" name='role' value={formData.role} onChange={handleChange}  required placeholder='Role' className="w-full rounded-lg border p-3"/>
       <input
        name="joiningDate"
        type="date"
        value={formData.joiningDate}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

        <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? "Creating..."
          : "Create Employee"}
      </button>
      
    </form>
    </>
  )
}

export default CreateEmployee