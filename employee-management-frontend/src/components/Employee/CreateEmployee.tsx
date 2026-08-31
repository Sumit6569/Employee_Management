import React, { useState } from "react";

import type {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "../../Types/EmployeeTypes";

import EmployeeForm from "./EmloyeeForm";

interface CreateEmployeeProps {
  onSubmit: (
    employee: CreateEmployeeInput
  ) => Promise<void>;

  isSubmitting: boolean;
}

function CreateEmployee({
  onSubmit,
  isSubmitting,
}: CreateEmployeeProps) {
  const [formData, setFormData] =
    useState<UpdateEmployeeInput>({
      name: "",
      department: "",
      email: "",
      role: "",
      joiningDate: "",
      status: "Active",
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

    await onSubmit(formData);

    setFormData({
      name: "",
      department: "",
      email: "",
      role: "",
      joiningDate: "",
      status: "Active",
    });
  }

  return (
    <EmployeeForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      title="Create Employee"
      submitText="Create Employee"
      submittingText="Creating..."
    />
  );
}

export default CreateEmployee;