import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '../ui/checkbox';
import {
  RolePermissions,
  useTogglePermissions,
} from './hooks/useTogglePermission.hook';

const headers: string[] = [
  'User Role',
  'All Access',
  'Create',
  'Read',
  'Update',
  'Delete',
];

const UserManagement = () => {
  const { roles, togglePermissions } = useTogglePermissions();

  return (
    <div className="container mx-auto">
      <h2 className="my-10 text-2xl font-bold">User Management</h2>

      <Table className="overflow-x-auto p-4">
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                className="border border-gray-300 text-center"
                key={header}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles
            .filter((role) => role.active)
            .map((role, idx) => (
              <TableRow key={idx}>
                <TableCell className="px-4 py-3">
                  <p>{role.role}</p>
                </TableCell>

                {Object.keys(role.permissions).map((permission) => {
                  const checkboxId = `role-${idx}-${permission}`; // Unique ID
                  const checkBoxIdx = roles.findIndex(
                    (r) => r.role === role.role,
                  );

                  return (
                    <TableCell className="text-center" key={checkboxId}>
                      <Checkbox
                        id={checkboxId}
                        checked={
                          role.permissions[
                            permission as keyof RolePermissions['permissions']
                          ]
                        }
                        onCheckedChange={() =>
                          togglePermissions(
                            checkBoxIdx,
                            permission as keyof RolePermissions['permissions'],
                          )
                        }
                      />
                    </TableCell>
                  );
                })}

                {/* <TableCell className="text-center">
                  <Checkbox
                    checked={role.permissions.allAccess}
                    onCheckedChange={() => togglePermissions(idx, 'allAccess')}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={role.permissions.create}
                    onCheckedChange={() => togglePermissions(idx, 'create')}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={role.permissions.read}
                    onCheckedChange={() => togglePermissions(idx, 'read')}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={role.permissions.update}
                    onCheckedChange={() => togglePermissions(idx, 'update')}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Checkbox
                    checked={role.permissions.delete}
                    onCheckedChange={() => togglePermissions(idx, 'delete')}
                  />
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
