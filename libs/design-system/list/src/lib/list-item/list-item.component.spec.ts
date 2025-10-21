import { MatListModule } from '@angular/material/list';
import { render, screen } from '@testing-library/angular';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  it('should render with title and optional lines', async () => {
    await render(
      `<mat-selection-list>
        <hra-list-item title="Test Item" line2="Secondary text" line3="Tertiary text" />
      </mat-selection-list>`,
      {
        imports: [MatListModule, ListItemComponent],
      },
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Secondary text')).toBeInTheDocument();
    expect(screen.getByText('Tertiary text')).toBeInTheDocument();
  });
});
