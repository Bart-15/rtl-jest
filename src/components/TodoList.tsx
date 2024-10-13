'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoListProps = {
  todoList: Todo[];
};

const TodoList = ({ todoList }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="rounded bg-gray-100 p-4 shadow">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="mr-2 rounded border border-gray-300 p-2"
        placeholder="Add new todo"
      />
      <button
        onClick={handleAddTodo}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add Todo
      </button>
      <ul className="mt-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between border-b p-2 ${todo.completed ? 'bg-green-100' : ''}`}
            >
              <span
                data-testid={`toggle-complete-${todo.id}`}
                onClick={() => handleToggleTodo(todo.id)}
                className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.text}
              </span>
              <button
                data-testid={`delete-button-${todo.id}`}
                onClick={() => handleDeleteTodo(todo.id)}
                className="rounded bg-red-500 px-2 py-1 text-white"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No todos</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
