import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { EmployeeFormData } from "../../Types/EmployeeSchema";

interface EmployeeFormProps {
  register: UseFormRegister<EmployeeFormData>;

  errors: FieldErrors<EmployeeFormData>;

  onSubmit: React.FormEventHandler<HTMLFormElement>;

  isSubmitting: boolean;

  title: string;

  submitText: string;

  submittingText: string;
}

function EmployeeForm({
  register,
  errors,
  onSubmit,
  isSubmitting,
  title,
  submitText,
  submittingText,
}: EmployeeFormProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label
            htmlFor="department"
            className="mb-1 block"
          >
            Department
          </label>

          <input
            id="department"
            type="text"
            {...register("department")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.department && (
            <p className="mt-1 text-sm text-red-500">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="mb-1 block"
          >
            Role
          </label>

          <input
            id="role"
            type="text"
            {...register("role")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.role && (
            <p className="mt-1 text-sm text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Joining Date */}
        <div>
          <label
            htmlFor="joiningDate"
            className="mb-1 block"
          >
            Joining Date
          </label>

          <input
            id="joiningDate"
            type="date"
            {...register("joiningDate")}
            className="w-full rounded border px-3 py-2"
          />

          {errors.joiningDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-1 block"
          >
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting
            ? submittingText
            : submitText}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;