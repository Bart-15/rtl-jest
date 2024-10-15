import { updateTodo } from '@/services/todo.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => await updateTodo(id),
    onSuccess: () => {
      toast('Todo updated successfully');

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
