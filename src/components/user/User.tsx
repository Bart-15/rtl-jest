import UserList from './UserList';

type UserProps = {};
const User = ({}: UserProps) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 font-mono text-2xl">User List</h2>
      <UserList />
    </div>
  );
};

export default User;
