import { ApiResponse } from '@/types/global.types';
import { Todo } from '@/types/todo.types';
import axios from 'axios';

export async function getTodos(): Promise<ApiResponse<Todo[]>> {
  return await axios.get('/api/todos');
}

export async function addTodo(payload: { text: string }) {
  return await axios.post('/api/todos', payload);
}

export async function deleteTodo(id: number) {
  return await axios.delete('/api/todos', {
    data: {
      id,
    },
  });
}

export async function updateTodo(id: number) {
  return await axios.patch('/api/todos', { id });
}
