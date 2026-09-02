import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import EmployeeForm from './EmloyeeForm';

import { employeeSchema, type EmployeeFormData } from '../../Types/EmployeeSchema';

import useEmployees from '../../hooks/Employee/useEmployees';

import type { UpdateEmployeeInput } from '../../Types/EmployeeTypes';

interface UpdateEmployeeProps {
  employee: Employee;
  onSubmit?: (id: number, employee: UpdateEmployeeInput) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

function UpdateEmployee({
  employee,
  onSubmit: onSubmitProp,
  isSubmitting: isSubmittingProp,
}: UpdateEmployeeProps) {
  const { actions } = useEmployees();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
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
    if (onSubmitProp) {
      await onSubmitProp(employee.id, data);
    } else {
      await actions.updateEmployee(employee.id, data);
    }
  }

  return (
    <EmployeeForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmittingProp ?? isFormSubmitting}
      title="Edit Employee"
      submitText="Save Changes"
      submittingText="Saving..."
    />
  );
}

export default UpdateEmployee;
