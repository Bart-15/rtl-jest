import { render } from '@testing-library/react';
import PostsTab from '../PostsTab';

jest.mock('../PostsTab', () => {
  const originalModule = jest.requireActual('../PostsTab');

  return {
    __esModule: true,
    default: originalModule.default,
    SlowPost: ({ index }: { index: number }) => (
      <li className="item">Post #{index + 1}</li>
    ),
  };
});

describe('PostsTab', () => {
  it('renders without crashing', () => {
    const { container } = render(<PostsTab />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct number of posts', () => {
    const { container } = render(<PostsTab />);
    const items = container.querySelectorAll('.item');
    expect(items.length).toBe(2500);
  });
});
