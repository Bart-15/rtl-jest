'use client';
import TodoList from '@/components/todo/Todo';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  import('../../__tests__/__mocks__/msw').then(({ setupMocks }) => {
    setupMocks();
  });
}

export default function Home() {
  return (
    <main className="flex p-24">
      <TodoList />
    </main>
  );
}
