import { ApiResponse } from '@/types/global.types';
import { User } from '@/types/user.types';
import axios from 'axios';

export async function getUser(): Promise<ApiResponse<User[]>> {
  return await axios.get('https://jsonplaceholder.typicode.com/users');
}
