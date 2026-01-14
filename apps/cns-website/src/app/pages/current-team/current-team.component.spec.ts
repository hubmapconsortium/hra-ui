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

  async function renderComponent(data: PeopleProfileData = mockData, type = 'current') {
    return render(CurrentTeamComponent, {
      providers,
      imports,
      inputs: { data, type },
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

  it('should initialize with past team type when provided', async () => {
    await renderComponent(mockData, 'past');

    // Former team should be selected
    expect(screen.getByText('Former Member')).toBeInTheDocument();
    const learnMoreLinks = screen.getAllByText(/learn more/i);
    expect(learnMoreLinks).toHaveLength(1);
  });
});
