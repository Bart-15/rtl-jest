import { getTodos } from '@/services/todo.service';
import { useQuery } from '@tanstack/react-query';

export function useFetchTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });
}
