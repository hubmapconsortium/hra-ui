import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { render } from '@testing-library/angular';
import { DOI } from '../../models/sheet.model';
import { DoiComponent } from './doi.component';

describe('DoiComponent', () => {
  const mockData: DOI[] = [
    { doi: 'DOI: 10.1234/example1', id: '1', notes: 'Test note 1' },
    { doi: '10.1234/example2', id: '2', notes: 'Test note 2' },
  ];

  const mockBottomSheetRef = { dismiss: jest.fn() };

  const renderComponent = async () => {
    return render(DoiComponent, {
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
      imports: [CommonModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
    });
  };

  it('should render with data', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should trim DOI prefix on init', async () => {
    const { fixture } = await renderComponent();
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.data[0].doi).toBe('10.1234/example1');
    expect(component.data[1].doi).toBe('10.1234/example2');
  });

  it('should close bottom sheet', async () => {
    const { fixture } = await renderComponent();
    const component = fixture.componentInstance;
    component.close();
    expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
  });
});
