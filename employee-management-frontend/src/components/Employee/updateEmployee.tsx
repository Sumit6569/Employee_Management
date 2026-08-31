import React, { useState } from "react";

import type {
  Employee,
  UpdateEmployeeInput,
} from "../../Types/EmployeeTypes";

import EmployeeForm from "./EmloyeeForm";

interface UpdateEmployeeProps {
  employee: Employee;

  onSubmit: (
    id: number,
    employee: UpdateEmployeeInput
  ) => Promise<void>;

  isSubmitting: boolean;
}

function UpdateEmployee({
  employee,
  onSubmit,
  isSubmitting,
}: UpdateEmployeeProps) {
  const [formData, setFormData] =
    useState<UpdateEmployeeInput>({
      name: employee.name,
      department: employee.department,
      email: employee.email,
      role: employee.role,
      joiningDate: employee.joiningDate,
      status: employee.status,
    });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    await onSubmit(
      employee.id,
      formData
    );
  }

  return (
    <EmployeeForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Edit Employee"
      submitText="Save Changes"
      submittingText="Saving..."
    />
  );
}

export default UpdateEmployee;