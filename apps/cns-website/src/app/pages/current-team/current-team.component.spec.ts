import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { CurrentTeamComponent } from './current-team.component';
import { PeopleProfileData } from '../../schemas/people-profile/people-profile.schema';

describe('CurrentTeamComponent', () => {
  const providers = [provideMarkdown()];

  const mockData: PeopleProfileData[] = [
    {
      name: 'Katy Börner',
      lastName: 'Börner',
      image: '/assets/people/katy-borner.png',
      slug: 'katy-borner',
      roles: [
        { type: 'member', title: 'Faculty, Center Director', dateStart: '2005-01-01', dateEnd: null, displayOrder: 1 },
      ],
    },
    {
      name: 'John Smith',
      lastName: 'Smith',
      image: '/assets/people/john-smith.png',
      slug: 'john-smith',
      roles: [
        { type: 'member', title: 'Postdoctoral Fellow', dateStart: '2020-01-01', dateEnd: null, displayOrder: 2 },
      ],
    },
    {
      name: 'Jane Doe',
      lastName: 'Doe',
      image: '',
      slug: 'jane-doe',
      roles: [
        {
          type: 'student',
          topic: 'Data Visualization',
          degree: 'PhD',
          department: 'Informatics',
          dateStart: '2021-08-01',
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Bob Johnson',
      lastName: 'Johnson',
      image: '/assets/people/bob-johnson.png',
      slug: 'bob-johnson',
      roles: [{ type: 'collaborator', project: 'HuBMAP', dateStart: '2019-01-01', dateEnd: null }],
    },
    {
      name: 'Former Member',
      lastName: 'Member',
      image: '/assets/people/former-member.png',
      slug: 'former-member',
      roles: [
        {
          type: 'member',
          title: 'Research Assistant',
          dateStart: '2010-01-01',
          dateEnd: '2015-12-31',
          displayOrder: 3,
        },
      ],
    },
  ];

  it('should create', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show current members by default', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const members = fixture.componentInstance.filteredMembers();
    expect(members).toHaveLength(4);
    expect(members.every((m) => m.roles[0]?.dateEnd === null)).toBe(true);
  });

  it('should show former members when selected', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const formerTeamButton = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerTeamButton);

    const members = fixture.componentInstance.filteredMembers();
    expect(members).toHaveLength(1);
    expect(members[0].name).toBe('Former Member');
  });

  it('should filter by search text', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, 'Katy');

    const members = fixture.componentInstance.filteredMembers();
    expect(members).toHaveLength(1);
    expect(members[0].name).toBe('Katy Börner');
  });

  it('should show no results when search has no matches', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, 'XYZ123');

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });

  it('should sort by last name ascending', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /last name \(ascending a-z\)/i });
    await user.click(option);

    const members = fixture.componentInstance.filteredMembers();
    expect(members[0].lastName).toBe('Börner');
    expect(members[1].lastName).toBe('Doe');
    expect(members[2].lastName).toBe('Johnson');
    expect(members[3].lastName).toBe('Smith');
  });

  it('should sort by last name descending', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /last name \(descending z-a\)/i });
    await user.click(option);

    const members = fixture.componentInstance.filteredMembers();
    expect(members[0].lastName).toBe('Smith');
  });

  it('should sort by start year newest first', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /start year \(newest to oldest\)/i });
    await user.click(option);

    const members = fixture.componentInstance.filteredMembers();
    expect(members[0].name).toBe('Jane Doe');
  });

  it('should sort by start year oldest first', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /start year \(oldest to newest\)/i });
    await user.click(option);

    const members = fixture.componentInstance.filteredMembers();
    expect(members[0].name).toBe('Katy Börner');
  });

  it('should filter by role', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    fixture.componentInstance.filters.update((filters) =>
      filters.map((f) => (f.id === 'roles' ? { ...f, selected: [{ id: 'phd', label: 'PhD' }] } : f)),
    );
    const members = fixture.componentInstance.filteredMembers();

    expect(members).toHaveLength(1);
    expect(members[0].name).toBe('Jane Doe');
  });

  it('should filter by start year 2020+', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    fixture.componentInstance.filters.update((filters) =>
      filters.map((f) => (f.id === 'startYear' ? { ...f, selected: [{ id: '2020', label: '2020+' }] } : f)),
    );
    const members = fixture.componentInstance.filteredMembers();

    expect(members.length).toBeGreaterThan(0);
    expect(members.every((m) => new Date(m.roles[0].dateStart).getFullYear() >= 2020)).toBe(true);
  });

  it('should filter by start year 2015-2019', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    fixture.componentInstance.filters.update((filters) =>
      filters.map((f) => (f.id === 'startYear' ? { ...f, selected: [{ id: '2015', label: '2015-2019' }] } : f)),
    );
    const members = fixture.componentInstance.filteredMembers();

    expect(members.some((m) => m.name === 'Bob Johnson')).toBe(true);
  });

  it('should handle member with no roles', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });
    const component = fixture.componentInstance;

    const memberWithoutRoles: PeopleProfileData = {
      name: 'Test',
      lastName: 'User',
      image: '',
      slug: 'test-user',
      roles: [],
    };

    expect(component.getMemberTitle(memberWithoutRoles)).toBe('');
  });

  it('should get profile picture with fallback', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });
    const component = fixture.componentInstance;

    expect(component.getProfilePicture(mockData[0])).toBe('/assets/people/katy-borner.png');
    expect(component.getProfilePicture(mockData[2])).toBe('/assets/placeholder.png');
  });

  it('should get profile link', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    expect(fixture.componentInstance.getProfileLink(mockData[0])).toBe('/people/katy-borner');
  });

  it('should get member title', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });
    const component = fixture.componentInstance;

    expect(component.getMemberTitle(mockData[0])).toBe('Faculty, Center Director');
    expect(component.getMemberTitle(mockData[2])).toBe('PhD Student - Data Visualization');
    expect(component.getMemberTitle(mockData[3])).toBe('Collaborator - HuBMAP');
  });

  it('should clear filters when clear button is clicked', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, 'NonExistentPerson');

    const clearButton = await screen.findByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
  });
});
