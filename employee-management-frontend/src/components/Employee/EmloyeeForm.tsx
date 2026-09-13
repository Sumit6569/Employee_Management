import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { EmployeeFormData } from '../../Types/EmployeeSchema';

import type { EmployeeFormData } from "../../Types/EmployeeSchema";

interface EmployeeFormProps {
  register: UseFormRegister<EmployeeFormData>;

  errors: FieldErrors<EmployeeFormData>;

  onSubmit: React.FormEventHandler<HTMLFormElement>;

  isSubmitting: boolean;

  title: string;

  submitText: string;

  submittingText: string;
  onCancel?: () => void;
}

function EmployeeForm({
  register,
  errors,
  onSubmit,
  isSubmitting,
  title,
  submitText,
  submittingText,
  onCancel,
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
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-xs transition-colors">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-sm"
          >
            Name
          </label>
            ✕ Cancel
          </button>
        )}
      </div>

          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded border px-3 py-2"
          />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              {...register('name')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

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
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. john@example.com"
              {...register('email')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
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
          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Department
            </label>
            <input
              id="department"
              type="text"
              placeholder="e.g. Engineering"
              {...register('department')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {errors.department && (
              <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>
            )}
          </div>

          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded border px-3 py-2"
          />
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Role
            </label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Frontend Developer"
              {...register('role')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
          {/* Joining Date */}
          <div>
            <label
              htmlFor="joiningDate"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Joining Date
            </label>
            <input
              id="joiningDate"
              type="date"
              {...register('joiningDate')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
            {errors.joiningDate && (
              <p className="mt-1 text-xs text-red-500">{errors.joiningDate.message}</p>
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
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>
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
        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/60">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Joining Date */}
        <div>
          <label
            htmlFor="joiningDate"
            className="mb-1 block"
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
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
            {isSubmitting ? submittingText : submitText}
          </button>
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