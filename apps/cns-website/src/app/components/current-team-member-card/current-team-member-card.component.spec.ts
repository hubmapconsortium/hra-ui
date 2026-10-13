import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { PeopleId, PeopleItem } from '../../schemas/people.schema';
import { CurrentTeamMemberCardComponent } from './current-team-member-card.component';

describe('CurrentTeamMemberCardComponent', () => {
  const currentMember: PeopleItem = {
    slug: 'current-member' as PeopleId,
    name: 'Current Member',
    lastName: 'Member',
    image: '/assets/people/current-member.png',
    roles: [{ type: 'member', title: 'Research Assistant', dateStart: new Date(2024, 0, 1), dateEnd: null }],
  };

  it('should display the member and link to their profile', async () => {
    await render(CurrentTeamMemberCardComponent, {
      imports: [MatIconTestingModule],
      providers: [provideMarkdown()],
      componentInputs: { person: currentMember, occupation: 'Research Assistant' },
    });

    expect(screen.getByText('Current Member')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more about Current Member' })).toHaveAttribute(
      'href',
      '/people/current-member',
    );
  });
});
