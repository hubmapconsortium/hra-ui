import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { PeopleData, PeopleId } from '../../schemas/people.schema';
import { SidebarStore } from '../../state/sidebar/sidebar.store';
import { CurrentTeamComponent } from './current-team.component';

/** Mock SidebarStore that keeps sidebar open for testing */
class MockSidebarStore {
  readonly sidebar = signal(null);
  readonly hasSidebar = signal(true);
  readonly mode = signal('side' as const);
  readonly isOpen = signal(true);
  readonly _isWideScreen = signal(true);

  readonly setSidebar = jest.fn();
  readonly clearSidebar = jest.fn();
  readonly open = jest.fn();
  readonly close = jest.fn();
  readonly toggle = jest.fn();
}

describe('CurrentTeamComponent', () => {
  const providers = [
    provideMarkdown(),
    provideHttpClient(),
    provideHttpClientTesting(),
    { provide: SidebarStore, useClass: MockSidebarStore },
  ];
  const imports = [MatIconTestingModule];

  const mockData: PeopleData = [
    {
      name: 'Katy Börner',
      lastName: 'Börner',
      image: '/assets/people/katy-borner.png',
      slug: 'katy-borner' as PeopleId,
      roles: [
        {
          type: 'member',
          title: 'Faculty, Center Director',
          dateStart: new Date('2005-01-01'),
          dateEnd: null,
          displayOrder: 1,
          office: '',
          phone: '',
          fax: '',
          email: '',
          education: '',
          background: '',
          interests: '',
        },
      ],
    },
    {
      name: 'John Smith',
      lastName: 'Smith',
      image: '/assets/people/john-smith.png',
      slug: 'john-smith' as PeopleId,
      roles: [
        {
          type: 'member',
          title: 'Postdoctoral Fellow',
          dateStart: new Date('2020-01-01'),
          dateEnd: null,
          displayOrder: 2,
          office: '',
          phone: '',
          fax: '',
          email: '',
          education: '',
          background: '',
          interests: '',
        },
      ],
    },
    {
      name: 'Jane Doe',
      lastName: 'Doe',
      image: '',
      slug: 'jane-doe' as PeopleId,
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
      slug: 'bob-johnson' as PeopleId,
      roles: [{ type: 'collaborator', project: 'HuBMAP', dateStart: new Date('2019-01-01'), dateEnd: null }],
    },
    {
      name: 'Former Member',
      lastName: 'Member',
      image: '/assets/people/former-member.png',
      slug: 'former-member' as PeopleId,
      roles: [
        {
          type: 'member',
          title: 'Research Assistant',
          dateStart: new Date('2010-01-01'),
          dateEnd: new Date('2015-12-31'),
          displayOrder: 3,
          office: '',
          phone: '',
          fax: '',
          email: '',
          education: '',
          background: '',
          interests: '',
        },
      ],
    },
  ];

  async function renderComponent(data: PeopleData = mockData) {
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

  it('should show current members by default and display all role types correctly', async () => {
    await renderComponent();

    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(4);
    expect(screen.getByText('Katy Börner')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Verify role types display
    expect(screen.getByText('Faculty, Center Director')).toBeInTheDocument();
    expect(screen.getByText('Postdoctoral Fellow')).toBeInTheDocument();
    expect(screen.getByText('Ph.D. Student - Data Visualization')).toBeInTheDocument();
    expect(screen.getByText('Collaborator - HuBMAP')).toBeInTheDocument();
  });

  it('should toggle between current and former team', async () => {
    const user = userEvent.setup();
    await renderComponent();

    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Former Member')).toBeInTheDocument();
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);

    const currentToggle = await screen.findByRole('radio', { name: /current team/i });
    await user.click(currentToggle);

    expect(await screen.findAllByText(/learn more/i)).toHaveLength(4);
  });

  it('should filter by search text and show no results when no matches', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = await screen.findByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Katy');

    expect(await screen.findByText('Katy Börner')).toBeInTheDocument();
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);

    await user.clear(searchInput);
    await user.type(searchInput, 'XYZ123');
    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });

  it('should sort by last name ascending and descending', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const ascOption = await screen.findByRole('option', { name: /last name \(ascending a-z\)/i });
    await user.click(ascOption);

    let names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Katy Börner');
    expect(names[3]).toHaveTextContent('John Smith');

    await user.click(sortSelect);
    const descOption = await screen.findByRole('option', { name: /last name \(descending z-a\)/i });
    await user.click(descOption);

    names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('John Smith');
    expect(names[names.length - 1]).toHaveTextContent('Katy Börner');
  });

  it('should sort by start year', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /start year \(old to new\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Katy Börner|John Smith|Jane Doe|Bob Johnson)$/);
    expect(names[0]).toHaveTextContent('Katy Börner');
  });

  it('should display profile pictures and use placeholder for missing images', async () => {
    await renderComponent();

    const katyImage = screen.getByRole('img', { name: /profile picture of katy börner/i });
    expect(katyImage).toBeInTheDocument();
    expect(katyImage).toHaveAttribute('src');

    const janeImage = screen.getByRole('img', { name: /profile picture of jane doe/i });
    expect(janeImage).toBeInTheDocument();
    expect(janeImage.getAttribute('src')).toContain('placeholder');
  });

  it('should have correct profile links', async () => {
    await renderComponent();

    const katyLink = screen.getByRole('link', { name: /learn more about katy/i });
    expect(katyLink).toHaveAttribute('href', '/people/katy-borner');
  });

  it('should clear filters and search', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = await screen.findByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'NonExistentPerson');

    const clearFiltersButton = await screen.findByRole('button', { name: /clear filters/i });
    await user.click(clearFiltersButton);

    expect(await screen.findAllByText(/learn more/i)).toHaveLength(4);

    await user.type(searchInput, 'test');
    const clearSearchButton = await screen.findByRole('button', { name: /clear search/i });
    await user.click(clearSearchButton);
    expect(searchInput).toHaveValue('');
  });

  it('should display and update results counter', async () => {
    const user = userEvent.setup();
    await renderComponent();

    expect(screen.getByText((content) => content.includes('4') && content.includes('of'))).toBeInTheDocument();

    const searchInput = await screen.findByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Katy');

    await screen.findByText('Katy Börner');
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);
  });

  it('should show hierarchical sort option only for current team', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);
    expect(await screen.findByRole('option', { name: /hierarchical/i })).toBeInTheDocument();

    // Close dropdown and switch to former team
    await user.keyboard('{Escape}');
    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);
    await screen.findByText('Former Member');

    await user.click(sortSelect);
    expect(screen.queryByRole('option', { name: /hierarchical/i })).not.toBeInTheDocument();
  });

  it('should handle empty data gracefully', async () => {
    await renderComponent([]);
    expect(screen.getByText((content) => content.includes('0') && content.includes('of'))).toBeInTheDocument();
  });

  it('should filter out members with no roles', async () => {
    const dataWithNoRoles: PeopleData = [
      ...mockData,
      {
        name: 'No Role Member',
        lastName: 'NoRole',
        image: '',
        slug: 'no-role' as PeopleId,
        roles: [],
      },
    ];

    await renderComponent(dataWithNoRoles);
    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);
    expect(screen.queryByText('No Role Member')).not.toBeInTheDocument();
  });

  it('should persist search when switching teams', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = await screen.findByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Former');

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(searchInput).toHaveValue('Former');
    expect(await screen.findByText('Former Member')).toBeInTheDocument();
  });

  it('should handle masters student degree correctly', async () => {
    const dataWithMasters: PeopleData = [
      {
        name: 'Masters Student',
        lastName: 'Student',
        image: '',
        slug: 'masters-student' as PeopleId,
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

  it('should group by role showing all group headers', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    expect(await screen.findByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('PhD Students')).toBeInTheDocument();
    expect(screen.getByText('Collaborators')).toBeInTheDocument();
  });

  it('should group by start year', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const startYearOption = await screen.findByRole('option', { name: /start year/i });
    await user.click(startYearOption);

    expect(await screen.findByText('2021')).toBeInTheDocument();
  });

  it('should group by end year and show Current for active members', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    expect(await screen.findByText('Current')).toBeInTheDocument();
  });

  it('should group by end year for former members', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);
    await screen.findByText('Former Member');

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    expect(await screen.findByText('2015')).toBeInTheDocument();
  });

  it('should sort by end year', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /end year \(new to old\)/i });
    await user.click(option);

    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);
  });

  it('should have filter buttons available', async () => {
    await renderComponent();

    expect(await screen.findByRole('button', { name: /^roles$/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /^active year$/i })).toBeInTheDocument();
  });

  it('should search with diacritics normalization', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const searchInput = await screen.findByRole('textbox', { name: /search/i });
    await user.type(searchInput, 'Borner');

    expect(await screen.findByText('Katy Börner')).toBeInTheDocument();
    expect(screen.getAllByText(/learn more/i)).toHaveLength(1);
  });

  it('should handle member with no title gracefully', async () => {
    const dataWithNoTitle: PeopleData = [
      {
        name: 'No Title Member',
        lastName: 'NoTitle',
        image: '',
        slug: 'no-title' as PeopleId,
        roles: [
          {
            type: 'member',
            title: '',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    await renderComponent(dataWithNoTitle);
    expect(screen.getByText('No Title Member')).toBeInTheDocument();
  });

  it('should handle people with multiple roles showing most recent role', async () => {
    const dataWithMultipleRoles: PeopleData = [
      {
        name: 'Multi Role Person',
        lastName: 'Multi',
        image: '',
        slug: 'multi-role' as PeopleId,
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
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    await renderComponent(dataWithMultipleRoles);
    expect(screen.getByText('Multi Role Person')).toBeInTheDocument();
    expect(screen.getByText('Current Position')).toBeInTheDocument();
  });

  it('should handle multiple roles with both ended dates sorted correctly', async () => {
    const dataWithMultipleEndedRoles: PeopleData = [
      {
        name: 'Multi Ended Roles',
        lastName: 'Ended',
        image: '',
        slug: 'multi-ended' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'First Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2017-12-31'),
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
          {
            type: 'member',
            title: 'Second Role',
            dateStart: new Date('2018-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithMultipleEndedRoles);

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Multi Ended Roles')).toBeInTheDocument();
    expect(screen.getByText('Second Role')).toBeInTheDocument();
  });

  it('should handle roles where only one has an end date', async () => {
    const dataWithMixedEndDates: PeopleData = [
      {
        name: 'Mixed End Dates',
        lastName: 'Mixed',
        image: '',
        slug: 'mixed-end' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Ended Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
          {
            type: 'member',
            title: 'Active Role',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    await renderComponent(dataWithMixedEndDates);
    expect(screen.getByText('Mixed End Dates')).toBeInTheDocument();
    expect(screen.getByText('Active Role')).toBeInTheDocument();
  });

  it('should filter members by current/former status based on date range', async () => {
    const dataWithDateRange: PeopleData = [
      {
        name: 'Active 2010-2015',
        lastName: 'Active',
        image: '',
        slug: 'active-2010' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Past Member',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Active 2018-Now',
        lastName: 'Current',
        image: '',
        slug: 'active-2018' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Current Member',
            dateStart: new Date('2018-01-01'),
            dateEnd: null,
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(dataWithDateRange);

    expect(screen.getByText('Active 2018-Now')).toBeInTheDocument();
    expect(screen.queryByText('Active 2010-2015')).not.toBeInTheDocument();

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    expect(await screen.findByText('Active 2010-2015')).toBeInTheDocument();
    expect(screen.queryByText('Active 2018-Now')).not.toBeInTheDocument();
  });

  it('should handle sorting by end year for former members', async () => {
    const formerMembersData: PeopleData = [
      {
        name: 'Left 2015',
        lastName: 'First',
        image: '',
        slug: 'left-2015' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Former',
            dateStart: new Date('2010-01-01'),
            dateEnd: new Date('2015-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Left 2020',
        lastName: 'Second',
        image: '',
        slug: 'left-2020' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Recent Former',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(formerMembersData);

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);

    const names = await screen.findAllByText(/^(Left 2015|Left 2020)$/);
    expect(names[0]).toHaveTextContent('Left 2020');
    expect(names[1]).toHaveTextContent('Left 2015');
  });

  it('should handle masters student filter grouping correctly', async () => {
    const dataWithMasters: PeopleData = [
      {
        name: 'Masters Person',
        lastName: 'Masters',
        image: '',
        slug: 'masters-person' as PeopleId,
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

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const roleOption = await screen.findByRole('option', { name: /^role$/i });
    await user.click(roleOption);

    expect(await screen.findByText('Master Students')).toBeInTheDocument();
    expect(screen.getByText('Masters Person')).toBeInTheDocument();
  });

  it('should handle comparison of group keys when mixing years', async () => {
    const mixedData: PeopleData = [
      {
        name: 'Person 2020',
        lastName: 'A',
        image: '',
        slug: 'person-2020' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2020-01-01'),
            dateEnd: new Date('2020-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Person 2021',
        lastName: 'B',
        image: '',
        slug: 'person-2021' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2021-01-01'),
            dateEnd: new Date('2021-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(mixedData);

    const formerToggle = await screen.findByRole('radio', { name: /former team/i });
    await user.click(formerToggle);
    await screen.findByText('Person 2020');

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const endYearOption = await screen.findByRole('option', { name: /end year/i });
    await user.click(endYearOption);

    expect(await screen.findByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('should handle display order for hierarchical sorting', async () => {
    const dataWithDisplayOrder: PeopleData = [
      {
        name: 'High Priority',
        lastName: 'A',
        image: '',
        slug: 'high-priority' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Director',
            dateStart: new Date('2010-01-01'),
            dateEnd: null,
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Low Priority',
        lastName: 'B',
        image: '',
        slug: 'low-priority' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Assistant',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 10,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    await renderComponent(dataWithDisplayOrder);

    const names = screen.getAllByText(/^(High Priority|Low Priority)$/);
    expect(names[0]).toHaveTextContent('High Priority');
    expect(names[1]).toHaveTextContent('Low Priority');
  });

  it('should handle member without displayOrder using default ordering', async () => {
    const dataWithoutDisplayOrder: PeopleData = [
      {
        name: 'No Order Member',
        lastName: 'NoOrder',
        image: '',
        slug: 'no-order' as PeopleId,
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

  it('should group by none and show all ungrouped', async () => {
    const user = userEvent.setup();
    await renderComponent();

    const groupBySelect = await screen.findByRole('combobox', { name: /group by/i });
    await user.click(groupBySelect);

    const noneOption = await screen.findByRole('option', { name: /none/i });
    await user.click(noneOption);

    expect(screen.getAllByText(/learn more/i)).toHaveLength(4);
  });

  it('should handle sorting when both roles have same undefined end dates', async () => {
    const dataWithBothUndefined: PeopleData = [
      {
        name: 'Both Current',
        lastName: 'BothCurrent',
        image: '',
        slug: 'both-current' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Role A',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
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
    expect(screen.getByText('Both Current')).toBeInTheDocument();
  });

  it('should handle null end year in sorting comparisons', async () => {
    const nullEndData: PeopleData = [
      {
        name: 'Ended 2018',
        lastName: 'Ended',
        image: '',
        slug: 'ended-2018' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Ended Role',
            dateStart: new Date('2015-01-01'),
            dateEnd: new Date('2018-12-31'),
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Still Active',
        lastName: 'Active',
        image: '',
        slug: 'still-active' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Active Role',
            dateStart: new Date('2019-01-01'),
            dateEnd: null,
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(nullEndData);

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /end year \(new to old\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Ended 2018|Still Active)$/);
    expect(names[0]).toHaveTextContent('Still Active');
  });

  it('should sort by start year comparing different years', async () => {
    const sortData: PeopleData = [
      {
        name: 'Early Starter',
        lastName: 'AA',
        image: '',
        slug: 'early-starter' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2005-01-01'),
            dateEnd: null,
            displayOrder: 1,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
      {
        name: 'Late Starter',
        lastName: 'ZZ',
        image: '',
        slug: 'late-starter' as PeopleId,
        roles: [
          {
            type: 'member',
            title: 'Role',
            dateStart: new Date('2020-01-01'),
            dateEnd: null,
            displayOrder: 2,
            office: '',
            phone: '',
            fax: '',
            email: '',
            education: '',
            background: '',
            interests: '',
          },
        ],
      },
    ];

    const user = userEvent.setup();
    await renderComponent(sortData);

    const sortSelect = await screen.findByRole('combobox', { name: /sort by/i });
    await user.click(sortSelect);

    const option = await screen.findByRole('option', { name: /start year \(old to new\)/i });
    await user.click(option);

    const names = screen.getAllByText(/^(Early Starter|Late Starter)$/);
    expect(names[0]).toHaveTextContent('Early Starter');
    expect(names[1]).toHaveTextContent('Late Starter');
  });
});
