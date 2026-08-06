import { render, screen } from '@testing-library/angular';
import { FormerTeamMemberCardComponent } from './former-team-member-card.component';

describe('FormerTeamMemberCardComponent', () => {
  it('should display the member profile and full tenure', async () => {
    await render(FormerTeamMemberCardComponent, {
      componentInputs: {
        pictureUrl: '/assets/people/former-member.png',
        name: 'Former Member',
        occupation: 'Research Assistant',
        dateRanges: ['Apr 2025–Jan 2026', 'Jan 2023–Apr 2024'],
      },
    });

    expect(screen.getByRole('img', { name: 'Profile picture of Former Member' })).toHaveAttribute(
      'src',
      '/assets/people/former-member.png',
    );
    expect(screen.getByText('Former Member')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    const dateRanges = screen.getAllByText(/202[3-6]/);
    expect(dateRanges[0]).toHaveTextContent('Apr 2025–Jan 2026');
    expect(dateRanges[1]).toHaveTextContent('Jan 2023–Apr 2024');
  });
});
