import { describe, it, expect } from 'vitest';
import { employeeSchema } from '../Types/EmployeeSchema.ts';

describe('Employee Schema Validation (Zod)', () => {
  it('should accept valid employee form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      role: 'Frontend Developer',
      status: 'Active' as const,
      joiningDate: '2024-03-01',
    };

    const parsed = employeeSchema.safeParse(validData);
    expect(parsed.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidEmailData = {
      name: 'John Doe',
      email: 'not-an-email',
      department: 'Engineering',
      role: 'Frontend Developer',
      status: 'Active' as const,
      joiningDate: '2024-03-01',
    };

    const parsed = employeeSchema.safeParse(invalidEmailData);
    expect(parsed.success).toBe(false);
  });

  it('should reject name shorter than 2 characters', () => {
    const invalidNameData = {
      name: 'J',
      email: 'john.doe@company.com',
      department: 'Engineering',
      role: 'Frontend Developer',
      status: 'Active' as const,
      joiningDate: '2024-03-01',
    };

    const parsed = employeeSchema.safeParse(invalidNameData);
    expect(parsed.success).toBe(false);
  });
});
