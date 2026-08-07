import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { PeopleId, PeopleItem } from '../../schemas/people.schema';
import { MemberRole } from '../../schemas/roles.schema';
import { CurrentTeamMemberCardComponent } from './current-team-member-card.component';

describe('CurrentTeamMemberCardComponent', () => {
  const currentRole: MemberRole = {
    type: 'member',
    title: 'Research Assistant',
    dateStart: new Date(2024, 0, 1),
    dateEnd: null,
    email: 'member@example.org',
    background: 'Research biography',
  };

  const currentMember: PeopleItem = {
    slug: 'current-member' as PeopleId,
    name: 'Current Member',
    lastName: 'Member',
    image: '/assets/people/current-member.png',
    roles: [currentRole],
  };

  it('should link to a profile containing additional details', async () => {
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

  it('should not link to a profile containing only an email address', async () => {
    const emailOnlyMember: PeopleItem = {
      ...currentMember,
      roles: [
        {
          ...currentRole,
          background: '',
        },
      ],
    };

    await render(CurrentTeamMemberCardComponent, {
      imports: [MatIconTestingModule],
      providers: [provideMarkdown()],
      componentInputs: { person: emailOnlyMember, occupation: 'Research Assistant' },
    });

    expect(screen.queryByRole('link', { name: /learn more/i })).not.toBeInTheDocument();
  });
});
