import { render } from '@testing-library/react';
import AboutTab from '../AboutTab';

describe('AboutTab', () => {
  it('renders without crashing', () => {
    const { container } = render(<AboutTab />);
    expect(container).toBeInTheDocument();
  });

  it('contains the welcome message', () => {
    const { getByText } = render(<AboutTab />);
    expect(getByText('Welcome to my profile!')).toBeInTheDocument();
  });
});
