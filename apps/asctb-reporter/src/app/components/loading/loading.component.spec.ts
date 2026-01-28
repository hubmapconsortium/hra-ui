import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { UIStateModel } from '../../store/ui.state';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  it('should create and display loading content and show provided loading text', async () => {
    const { fixture, container } = await render(LoadingComponent, {
      providers: [{ provide: MAT_DIALOG_DATA, useValue: 'Initial message' }],
      // prevent initial change detection so we can assign the selector observable first
      detectChangesOnRender: false,
    });

    const component = fixture.componentInstance;
    // Override the select-decorated getter with a test observable
    Object.defineProperty(component, 'loadingText$', {
      value: of({ loadingText: 'Loading...' } as UIStateModel),
      configurable: true,
    });

    fixture.detectChanges();

    expect(screen.getByText('Please wait...')).toBeTruthy();
    expect(container.querySelector('hra-progress-spinner')).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});
