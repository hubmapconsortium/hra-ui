import { render, screen, within } from '@testing-library/angular';
import { AnyRole } from '../../schemas/roles.schema';
import { TenureListComponent } from './tenure-list.component';

describe('TenureListComponent', () => {
  function createRole(dateStart: Date, dateEnd: Date | null | undefined): AnyRole {
    return { type: 'member', title: 'Research Assistant', dateStart, dateEnd };
  }

  it('should list tenure streaks from most to least recent', async () => {
    await render(TenureListComponent, {
      componentInputs: {
        roles: [
          createRole(new Date(2021, 7, 2), null),
          createRole(new Date(2015, 7, 24), new Date(2021, 6, 30)),
          createRole(new Date(2004, 0, 1), new Date(2008, 7, 8)),
        ],
      },
    });

    const list = screen.getByRole('list', { name: 'CNS tenure' });
    const dateRanges = within(list)
      .getAllByRole('listitem')
      .map((item) => item.textContent?.trim());
    expect(dateRanges).toEqual(['Aug 2015–Present', 'Jan 2004–Aug 2008']);
  });
});
