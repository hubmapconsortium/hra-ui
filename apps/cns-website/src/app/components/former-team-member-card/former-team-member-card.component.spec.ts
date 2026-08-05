import { render, screen } from '@testing-library/angular';
import { FormerTeamMemberCardComponent } from './former-team-member-card.component';

describe('FormerTeamMemberCardComponent', () => {
  it('should display the member profile and full tenure', async () => {
    await render(FormerTeamMemberCardComponent, {
      componentInputs: {
        pictureUrl: '/assets/people/former-member.png',
        name: 'Former Member',
        occupation: 'Research Assistant',
        dateRange: 'Jan 2010–Dec 2015',
      },
    });

    expect(screen.getByRole('img', { name: 'Profile picture of Former Member' })).toHaveAttribute(
      'src',
      '/assets/people/former-member.png',
    );
    expect(screen.getByText('Former Member')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    expect(screen.getByText('Jan 2010–Dec 2015')).toBeInTheDocument();
  });
});
