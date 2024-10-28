import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { FullscreenComponent, FullscreenContentOutletDirective } from './fullscreen.component';

describe('FullscreenComponent', () => {
  it('should create', async () => {
    await render(FullscreenComponent, {
      imports: [FullscreenContentOutletDirective],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    });

    const outlet = screen.getByTestId('fullscreen-outlet');
    expect(outlet).toBeInTheDocument();
    //
  });
});
