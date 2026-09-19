import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployeeCard from '../components/Employee/EmployeeCard.tsx';
import type { Employee } from '../Types/EmployeeTypes.ts';

const mockEmployee: Employee = {
  id: 101,
  name: 'Sarah Connor',
  email: 'sarah.connor@example.com',
  department: 'Operations',
  role: 'Operations Lead',
  status: 'Active',
  joiningDate: '2023-05-15',
};

describe('EmployeeCard Component (React Testing Library & Jest)', () => {
  it('renders employee details accurately', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <MemoryRouter>
        <EmployeeCard
          employee={mockEmployee}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </MemoryRouter>
    );

    // Assert name, email, department, and role are in the document
    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
    expect(screen.getByText('sarah.connor@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Operations Lead/)).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('calls onEdit callback when the Edit button is clicked', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <MemoryRouter>
        <EmployeeCard
          employee={mockEmployee}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </MemoryRouter>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleDelete).not.toHaveBeenCalled();
  });

  it('calls onDelete callback when the Delete button is clicked', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <MemoryRouter>
        <EmployeeCard
          employee={mockEmployee}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleEdit).not.toHaveBeenCalled();
  });

  it('renders a View link with the correct employee URL destination', () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          employee={mockEmployee}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      </MemoryRouter>
    );

    const viewLink = screen.getByRole('link', { name: /view/i });
    expect(viewLink).toHaveAttribute('href', '/employees/101');
  });
});

