import type { User } from '@/types/user.types';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="place-items-center overflow-hidden rounded bg-white p-4 shadow-lg">
      <div className="mb-2 text-xl font-bold">{user.name}</div>
      <p className="text-base text-gray-700">{user.email}</p>
      <p className="text-sm text-gray-600">Username: {user.username}</p>
      <p className="text-sm text-gray-600">Phone: {user.phone}</p>
      <p className="text-sm text-gray-600">
        Website:{' '}
        <a
          href={`http://${user.website}`}
          target="_blank"
          className="text-blue-500"
        >
          {user.website}
        </a>
      </p>
      <div className="mt-4 text-xs text-gray-500">
        {user.address.street}, {user.address.city}
      </div>
    </div>
  );
};

export default UserCard;
