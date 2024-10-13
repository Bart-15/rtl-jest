import { useUserList } from '@/hooks/useUserList';
import UserCard from './UserItem';

const UserList = () => {
  const { data, isError, isFetched, isLoading } = useUserList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user list.</div>;
  }

  const userList = data?.data ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {userList.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
