import { MatTableModule } from '@angular/material/table';
import { CellTypeOption, CellTypesComponent } from './cell-types.component';
import { render, screen } from '@testing-library/angular';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColorPickerModule } from 'ngx-color-picker';

describe('CellTypesComponent', () => {
  it('should display the cell type options', async () => {
    // to be fixed
    const cellTypeOptions: CellTypeOption[] = [
      { name: 'Cell Type 1', count: 100, color: '#FF0000' },
      { name: 'Cell Type 2', count: 200, color: '#00FF00' },
      { name: 'Cell Type 3', count: 150, color: '#0000FF' },
    ];

    await render(CellTypesComponent, {
      componentInputs: {
        data: cellTypeOptions,
        anchor: 'Cell Type 2',
      },
      imports: [MatTableModule, MatSortModule, MatCheckboxModule, ColorPickerModule],
    });

    expect(screen.getByText('Cell Type 1')).toBeInTheDocument();
    expect(screen.getByText('Cell Type 2')).toBeInTheDocument();
    expect(screen.getByText('Cell Type 3')).toBeInTheDocument();

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });
});
