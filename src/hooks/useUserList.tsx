import { keys } from '@/config/queryKeys';
import { getUser } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useUserList() {
  return useQuery({
    queryKey: [keys.userList],
    queryFn: () => getUser(),
  });
}
