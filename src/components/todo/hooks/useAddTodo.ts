import { addTodo } from '@/services/todo.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useAddTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: { text: string }) => await addTodo(payload),
    onSuccess: () => {
      toast('Todo Added successfully');

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
