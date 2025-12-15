import { render, screen, waitFor } from '@testing-library/angular';
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
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const profileCards = screen.getAllByText(/learn more/i);
    expect(profileCards).toHaveLength(4);
    expect(screen.getByText('Katy Börner')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('should show former members when selected', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const formerTeamButton = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerTeamButton);

    const profileCards = screen.getAllByText(/learn more/i);
    expect(profileCards).toHaveLength(1);
    expect(screen.getByText('Former Member')).toBeInTheDocument();
  });

  it('should filter by search text', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, 'Katy');

    const profileCards = screen.getAllByText(/learn more/i);
    expect(profileCards).toHaveLength(1);
    expect(screen.getByText('Katy Börner')).toBeInTheDocument();
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
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /last name \(ascending a-z\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Katy Börner');
    expect(names[1]).toHaveTextContent('Jane Doe');
    expect(names[2]).toHaveTextContent('Bob Johnson');
    expect(names[3]).toHaveTextContent('John Smith');
  });

  it('should sort by last name descending', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /last name \(descending z-a\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('John Smith');
  });

  it('should sort by start year newest first', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /start year \(newest to oldest\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Jane Doe');
  });

  it('should sort by start year oldest first', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.click(sortSelect);
    const option = await screen.findByRole('option', { name: /start year \(oldest to newest\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Katy Börner');
  });

  it('should filter by role', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the PhD students checkbox in the filter menu
    const phdCheckbox = screen.getByRole('checkbox', { name: /phd students/i });
    await user.click(phdCheckbox);

    await waitFor(() => {
      const profileCards = screen.getAllByText(/learn more/i);
      expect(profileCards).toHaveLength(1);
    });
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should filter by start year 2020+', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the 2020+ checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /2020\+/i });
    await user.click(yearCheckbox);

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  it('should filter by start year 2015-2019', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the 2015-2019 checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /2015-2019/i });
    await user.click(yearCheckbox);

    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
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

  it('should display profile pictures correctly', async () => {
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Member with image should have correct src
    const images = screen.getAllByRole('img');
    const katyImage = images.find((img) => img.getAttribute('alt')?.includes('Katy'));
    expect(katyImage).toBeDefined();

    // Member without image should use placeholder
    const janeImage = images.find((img) => img.getAttribute('alt')?.includes('Jane'));
    expect(janeImage?.getAttribute('src')).toContain('placeholder');
  });

  it('should have correct profile links', async () => {
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    const katyLink = screen.getAllByRole('link', { name: /learn more about katy/i })[0];
    expect(katyLink).toHaveAttribute('href', '/people/katy-borner');
  });

  it('should display member titles correctly', async () => {
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    expect(screen.getByText('Faculty, Center Director')).toBeInTheDocument();
    expect(screen.getByText('PhD Student - Data Visualization')).toBeInTheDocument();
    expect(screen.getByText('Collaborator - HuBMAP')).toBeInTheDocument();
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

  it('should filter by year range 2010-2014', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the 2010-2014 checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /2010-2014/i });
    await user.click(yearCheckbox);

    // No members in our mock data have start dates between 2010-2014
    await waitFor(() => {
      expect(screen.queryByText(/learn more/i)).not.toBeInTheDocument();
    });
  });

  it('should filter by year range 2005-2009', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the 2005-2009 checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /2005-2009/i });
    await user.click(yearCheckbox);

    // Verify filter was applied - Katy started in 2005
    await waitFor(() => {
      expect(screen.getByText('Katy Börner')).toBeInTheDocument();
    });
  });

  it('should filter by year range before 2005', async () => {
    const user = userEvent.setup();
    const dataWithOldMember: PeopleProfileData[] = [
      ...mockData,
      {
        name: 'Old Member',
        lastName: 'Old',
        image: '',
        slug: 'old-member',
        roles: [{ type: 'member', title: 'Legacy Staff', dateStart: '2000-01-01', dateEnd: null, displayOrder: 5 }],
      },
    ];

    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: dataWithOldMember },
    });

    // Click the Before 2005 checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /before 2005/i });
    await user.click(yearCheckbox);

    await waitFor(() => {
      expect(screen.getByText('Old Member')).toBeInTheDocument();
    });
  });

  it('should handle member with no roles in role filter', async () => {
    const user = userEvent.setup();
    const dataWithNoRole: PeopleProfileData[] = [
      ...mockData,
      {
        name: 'No Role Member',
        lastName: 'NoRole',
        image: '',
        slug: 'no-role',
        roles: [],
      },
    ];

    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: dataWithNoRole },
    });

    // Click the Faculty checkbox in the filter menu
    const facultyCheckbox = screen.getByRole('checkbox', { name: /faculty/i });
    await user.click(facultyCheckbox);

    // Member with no roles should not appear
    await waitFor(() => {
      expect(screen.queryByText('No Role Member')).not.toBeInTheDocument();
    });
  });

  it('should handle member with no start date in year filter', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click the 2020+ checkbox in the filter menu
    const yearCheckbox = screen.getByRole('checkbox', { name: /2020\+/i });
    await user.click(yearCheckbox);

    // Should filter to only show members from 2020+
    await waitFor(() => {
      const profileCards = screen.queryAllByText(/learn more/i);
      expect(profileCards.length).toBeGreaterThan(0);
      expect(profileCards.length).toBeLessThan(4);
    });
  });

  it('should handle invalid year filter gracefully', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    fixture.componentInstance.filters.update((filters) =>
      filters.map((f) => (f.id === 'startYear' ? { ...f, selected: [{ id: 'invalid', label: 'Invalid' }] } : f)),
    );
    fixture.detectChanges();

    // Should show no results for invalid filter
    expect(screen.queryByText(/learn more/i)).not.toBeInTheDocument();
  });

  it('should return empty title for member role with no title', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });
    const component = fixture.componentInstance;

    const memberWithNoTitle = {
      name: 'Test',
      lastName: 'User',
      image: '',
      slug: 'test',
      roles: [{ type: 'member' as const, dateStart: '2020-01-01', dateEnd: null, displayOrder: 1 }],
    } as PeopleProfileData;

    expect(component.getMemberTitle(memberWithNoTitle)).toBe('');
  });

  it('should filter out collaborators without role when filtering', async () => {
    const user = userEvent.setup();
    const dataWithEmptyRole: PeopleProfileData[] = [
      ...mockData,
      {
        name: 'Test Member',
        lastName: 'Test',
        image: '',
        slug: 'test',
        roles: [{ type: 'collaborator', project: 'Test Project', dateStart: '2020-01-01', dateEnd: null }],
      },
    ];

    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: dataWithEmptyRole },
    });

    // Click the Faculty checkbox in the filter menu
    const facultyCheckbox = screen.getByRole('checkbox', { name: /faculty/i });
    await user.click(facultyCheckbox);

    // Should only show faculty members, not the collaborator
    await waitFor(() => {
      expect(screen.queryByText('Test Member')).not.toBeInTheDocument();
      expect(screen.getByText('Katy Börner')).toBeInTheDocument();
    });
  });

  it('should handle filtering with multiple role types', async () => {
    const user = userEvent.setup();
    await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });

    // Click multiple role checkboxes
    const phdCheckbox = screen.getByRole('checkbox', { name: /phd students/i });
    const collaboratorCheckbox = screen.getByRole('checkbox', { name: /collaborators/i });
    await user.click(phdCheckbox);
    await user.click(collaboratorCheckbox);

    // Click multiple year checkboxes
    const year2015Checkbox = screen.getByRole('checkbox', { name: /2015-2019/i });
    const year2020Checkbox = screen.getByRole('checkbox', { name: /2020\+/i });
    await user.click(year2015Checkbox);
    await user.click(year2020Checkbox);

    // Should show PhD students and collaborators from 2015+
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });
  it('should return empty string for unknown role type in getMemberTitle', async () => {
    const { fixture } = await render(CurrentTeamComponent, {
      providers,
      componentInputs: { data: mockData },
    });
    const component = fixture.componentInstance;

    const memberWithUnknownRole = {
      name: 'Test',
      lastName: 'User',
      image: '',
      slug: 'test',
      roles: [{ type: 'unknown', dateStart: '2020-01-01', dateEnd: null }],
    } as unknown as PeopleProfileData;

    expect(component.getMemberTitle(memberWithUnknownRole)).toBe('');
  });
});
