import { deleteTodo } from '@/services/todo.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => await deleteTodo(id),
    onSuccess: () => {
      toast('Todo deleted successfully');

      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(`${error?.response?.data.message}`);
      }
    },
  });

  return mutation;
}
