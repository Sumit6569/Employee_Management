import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import EmployeeForm from './EmloyeeForm';

import { employeeSchema, type EmployeeFormData } from '../../Types/EmployeeSchema';

import useEmployees from '../../hooks/useEmployees';

import type { Employee } from '../../Types/EmployeeTypes';
import { useState } from 'react';

interface UpdateEmployeeProps {
  employee: Employee;
  setSelectedEmployee:()=>void;
  
}

function UpdateEmployee({ employee,setSelectedEmployee }: UpdateEmployeeProps) {
  const { actions } = useEmployees();
  const [showUpdateEmployeeForm, setShowUpdateEmployeeForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),

    defaultValues: {
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      joiningDate: employee.joiningDate,
      status: employee.status,
    },
  });

  async function onSubmit(data: EmployeeFormData): Promise<void> {
    await actions.updateEmployee(employee.id, data);
    setSelectedEmployee(null);
    

  }

  return (
    <>
      <EmployeeForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        title="Edit Employee"
        submitText="Save Changes"
        submittingText="Saving..."
      />
    </>
  );
}

export default UpdateEmployee;
