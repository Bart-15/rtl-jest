import TodoList from '@/components/todo/Todo';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { ReactQueryProvider } from '../__mocks__/config/querClient';

describe('Todo List Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display todo list component properly', async () => {
    render(
      <ReactQueryProvider>
        <TodoList />
      </ReactQueryProvider>,
    );

    //Loading text should displayed
    expect(screen.getByText('Loading ...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });
  });
});
