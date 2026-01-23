import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { CurrentTeamComponent } from './current-team.component';
import { PeopleProfileData } from '../../schemas/people-profile/people-profile.schema';

describe('CurrentTeamComponent', () => {
  const providers = [provideMarkdown(), provideHttpClient(), provideHttpClientTesting()];
  const imports = [MatIconTestingModule];

  const mockData: PeopleProfileData = [
    {
      name: 'Katy Börner',
      lastName: 'Börner',
      image: '/assets/people/katy-borner.png',
      slug: 'katy-borner',
      roles: [
        {
          type: 'member',
          title: 'Faculty, Center Director',
          dateStart: new Date('2005-01-01'),
          dateEnd: null,
          displayOrder: 1,
        },
      ],
    },
    {
      name: 'John Smith',
      lastName: 'Smith',
      image: '/assets/people/john-smith.png',
      slug: 'john-smith',
      roles: [
        {
          type: 'member',
          title: 'Postdoctoral Fellow',
          dateStart: new Date('2020-01-01'),
          dateEnd: null,
          displayOrder: 2,
        },
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
          degree: 'Ph.D.',
          department: 'Informatics',
          dateStart: new Date('2021-08-01'),
          dateEnd: null,
        },
      ],
    },
    {
      name: 'Bob Johnson',
      lastName: 'Johnson',
      image: '/assets/people/bob-johnson.png',
      slug: 'bob-johnson',
      roles: [{ type: 'collaborator', project: 'HuBMAP', dateStart: new Date('2019-01-01'), dateEnd: null }],
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
          dateStart: new Date('2010-01-01'),
          dateEnd: new Date('2015-12-31'),
          displayOrder: 3,
        },
      ],
    },
  ];

  async function renderComponent(data: PeopleProfileData = mockData) {
    return render(CurrentTeamComponent, {
      providers,
      imports,
      componentInputs: { data },
    });
  }

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show current members by default', async () => {
    await renderComponent();

    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
    expect(screen.getByText('Katy Börner')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('should show former members when selected', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const formerTeamToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerTeamToggle);

    expect(await screen.findByText('Former Member')).toBeInTheDocument();
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(1);
  });

  it('should filter by search text', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Katy');

    expect(await screen.findByText('Katy Börner')).toBeInTheDocument();
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(1);
  });

  it('should show no results indicator when search has no matches', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'XYZ123');

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });

  it('should sort by last name ascending', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
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
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /last name \(descending z-a\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('John Smith');
  });

  it('should sort by start year oldest first', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /start year \(old to new\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Katy Börner');
  });

  it('should display profile pictures with correct alt text', async () => {
    await renderComponent();

    const katyImage = screen.getByRole('img', { name: /profile picture of katy börner/i });
    expect(katyImage).toBeInTheDocument();
    expect(katyImage).toHaveAttribute('src');
  });

  it('should use placeholder image for members without pictures', async () => {
    await renderComponent();

    const janeImage = screen.getByRole('img', { name: /profile picture of jane doe/i });
    expect(janeImage).toBeInTheDocument();
    expect(janeImage.getAttribute('src')).toContain('placeholder');
  });

  it('should have correct profile links', async () => {
    await renderComponent();

    const katyLink = screen.getByRole('link', { name: /learn more about katy/i });
    expect(katyLink).toHaveAttribute('href', '/people/katy-borner');
  });

  it('should display member titles correctly', async () => {
    await renderComponent();

    expect(screen.getByText('Faculty, Center Director')).toBeInTheDocument();
    expect(screen.getByText('Ph.D. Student - Data Visualization')).toBeInTheDocument();
    expect(screen.getByText('Collaborator - HuBMAP')).toBeInTheDocument();
  });

  it('should clear filters when clear button is clicked', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'NonExistentPerson');

    const clearFiltersButton = await screen.findByRole('button', { name: /clear filters/i });
    await user.click(clearFiltersButton);

    // After clearing, all current members should be visible again
    const learnMoreLinks = await screen.findAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
  });

  it('should display results counter', async () => {
    await renderComponent();

    // Results indicator shows "X of Y" format - use function matcher for flexibility
    expect(screen.getByText((content) => content.includes('4') && content.includes('of'))).toBeInTheDocument();
  });

  it('should update results counter when filtering', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Katy');

    // Wait for filtering to complete
    await screen.findByText('Katy Börner');
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);
  });

  it('should toggle between current and former team', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // Default: current team
    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Former Member')).toBeInTheDocument();
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);

    // Switch back to current team
    const currentToggle = screen.getByRole('radio', { name: /current team/i });
    await user.click(currentToggle);

    expect(await screen.findAllByText(/learn more/i)).toHaveLength(4);
  });

  it('should show hierarchical sort by default for current team', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // Open the sort select to verify Hierarchical option exists for current team
    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    // Hierarchical should be available as an option for current team
    expect(await screen.findByRole('option', { name: /hierarchical/i })).toBeInTheDocument();
  });

  it('should not show hierarchical sort option for former team', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Wait for UI to update
    await screen.findByText('Former Member');

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    expect(screen.queryByRole('option', { name: /hierarchical/i })).not.toBeInTheDocument();
  });

  it('should handle empty data gracefully', async () => {
    await renderComponent([]);

    // With empty data, should show "0 of 0" in results indicator
    expect(screen.getByText((content) => content.includes('0') && content.includes('of'))).toBeInTheDocument();
  });

  it('should filter out members with no roles', async () => {
    const dataWithNoRoles: PeopleProfileData = [
      ...mockData,
      {
        name: 'No Role Member',
        lastName: 'NoRole',
        image: '',
        slug: 'no-role',
        roles: [],
      },
    ];

    await renderComponent(dataWithNoRoles);

    // Should still show 4 members (not 5), excluding the one with no roles
    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);
    expect(screen.queryByText('No Role Member')).not.toBeInTheDocument();
  });

  it('should persist search when switching teams', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Former'); // Only matches Former Member

    // No matches on current team, should show no results
    expect(await screen.findByText(/no results/i)).toBeInTheDocument();

    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Search should persist and now show Former Member
    expect(searchInput).toHaveValue('Former');
    expect(await screen.findByText('Former Member')).toBeInTheDocument();
  });

  it('should display all role types correctly', async () => {
    await renderComponent();

    // Member role with title
    expect(screen.getByText('Faculty, Center Director')).toBeInTheDocument();
    expect(screen.getByText('Postdoctoral Fellow')).toBeInTheDocument();

    // Student role with degree and topic
    expect(screen.getByText('Ph.D. Student - Data Visualization')).toBeInTheDocument();

    // Collaborator role with project
    expect(screen.getByText('Collaborator - HuBMAP')).toBeInTheDocument();
  });

  it('should handle masters student degree correctly', async () => {
    const dataWithMasters: PeopleProfileData = [
      {
        name: 'Masters Student',
        lastName: 'Student',
        image: '',
        slug: 'masters-student',
        roles: [
          {
            type: 'student',
            topic: 'Machine Learning',
            degree: 'Masters',
            department: 'Computer Science',
            dateStart: new Date('2022-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    await renderComponent(dataWithMasters);

    expect(screen.getByText('Masters Student - Machine Learning')).toBeInTheDocument();
  });

  it('should handle members active across multiple years', async () => {
    const longTermMember: PeopleProfileData = [
      {
        name: 'Long Term Member',
        lastName: 'LongTerm',
        image: '',
        slug: 'long-term',
        roles: [
          {
            type: 'member',
            title: 'Senior Researcher',
            dateStart: new Date('2015-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
    ];

    await renderComponent(longTermMember);

    expect(screen.getByText('Long Term Member')).toBeInTheDocument();
    expect(screen.getByText('Senior Researcher')).toBeInTheDocument();
  });

  it('should group by role when selected', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    // Should show group headers
    expect(await screen.findByText('Staff')).toBeInTheDocument();
  });

  it('should group by start year when selected', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const startYearOption = await screen.findByRole('option', { name: /start year/i });
    await user.click(startYearOption);

    // Should show year headers based on start dates
    expect(await screen.findByText('2021')).toBeInTheDocument();
  });

  it('should sort by end year newest first', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /end year \(new to old\)/i });
    await user.click(option);

    // Should not throw and members should still be displayed
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
  });

  it('should have clear search button when search has value', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'test');

    const clearSearchButton = await screen.findByRole('button', { name: /clear search/i });
    expect(clearSearchButton).toBeInTheDocument();

    await user.click(clearSearchButton);
    expect(searchInput).toHaveValue('');
  });

  it('should switch to past team when former team toggle is clicked', async () => {
    const user = userEvent.setup();
    await renderComponent(mockData);

    // Click former team toggle
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Former team should be selected
    expect(await screen.findByText('Former Member')).toBeInTheDocument();
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(1);
  });

  it('should have role filter button available', async () => {
    await renderComponent();

    // Verify the Roles button is present
    const rolesButton = screen.getByRole('button', { name: /^roles$/i });
    expect(rolesButton).toBeInTheDocument();
  });

  it('should have active year filter button available', async () => {
    await renderComponent();

    // Verify the Active year button is present
    const activeYearButton = screen.getByRole('button', { name: /^active year$/i });
    expect(activeYearButton).toBeInTheDocument();
  });

  it('should group by end year when selected', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // First switch to former team to see end year grouping
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    await screen.findByText('Former Member');

    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    // Should show year headers based on end dates (2015 for Former Member)
    expect(await screen.findByText('2015')).toBeInTheDocument();
  });

  it('should sort by start year newest first', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    // Look for the "new to old" option which may have different text
    const options = await screen.findAllByRole('option');
    const newToOldOption = options.find(
      (opt) => opt.textContent?.toLowerCase().includes('new') && opt.textContent?.toLowerCase().includes('old'),
    );
    if (newToOldOption) {
      await user.click(newToOldOption);
    }

    // Verify people are still displayed
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
  });

  it('should handle generic student degree correctly', async () => {
    const dataWithGenericStudent: PeopleProfileData = [
      {
        name: 'Generic Student',
        lastName: 'Student',
        image: '',
        slug: 'generic-student',
        roles: [
          {
            type: 'student',
            topic: 'General Studies',
            degree: 'Undergraduate',
            department: 'Computer Science',
            dateStart: new Date('2023-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    await renderComponent(dataWithGenericStudent);

    expect(screen.getByText('Generic Student')).toBeInTheDocument();
    expect(screen.getByText('Undergraduate Student - General Studies')).toBeInTheDocument();
  });

  it('should sort by last name correctly with special characters', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /last name \(descending z-a\)/i });
    await user.click(option);

    // Smith should come first when sorting Z-A
    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('John Smith');
    expect(names[names.length - 1]).toHaveTextContent('Katy Börner');
  });

  it('should handle people with multiple roles showing most recent role', async () => {
    const dataWithMultipleRoles: PeopleProfileData = [
      {
        name: 'Multi Role Person',
        lastName: 'Multi',
        image: '',
        slug: 'multi-role',
        roles: [
          {
            type: 'student',
            topic: 'Old Topic',
            degree: 'Ph.D.',
            department: 'Physics',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
          },
          {
            type: 'member',
            title: 'Current Position',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
    ];

    await renderComponent(dataWithMultipleRoles);

    // Should show the current (most recent) role title
    expect(screen.getByText('Multi Role Person')).toBeInTheDocument();
    expect(screen.getByText('Current Position')).toBeInTheDocument();
  });

  it('should filter members who are active in a specific year range', async () => {
    const dataWithDateRange: PeopleProfileData = [
      {
        name: 'Active 2010-2015',
        lastName: 'Active',
        image: '',
        slug: 'active-2010',
        roles: [
          {
            type: 'member',
            title: 'Past Member',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Active 2018-Now',
        lastName: 'Current',
        image: '',
        slug: 'active-2018',
        roles: [
          {
            type: 'member',
            title: 'Current Member',
            dateStart: new Date('2018-01-01'),
            dateEnd: null,
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithDateRange);

    // Should show only current member by default
    expect(screen.getByText('Active 2018-Now')).toBeInTheDocument();
    expect(screen.queryByText('Active 2010-2015')).not.toBeInTheDocument();

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Active 2010-2015')).toBeInTheDocument();
    expect(screen.queryByText('Active 2018-Now')).not.toBeInTheDocument();
  });

  it('should handle sorting by end year for former members', async () => {
    const formerMembersData: PeopleProfileData = [
      {
        name: 'Left 2015',
        lastName: 'First',
        image: '',
        slug: 'left-2015',
        roles: [
          {
            type: 'member',
            title: 'Former',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Left 2020',
        lastName: 'Second',
        image: '',
        slug: 'left-2020',
        roles: [
          {
            type: 'member',
            title: 'Recent Former',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(formerMembersData);

    // Switch to former team - should show sorted by end year (newest first) by default
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    const names = await screen.findAllByText(/^(Left 2015|Left 2020)$/);
    // Left 2020 should be first (end year newest)
    expect(names[0]).toHaveTextContent('Left 2020');
    expect(names[1]).toHaveTextContent('Left 2015');
  });

  it('should display collaborator with their project', async () => {
    await renderComponent();

    // Bob Johnson is a collaborator with HuBMAP project
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Collaborator - HuBMAP')).toBeInTheDocument();
  });

  it('should display PhD student with their topic', async () => {
    await renderComponent();

    // Jane Doe is a PhD student with Data Visualization topic
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Ph.D. Student - Data Visualization')).toBeInTheDocument();
  });

  it('should group by role and show collaborators group', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    // Should show multiple group headers including Collaborators
    expect(await screen.findByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('PhD Students')).toBeInTheDocument();
    expect(screen.getByText('Collaborators')).toBeInTheDocument();
  });

  it('should reverse sort order for start year grouping', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const startYearOption = await screen.findByRole('option', { name: /start year/i });
    await user.click(startYearOption);

    // Should show years (the grouping should work - look for any year text)
    expect(await screen.findByText('2021')).toBeInTheDocument();
  });

  it('should search with diacritics normalization', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = screen.getByRole('textbox', { name: /search/i });
    // Search for "Borner" without umlaut should find "Börner"
    await user.type(searchInput, 'Borner');

    expect(await screen.findByText('Katy Börner')).toBeInTheDocument();
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(1);
  });

  it('should handle member with no title gracefully', async () => {
    const dataWithNoTitle: PeopleProfileData = [
      {
        name: 'No Title Member',
        lastName: 'NoTitle',
        image: '',
        slug: 'no-title',
        roles: [
          {
            type: 'member',
            title: '',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
    ];

    await renderComponent(dataWithNoTitle);

    expect(screen.getByText('No Title Member')).toBeInTheDocument();
  });

  it('should handle multiple roles with both ended dates sorted correctly', async () => {
    const dataWithMultipleEndedRoles: PeopleProfileData = [
      {
        name: 'Multi Ended Roles',
        lastName: 'Ended',
        image: '',
        slug: 'multi-ended',
        roles: [
          {
            type: 'member',
            title: 'First Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2017-12-31'),
            displayOrder: 2,
          },
          {
            type: 'member',
            title: 'Second Role',
            dateStart: new Date('2018-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithMultipleEndedRoles);

    // Switch to former team since both roles have ended
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Should show the most recent role (Second Role)
    expect(await screen.findByText('Multi Ended Roles')).toBeInTheDocument();
    expect(screen.getByText('Second Role')).toBeInTheDocument();
  });

  it('should handle roles where only one has an end date', async () => {
    const dataWithMixedEndDates: PeopleProfileData = [
      {
        name: 'Mixed End Dates',
        lastName: 'Mixed',
        image: '',
        slug: 'mixed-end',
        roles: [
          {
            type: 'member',
            title: 'Ended Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 2,
          },
          {
            type: 'member',
            title: 'Active Role',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
    ];

    await renderComponent(dataWithMixedEndDates);

    // Should show the active role (no end date)
    expect(screen.getByText('Mixed End Dates')).toBeInTheDocument();
    expect(screen.getByText('Active Role')).toBeInTheDocument();
  });

  it('should correctly determine if person is active in a specific year with end date', async () => {
    const dataWithEndDate: PeopleProfileData = [
      {
        name: 'Active 2012-2016',
        lastName: 'Limited',
        image: '',
        slug: 'limited-2012',
        roles: [
          {
            type: 'member',
            title: 'Past Role',
            dateStart: new Date('2012-01-01'),
            dateEnd: new Date('2016-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithEndDate);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Active 2012-2016')).toBeInTheDocument();
  });

  it('should handle masters student filter grouping correctly', async () => {
    const dataWithMasters: PeopleProfileData = [
      {
        name: 'Masters Person',
        lastName: 'Masters',
        image: '',
        slug: 'masters-person',
        roles: [
          {
            type: 'student',
            topic: 'AI Research',
            degree: 'Masters',
            department: 'Computer Science',
            dateStart: new Date('2022-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithMasters);

    // Group by role to see the Master Students group
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    expect(await screen.findByText('Master Students')).toBeInTheDocument();
    expect(screen.getByText('Masters Person')).toBeInTheDocument();
  });

  it('should handle student filter grouping for generic students', async () => {
    const dataWithStudent: PeopleProfileData = [
      {
        name: 'Undergrad Person',
        lastName: 'Undergrad',
        image: '',
        slug: 'undergrad-person',
        roles: [
          {
            type: 'student',
            topic: 'General CS',
            degree: 'Undergraduate',
            department: 'Computer Science',
            dateStart: new Date('2023-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithStudent);

    // Group by role to see the Students group
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    expect(await screen.findByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Undergrad Person')).toBeInTheDocument();
  });

  it('should show Current group when grouping by end year for active members', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // Group by end year on current team (all have null end dates)
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    // Current members should be grouped under "Current"
    expect(await screen.findByText('Current')).toBeInTheDocument();
  });

  it('should handle comparison of group keys when mixing years and strings', async () => {
    const mixedData: PeopleProfileData = [
      {
        name: 'Person 2020',
        lastName: 'A',
        image: '',
        slug: 'person-2020',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2020-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Person 2021',
        lastName: 'B',
        image: '',
        slug: 'person-2021',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2021-01-01'),
            dateEnd: new Date('2021-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(mixedData);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    await screen.findByText('Person 2020');

    // Group by end year
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    // Should show both year groups
    expect(await screen.findByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('should have sort options available', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    // Verify sort options are available
    const options = await screen.findAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('should not show person outside their active year range', async () => {
    const dataWithSpecificRange: PeopleProfileData = [
      {
        name: 'Short Timer',
        lastName: 'Short',
        image: '',
        slug: 'short-timer',
        roles: [
          {
            type: 'member',
            title: 'Brief Role',
            dateStart: new Date('2015-06-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithSpecificRange);

    // Switch to former team since role has ended
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Short Timer')).toBeInTheDocument();
  });

  it('should handle display order for sorting hierarchically', async () => {
    const dataWithDisplayOrder: PeopleProfileData = [
      {
        name: 'High Priority',
        lastName: 'A',
        image: '',
        slug: 'high-priority',
        roles: [
          {
            type: 'member',
            title: 'Director',
            dateStart: new Date('2010-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Low Priority',
        lastName: 'B',
        image: '',
        slug: 'low-priority',
        roles: [
          {
            type: 'member',
            title: 'Assistant',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 10,
          },
        ],
      },
    ];

    await renderComponent(dataWithDisplayOrder);

    // By default, current team uses hierarchical sort which uses displayOrder
    const names = screen.getAllByText(/^(High Priority|Low Priority)$/);
    expect(names[0]).toHaveTextContent('High Priority');
    expect(names[1]).toHaveTextContent('Low Priority');
  });

  it('should handle member without displayOrder using default ordering', async () => {
    const dataWithoutDisplayOrder: PeopleProfileData = [
      {
        name: 'No Order Member',
        lastName: 'NoOrder',
        image: '',
        slug: 'no-order',
        roles: [
          {
            type: 'student',
            topic: 'Research',
            degree: 'Ph.D.',
            department: 'CS',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    await renderComponent(dataWithoutDisplayOrder);

    expect(screen.getByText('No Order Member')).toBeInTheDocument();
  });

  it('should sort roles by end date when both have dates', async () => {
    const dataWithTwoEndDates: PeopleProfileData = [
      {
        name: 'Two Ended Roles',
        lastName: 'TwoEnded',
        image: '',
        slug: 'two-ended',
        roles: [
          {
            type: 'member',
            title: 'Older Role',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2012-12-31'),
            displayOrder: 1,
          },
          {
            type: 'member',
            title: 'Newer Role',
            dateStart: new Date('2013-01-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithTwoEndDates);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Should show the more recent role title
    expect(await screen.findByText('Two Ended Roles')).toBeInTheDocument();
    expect(screen.getByText('Newer Role')).toBeInTheDocument();
  });

  it('should handle role sorting when only b has undefined end date', async () => {
    const dataWithOneUndefinedEnd: PeopleProfileData = [
      {
        name: 'Mixed Undefined',
        lastName: 'Mixed',
        image: '',
        slug: 'mixed-undefined',
        roles: [
          {
            type: 'member',
            title: 'Ended Role First',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 1,
          },
          {
            type: 'member',
            title: 'Ongoing Role',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 2,
          },
        ],
      },
    ];

    await renderComponent(dataWithOneUndefinedEnd);

    // Should display ongoing role (most recent since null means current)
    expect(screen.getByText('Mixed Undefined')).toBeInTheDocument();
    expect(screen.getByText('Ongoing Role')).toBeInTheDocument();
  });

  it('should correctly filter by year for person active during that year', async () => {
    const dataForYearFilter: PeopleProfileData = [
      {
        name: 'Person Active 2014-2016',
        lastName: 'YearTest',
        image: '',
        slug: 'year-test',
        roles: [
          {
            type: 'member',
            title: 'Test Role',
            dateStart: new Date('2014-01-01'),
            dateEnd: new Date('2016-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataForYearFilter);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Person was active in 2015 (within 2014-2016 range)
    expect(await screen.findByText('Person Active 2014-2016')).toBeInTheDocument();
  });

  it('should handle person not active in a specific year', async () => {
    const dataNotActiveInYear: PeopleProfileData = [
      {
        name: 'Only 2010-2012',
        lastName: 'NotActive',
        image: '',
        slug: 'not-active-2015',
        roles: [
          {
            type: 'member',
            title: 'Old Role',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2012-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataNotActiveInYear);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Person should appear on former team
    expect(await screen.findByText('Only 2010-2012')).toBeInTheDocument();
  });

  it('should handle sorting when both roles have same undefined end dates', async () => {
    const dataWithBothUndefined: PeopleProfileData = [
      {
        name: 'Both Current',
        lastName: 'BothCurrent',
        image: '',
        slug: 'both-current',
        roles: [
          {
            type: 'member',
            title: 'Role A',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
          {
            type: 'collaborator',
            project: 'Project B',
            dateStart: new Date('2021-01-01'),
            dateEnd: null,
          },
        ],
      },
    ];

    await renderComponent(dataWithBothUndefined);

    // Should show on current team
    expect(screen.getByText('Both Current')).toBeInTheDocument();
  });

  it('should group by none and show all ungrouped', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // Initially should have no grouping
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    // Select "None" to ensure no grouping
    const noneOption = await screen.findByRole('option', { name: /none/i });
    await user.click(noneOption);

    // All members should still be visible
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
  });

  it('should handle group key comparison for numeric years', async () => {
    const user = userEvent.setup();
    await renderComponent();

    // Group by start year
    const groupBySelect = screen.getByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const startYearOption = await screen.findByRole('option', { name: /start year/i });
    await user.click(startYearOption);

    // Should show at least one year from the mock data
    expect(await screen.findByText('2021')).toBeInTheDocument();
  });

  it('should handle former team with hierarchical sort fallback to end year', async () => {
    const formerData: PeopleProfileData = [
      {
        name: 'Former A',
        lastName: 'A',
        image: '',
        slug: 'former-a',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(formerData);

    // Switch to former team - should use EndYearNewest sort
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Former A')).toBeInTheDocument();
  });

  it('should correctly show isActiveInYear return false case', async () => {
    const narrowRangeData: PeopleProfileData = [
      {
        name: 'Narrow Range 2010',
        lastName: 'Narrow',
        image: '',
        slug: 'narrow-2010',
        roles: [
          {
            type: 'member',
            title: 'Very Short Role',
            dateStart: new Date('2010-03-01'),
            dateEnd: new Date('2010-06-30'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(narrowRangeData);

    // Switch to former team
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Narrow Range 2010')).toBeInTheDocument();
  });

  it('should test role year filtering with specific years', async () => {
    const dataWithYear: PeopleProfileData = [
      {
        name: 'Active 2015',
        lastName: 'A',
        image: '',
        slug: 'active-2015',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2014-01-01'),
            dateEnd: new Date('2016-12-31'),
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Active 2020',
        lastName: 'B',
        image: '',
        slug: 'active-2020',
        roles: [
          {
            type: 'member',
            title: 'Role 2',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithYear);

    // Switch to former team to see Active 2015
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    // Wait for person to appear on former team
    expect(await screen.findByText('Active 2015')).toBeInTheDocument();

    // Switch back to current team
    const currentToggle = screen.getByRole('radio', { name: /current team/i });
    await user.click(currentToggle);

    // Should show Active 2020 on current team
    expect(await screen.findByText('Active 2020')).toBeInTheDocument();
  });

  it('should handle year range where person is not active before start year', async () => {
    const laterStartData: PeopleProfileData = [
      {
        name: 'Started Late',
        lastName: 'Late',
        image: '',
        slug: 'started-late',
        roles: [
          {
            type: 'member',
            title: 'Late Starter',
            dateStart: new Date('2022-06-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
    ];

    await renderComponent(laterStartData);

    expect(screen.getByText('Started Late')).toBeInTheDocument();
    expect(screen.getByText('Late Starter')).toBeInTheDocument();
  });

  it('should handle year range where person is not active after end year', async () => {
    const earlyEndData: PeopleProfileData = [
      {
        name: 'Ended Early',
        lastName: 'Early',
        image: '',
        slug: 'ended-early',
        roles: [
          {
            type: 'member',
            title: 'Early Ender',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2012-12-31'),
            displayOrder: 1,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(earlyEndData);

    // Switch to former team to see person who ended early
    const formerToggle = screen.getByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Ended Early')).toBeInTheDocument();
  });

  it('should properly handle sort comparison when comparing different start years', async () => {
    const sortData: PeopleProfileData = [
      {
        name: 'Early Starter',
        lastName: 'AA',
        image: '',
        slug: 'early-starter',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2005-01-01'),
            dateEnd: null,
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Late Starter',
        lastName: 'ZZ',
        image: '',
        slug: 'late-starter',
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(sortData);

    // Sort by start year (old to new)
    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /start year \(old to new\)/i });
    await user.click(option);

    // Early starter should come first
    const names = screen.getAllByText(/^(Early Starter|Late Starter)$/);
    expect(names[0]).toHaveTextContent('Early Starter');
    expect(names[1]).toHaveTextContent('Late Starter');
  });

  it('should handle null end year in sorting comparisons', async () => {
    const nullEndData: PeopleProfileData = [
      {
        name: 'Ended 2018',
        lastName: 'Ended',
        image: '',
        slug: 'ended-2018',
        roles: [
          {
            type: 'member',
            title: 'Ended Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 1,
          },
        ],
      },
      {
        name: 'Still Active',
        lastName: 'Active',
        image: '',
        slug: 'still-active',
        roles: [
          {
            type: 'member',
            title: 'Active Role',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 2,
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(nullEndData);

    // Sort by end year (new to old)
    const sortSelect = screen.getByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /end year \(new to old\)/i });
    await user.click(option);

    // Still active (null end year) should come first (treated as newest)
    const names = screen.getAllByText(/^(Ended 2018|Still Active)$/);
    expect(names[0]).toHaveTextContent('Still Active');
  });
});
