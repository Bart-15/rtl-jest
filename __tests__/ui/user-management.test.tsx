import { useTogglePermissions } from '@/components/user-management/hooks/useTogglePermission.hook';
import UserManagement from '@/components/user-management/UserManagement';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// const mockRoles = [
//   {
//     role: 'Admin',
//     active: true,
//     permissions: {
//       allAccess: true,
//       create: true,
//       read: true,
//       update: true,
//       delete: true,
//     },
//   },
//   {
//     role: 'User',
//     active: false, // Inactive, should not be rendered
//     permissions: {
//       allAccess: false,
//       create: false,
//       read: false,
//       update: false,
//       delete: false,
//     },
//   },
// ];

// // Mock the specific hook for this test only
jest.mock(
  '../../src/components/user-management/hooks/useTogglePermission.hook',
);

describe('User Management Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render user management component correctly', () => {
    const mockRoles = [
      {
        role: 'Admin',
        active: true,
        permissions: {
          allAccess: true,
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      },
      {
        role: 'User',
        active: true,
        permissions: {
          allAccess: false,
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      },
    ];

    // Provide mock implementation for useTogglePermissions hook
    (useTogglePermissions as jest.Mock).mockReturnValue({
      roles: mockRoles,
      togglePermissions: jest.fn(),
    });

    render(<UserManagement />);

    const heading = screen.getByRole('heading', {
      name: /user management/i,
    });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('should render active roles with correct permissions', () => {
    const mockRoles = [
      {
        role: 'Admin',
        active: true,
        permissions: {
          allAccess: true,
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      },
      {
        role: 'User',
        active: false,
        permissions: {
          allAccess: false,
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      },
    ];

    // Provide mock implementation for useTogglePermissions hook
    (useTogglePermissions as jest.Mock).mockReturnValue({
      roles: mockRoles,
      togglePermissions: jest.fn(),
    });

    const { getByText, getAllByRole, queryByText } = render(<UserManagement />);

    expect(getByText('Admin')).toBeInTheDocument();
    expect(queryByText('User')).not.toBeInTheDocument();
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[3]).toBeChecked();
    expect(checkboxes[4]).toBeChecked();
  });

  it('should checked all checkboxes once access all checked', async () => {
    const { getByText, getAllByRole } = render(<UserManagement />);
    expect(getByText('Admin')).toBeInTheDocument();

    const checkboxes = getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[3]).toBeChecked();
    expect(checkboxes[4]).toBeChecked();
  });
});
