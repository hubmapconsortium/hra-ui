import { TestBed } from '@angular/core/testing';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';
import { provideButtons } from './providers';

describe('provideButtons', () => {
  it('should provide button toggle default options', () => {
    TestBed.configureTestingModule({
      providers: [provideButtons()],
    });

    const options = TestBed.inject(MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS);
    expect(options).toBeDefined();
    expect(options.hideMultipleSelectionIndicator).toBe(true);
  });
});
