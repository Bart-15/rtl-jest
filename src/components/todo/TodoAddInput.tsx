import { useState } from 'react';
import { useAddTodo } from './hooks/useAddTodo';

const TodoAddInput = () => {
  const [todo, setTodo] = useState('');
  const addTodoMutation = useAddTodo();

  async function addTodo() {
    if (!todo) return;

    const paylaod = {
      text: todo,
    };

    const response = await addTodoMutation.mutateAsync(paylaod);
    if (response.status === 201) {
      setTodo('');
    }
  }

  return (
    <>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="mr-2 rounded border border-gray-300 p-2"
        placeholder="Add new todo"
      />
      <button
        onClick={addTodo}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add Todo
      </button>
    </>
  );
};

export default TodoAddInput;
