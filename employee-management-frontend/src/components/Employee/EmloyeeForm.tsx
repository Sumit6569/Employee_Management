import React from "react";
import type { UpdateEmployeeInput } from "../../Types/EmployeeTypes";

interface EmployeeFormProps {
  formData: UpdateEmployeeInput;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  isSubmitting: boolean;
  title: string;
  submitText: string;
  submittingText: string;
}

function EmployeeForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  title,
  submitText,
  submittingText,
}: EmployeeFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Name"
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
        required
        className="w-full rounded-lg border p-3"
      />

      <select
        name="department"
        value={formData.department}
        onChange={onChange}
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
        onChange={onChange}
        placeholder="Role"
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        name="joiningDate"
        type="date"
        value={formData.joiningDate}
        onChange={onChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={onChange}
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
          ? submittingText
          : submitText}
      </button>
    </form>
  );
}

export default EmployeeForm;