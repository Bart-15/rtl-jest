import ProfileCard from '@/components/ProfileCard';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Profile Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render name, job title, and follow button correctly', () => {
    render(<ProfileCard name="Bart" jobTitle="ReactJs Developer" />);

    const title = screen.getByRole('heading', {
      name: /bart/i,
    });

    const button = screen.getByRole('button', {
      name: /follow/i,
    });

    const jobTitle = screen.getByText('ReactJs Developer');

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(jobTitle).toBeInTheDocument();
  });

  test(`should show "Unfollow" button if the user is initially following`, () => {
    render(
      <ProfileCard
        name="Bart"
        jobTitle="ReactJs Developer"
        initialIsFollowing={true}
      />,
    );
    const unfollowBtn = screen.getByRole('button', {
      name: /unfollow/i,
    });

    const followBtn = screen.queryByText('Follow');

    expect(unfollowBtn).toBeInTheDocument();
    expect(followBtn).not.toBeInTheDocument();
  });

  test(`should toggle between "Follow" and "Unfollow" on button click`, () => {
    render(<ProfileCard name="Bart" jobTitle="ReactJs Developer" />);

    const button = screen.getByRole('button', {
      name: /follow/i,
    });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(button).toHaveTextContent(/unfollow/i);

    fireEvent.click(button);
    expect(button).toHaveTextContent(/follow/i);
  });
});
