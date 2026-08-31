import React, { useState } from "react";

import type {
  Employee,
  UpdateEmployeeInput,
} from "../../Types/EmployeeTypes";

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
    const { value, name } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    await onSubmit(employee.id, formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold">
        Edit Employee
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full rounded-lg border p-3"
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      >
        <option value="">
          Select Department
        </option>

        <option value="Engineering">
          Engineering
        </option>

        <option value="Design">
          Design
        </option>

        <option value="Human Resources">
          Human Resources
        </option>
      </select>

      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        placeholder="Role"
        className="w-full rounded-lg border p-3"
      />

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
        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : "Save Changes"}
      </button>
    </form>
  );
}

export default UpdateEmployee;