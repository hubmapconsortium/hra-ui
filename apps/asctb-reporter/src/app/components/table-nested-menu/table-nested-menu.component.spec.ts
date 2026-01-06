import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import { TableNestedMenuComponent } from './table-nested-menu.component';

@Component({
  imports: [TableNestedMenuComponent, MatMenuModule],
  template: `
    <button [matMenuTriggerFor]="menu.childMenu">Open Menu</button>
    <app-table-nested-menu [sheetDetails]="sheetDetails" #menu />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  @ViewChild(TableNestedMenuComponent) menu!: TableNestedMenuComponent;
  sheetDetails = [
    {
      name: 'kidney',
      display: 'Kidney',
      version: [
        { viewValue: 'Kidney v1.0', sheetId: 'sheet123', gid: 'gid456' },
        { viewValue: 'Kidney v1.1', link: 'https://example.com/kidney' },
      ],
    },
    {
      name: 'liver',
      display: 'Liver',
      version: [{ viewValue: 'Liver v1.0', csvUrl: 'https://example.com/liver.csv' }],
    },
  ];
}

describe('TableNestedMenuComponent', () => {
  it('displays sheet names and version links', async () => {
    await render(TestHostComponent);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await user.click(screen.getByRole('menuitem', { name: /kidney/i }));

    expect(screen.getByRole('menuitem', { name: /kidney v1\.0/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /kidney v1\.1/i })).toBeInTheDocument();
  });

  it('generates correct URLs', async () => {
    await render(TestHostComponent);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await user.click(screen.getByRole('menuitem', { name: /kidney/i }));

    const v1Link = screen.getByRole('menuitem', { name: /kidney v1\.0/i });
    expect(v1Link).toHaveAttribute('href', 'https://docs.google.com/spreadsheets/d/sheet123/edit#gid=gid456');

    const v1_1Link = screen.getByRole('menuitem', { name: /kidney v1\.1/i });
    expect(v1_1Link).toHaveAttribute('href', 'https://example.com/kidney');
  });

  it('opens links in new tab', async () => {
    await render(TestHostComponent);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await user.click(screen.getByRole('menuitem', { name: /liver/i }));

    const link = screen.getByRole('menuitem', { name: /liver v1\.0/i });
    expect(link).toHaveAttribute('target', '_blank');
  });
});
