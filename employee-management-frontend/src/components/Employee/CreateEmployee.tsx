import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EmployeeForm from "./EmloyeeForm";

import {
  employeeSchema,
  type EmployeeFormData,
} from "../../Types/EmployeeSchema";

import type { CreateEmployeeInput } from "../../Types/EmployeeTypes";

interface CreateEmployeeProps {
  onSubmit?: (employee: CreateEmployeeInput) => Promise<void>;
  isSubmitting?: boolean;
}

function CreateEmployee({
  onSubmit: onSubmitProp,
  isSubmitting: isSubmittingProp,
}: CreateEmployeeProps = {}) {
  const { actions } = useEmployees();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting: isFormSubmitting,
    },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),

    defaultValues: {
      name: "",
      email: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "Active",
    },
  });

  async function onSubmit(
    data: EmployeeFormData
  ): Promise<void> {
    if (onSubmitProp) {
      await onSubmitProp(data);
    } else {
      await actions.createEmployee(data);
    }

    reset();
  }

  return (
    <EmployeeForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmittingProp ?? isFormSubmitting}
      title="Create Employee"
      submitText="Create Employee"
      submittingText="Creating..."
    />
  );
}

export default CreateEmployee;