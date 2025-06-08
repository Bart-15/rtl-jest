import { render } from '@testing-library/react';
import ContactTab from '../ContactTab';

describe('ContactTab', () => {
  it('renders without crashing', () => {
    const { container } = render(<ContactTab />);
    expect(container).toBeInTheDocument();
  });

  it('contains the welcome message', () => {
    const { getByText } = render(<ContactTab />);
    expect(getByText('You can find me online here:')).toBeInTheDocument();
  });
});
