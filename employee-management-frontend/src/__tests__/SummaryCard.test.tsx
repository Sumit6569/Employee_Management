import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SummaryCard from '../components/Report/SummaryCard.tsx';

describe('SummaryCard Component (React Testing Library)', () => {
  it('renders the title and numerical value correctly', () => {
    render(<SummaryCard title="Total Employees" value={25} />);

    // Assert that title is rendered
    expect(screen.getByText('Total Employees')).toBeInTheDocument();

    // Assert that count is rendered
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders zero value properly without crashing', () => {
    render(<SummaryCard title="Active Employees" value={0} />);

    expect(screen.getByText('Active Employees')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

