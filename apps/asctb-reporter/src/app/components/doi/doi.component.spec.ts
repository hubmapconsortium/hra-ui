import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DOI } from '../../models/sheet.model';
import { DoiComponent } from './doi.component';

describe('DoiComponent', () => {
  const mockData: DOI[] = [
    { doi: 'DOI: 10.1234/example1', id: '1', notes: 'Test note 1' },
    { doi: '10.1234/example2', id: '2', notes: 'Test note 2' },
  ];

  const renderComponent = async () => {
    const dismissSpy = jest.fn();
    const mockBottomSheetRef = { dismiss: dismissSpy };

    const result = await render(DoiComponent, {
      providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockData },
        { provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
      ],
      imports: [CommonModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
    });

    return { ...result, dismissSpy };
  };

  it('should render with data', async () => {
    await renderComponent();
    expect(screen.getByText('DOI Details')).toBeInTheDocument();
  });

  it('should trim DOI prefix on init', async () => {
    await renderComponent();
    expect(screen.getByText('10.1234/example1')).toBeInTheDocument();
    expect(screen.getByText('10.1234/example2')).toBeInTheDocument();
  });

  it('should close bottom sheet', async () => {
    const { dismissSpy, container } = await renderComponent();
    const closeBtn = container.querySelector('[hraFeature="close"]') as HTMLElement;
    await userEvent.click(closeBtn);
    expect(dismissSpy).toHaveBeenCalled();
  });
});
