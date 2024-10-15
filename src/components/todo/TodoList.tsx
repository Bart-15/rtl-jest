import { Todo } from '@/types/todo.types';
import { useDeleteTodo } from './hooks/useDeleteTodo';
import { useUpdateTodo } from './hooks/useUpdateTodo';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  async function handleDeleteTodo(id: number) {
    await deleteTodoMutation.mutateAsync(id);
  }

  return (
    <>
      <li
        className={`flex items-center justify-between border-b p-2 ${todo.completed ? 'bg-green-100' : ''}`}
      >
        <span
          data-testid={`toggle-complete-${todo.id}`}
          className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
          onClick={() => updateTodoMutation.mutate(todo.id)}
        >
          {todo.text}
        </span>
        <button
          data-testid={`delete-button-${todo.id}`}
          className="rounded bg-red-500 px-2 py-1 text-white"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    </>
  );
};

export default TodoItem;
