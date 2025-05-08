'use client';
import NewsletterSignup from '@/components/counter/news-letter-signup';
import TodoList from '@/components/todo/Todo';

export default function Home() {
  return (
    <main className="flex p-24">
      {/* <TodoList /> */}
      <NewsletterSignup />
    </main>
  );
}
