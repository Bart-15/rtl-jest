'use client';

import { Todo } from '@/types/todo.types';
import { useFetchTodos } from './hooks/useFetchTodo';
import TodoAddInput from './TodoAddInput';
import TodoItem from './TodoList';
type TodoListProps = {
  todoList: Todo[];
};

const TodoList = ({ todoList }: TodoListProps) => {
  const { data, isLoading } = useFetchTodos();

  const todos = data?.data as Todo[];

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="rounded bg-gray-100 p-4 shadow">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <TodoAddInput />
      <ul className="mt-4">
        {todos?.length > 0 ? (
          todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <li>No todos</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
