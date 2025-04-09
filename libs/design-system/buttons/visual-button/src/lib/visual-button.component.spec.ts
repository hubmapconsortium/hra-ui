import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualButtonComponent } from './visual-button.component';
import { render } from '@testing-library/angular';

describe('VisualButtonComponent', () => {
  it('should create', async () => {
    const promise = render(VisualButtonComponent, { inputs: {} });
    await expect(promise).resolves.toBeTruthy();
  });
});
