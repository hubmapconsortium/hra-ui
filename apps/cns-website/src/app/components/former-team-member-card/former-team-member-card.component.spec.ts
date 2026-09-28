import { render, screen, within } from '@testing-library/angular';
import { PeopleId, PeopleItem } from '../../schemas/people.schema';
import { FormerTeamMemberCardComponent } from './former-team-member-card.component';

describe('FormerTeamMemberCardComponent', () => {
  const formerMember: PeopleItem = {
    slug: 'former-member' as PeopleId,
    name: 'Former Member',
    lastName: 'Member',
    image: '/assets/people/former-member.png',
    roles: [
      {
        type: 'member',
        title: 'Research Assistant',
        dateStart: new Date(2023, 0, 1),
        dateEnd: new Date(2024, 3, 30),
      },
      {
        type: 'member',
        title: 'Research Assistant',
        dateStart: new Date(2025, 3, 1),
        dateEnd: new Date(2026, 0, 31),
      },
    ],
  };

  it('should display the member profile and full tenure', async () => {
    await render(FormerTeamMemberCardComponent, {
      componentInputs: {
        person: formerMember,
        occupation: 'Research Assistant',
      },
    });

    expect(screen.getByRole('img', { name: 'Profile picture of Former Member' })).toHaveAttribute(
      'src',
      '/assets/people/former-member.png',
    );
    expect(screen.getByText('Former Member')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    const tenureList = screen.getByRole('list', { name: 'CNS tenure' });
    const dateRanges = within(tenureList).getAllByRole('listitem');
    expect(dateRanges).toHaveLength(2);
    expect(dateRanges[0]).toHaveTextContent('Apr 2025–Jan 2026');
    expect(dateRanges[1]).toHaveTextContent('Jan 2023–Apr 2024');
  });

  it('should combine role transitions in the same or following month', async () => {
    const person: PeopleItem = {
      ...formerMember,
      roles: [
        {
          type: 'member',
          title: 'Intern',
          dateStart: new Date(2020, 0, 1),
          dateEnd: new Date(2023, 8, 26),
        },
        {
          type: 'member',
          title: 'Developer',
          dateStart: new Date(2023, 9, 10),
          dateEnd: new Date(2024, 11, 31),
        },
      ],
    };

    await render(FormerTeamMemberCardComponent, {
      componentInputs: { person, occupation: 'Developer' },
    });

    const dateRanges = within(screen.getByRole('list', { name: 'CNS tenure' })).getAllByRole('listitem');
    expect(dateRanges).toHaveLength(1);
    expect(dateRanges[0]).toHaveTextContent('Jan 2020–Dec 2024');
  });

  it('should display a former role when its end date is unavailable', async () => {
    const person: PeopleItem = {
      ...formerMember,
      roles: [
        {
          type: 'member',
          title: 'Intern',
          dateStart: new Date(2022, 0, 1),
          dateEnd: new Date(2022, 11, 31),
        },
        {
          type: 'member',
          title: 'Developer',
          dateStart: new Date(2023, 0, 1),
          dateEnd: undefined,
        },
      ],
    };

    await render(FormerTeamMemberCardComponent, {
      componentInputs: { person, occupation: 'Developer' },
    });

    const dateRanges = within(screen.getByRole('list', { name: 'CNS tenure' })).getAllByRole('listitem');
    expect(dateRanges).toHaveLength(1);
    expect(dateRanges[0]).toHaveTextContent('Jan 2022–Unknown');
  });
});
