import { render, screen, within } from '@testing-library/angular';
import { AnyRole } from '../../../schemas/roles.schema';
import { RoleHistoryComponent } from './role-history.component';

describe('RoleHistoryComponent', () => {
  const roles: AnyRole[] = [
    { type: 'member', title: 'Research Lead, Faculty', dateStart: new Date(2021, 7, 2), dateEnd: null },
    {
      type: 'student',
      topic: 'Ph.D. Information Science Student',
      degree: 'Ph.D.',
      department: 'Informatics',
      dateStart: new Date(2015, 7, 24),
      dateEnd: new Date(2021, 6, 30),
    },
    { type: 'member', title: '', dateStart: new Date(2005, 0, 1), dateEnd: new Date(2005, 11, 31) },
  ];

  it('should list each role with its title and dates in the given order', async () => {
    await render(RoleHistoryComponent, { componentInputs: { roles } });

    const entries = within(screen.getByRole('list', { name: 'CNS roles' })).getAllByRole('listitem');
    expect(entries).toHaveLength(3);
    expect(entries[0]).toHaveTextContent('Research Lead, Faculty · Aug 2021–Present');
    expect(entries[1]).toHaveTextContent('Ph.D. Student, Information Science · Aug 2015–Jul 2021');
    expect(entries[2]).toHaveTextContent(/^Jan 2005–Dec 2005$/);
  });

  it('should mark roles that have ended', async () => {
    await render(RoleHistoryComponent, { componentInputs: { roles } });

    const entries = screen.getAllByRole('listitem');
    expect(entries[0]).not.toHaveClass('ended');
    expect(entries[1]).toHaveClass('ended');
    expect(entries[2]).toHaveClass('ended');
  });
});
