import { useState } from 'react';

export type RolePermissions = {
  role: string;
  active: boolean;
  permissions: {
    allAccess: boolean;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
};

const rolesData: RolePermissions[] = [
  {
    role: 'Editor',
    active: true,
    permissions: {
      allAccess: false,
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
  {
    role: 'Viewer',
    active: true, // Not active, won't be displayed
    permissions: {
      allAccess: false,
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },
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
    role: 'CTO',
    active: true,
    permissions: {
      allAccess: false,
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },

  // Add more roles as needed
];

export function useTogglePermissions() {
  //Fetch data here using react query

  const [roles, setRoles] = useState<RolePermissions[]>(rolesData);

  const togglePermissions = (
    roleIndex: number,
    permission: keyof RolePermissions['permissions'],
  ) => {
    const updatedRoles = roles.map((role, idx) => {
      if (idx === roleIndex) {
        // if all access it checked
        if (permission === 'allAccess') {
          const allChecked = !role.permissions.allAccess;

          return {
            ...role,
            permissions: {
              allAccess: allChecked,
              create: allChecked,
              read: allChecked,
              update: allChecked,
              delete: allChecked,
            },
          };
        }

        // Every checkbox
        const updatedPermissions = {
          ...role.permissions,
          [permission]: !role.permissions[permission],
        };

        const allAccess =
          updatedPermissions.create &&
          updatedPermissions.read &&
          updatedPermissions.update &&
          updatedPermissions.delete;

        return {
          ...role,
          permissions: {
            ...updatedPermissions,
            allAccess,
          },
        };
      }

      return role;
    });

    setRoles(updatedRoles);
  };

  return {
    roles,
    setRoles,
    togglePermissions,
  };
}
