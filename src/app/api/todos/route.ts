import { Todo } from '@/types/todo.types';
import { NextResponse } from 'next/server';
// Sample in-memory data (in production, use a database)
let todos: Todo[] = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Complete the project report', completed: true },
  { id: 3, text: 'Call the dentist', completed: false },
  { id: 4, text: 'Schedule a meeting with the team', completed: true },
  { id: 5, text: 'Pay electricity bill', completed: false },
];

// Helper to get a new ID
const getNewId = () => (todos.length ? todos[todos.length - 1].id + 1 : 1);

// GET: Fetch all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST: Create a new todo
export async function POST(req: Request) {
  const body = await req.json();
  const newTodo: Todo = {
    id: getNewId(),
    text: body.text,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// PUT: Update a todo
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id } = body;
  // Find the todo by id
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    // Update the todos array with the modified todo
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    // Return the updated todo (not the entire list)
    const updatedTodo = todos.find((todo) => todo.id === id);
    return NextResponse.json(updatedTodo);
  } else {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }
}

// DELETE: Delete a todo
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  todos = todos.filter((todo) => todo.id !== id);
  return NextResponse.json({ message: `Todo with id ${id} deleted` });
}
