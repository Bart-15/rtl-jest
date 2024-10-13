import TodoList from '@/components/TodoList';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Todo List Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should display TodoList component properly', () => {
    render(<TodoList todoList={[]} />);

    const title = screen.getByRole('heading', {
      name: /todo list/i,
    });

    const input = screen.getByPlaceholderText(/add new todo/i);

    const addBtn = screen.getByRole('button', {
      name: /add todo/i,
    });

    const noTodos = screen.getByText('No todos');

    expect(title).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(noTodos).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test(`should display 'cooking' after I input and click the button`, () => {
    render(<TodoList todoList={[]} />);

    const input = screen.getByPlaceholderText(/add new todo/i);
    const addBtn = screen.getByRole('button', {
      name: /add todo/i,
    });

    fireEvent.change(input, { target: { value: 'cooking' } });
    expect(input).toHaveValue('cooking');

    fireEvent.click(addBtn);

    const newItem = screen.queryByText('cooking');
    expect(newItem).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test(`should removed 'cooking' after click the delete button`, () => {
    render(
      <TodoList
        todoList={[
          { id: 1, completed: false, text: 'cooking' },
          { id: 2, completed: false, text: 'driving' },
        ]}
      />,
    );

    const deletBtn = screen.getByTestId('delete-button-1');

    expect(deletBtn).toBeInTheDocument();

    fireEvent.click(deletBtn);

    const cookingText = screen.queryByText('cooking');

    expect(cookingText).not.toBeInTheDocument();
    expect(screen.getByText('driving')).toBeInTheDocument();
  });

  test('should to have class line-through if the user click the todo and mark as completed', () => {
    render(
      <TodoList
        todoList={[
          { id: 1, completed: false, text: 'cooking' },
          { id: 2, completed: false, text: 'driving' },
        ]}
      />,
    );

    const toggleBtn = screen.getByTestId('toggle-complete-1');

    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);

    expect(toggleBtn).toHaveClass('line-through');
    expect(screen.queryByTestId('toggle-complete-2')).not.toHaveClass(
      'line-through ',
    );
  });
});
