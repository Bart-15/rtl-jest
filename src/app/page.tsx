import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="flex p-24">
      <TodoList todoList={[]} />
    </main>
  );
}
