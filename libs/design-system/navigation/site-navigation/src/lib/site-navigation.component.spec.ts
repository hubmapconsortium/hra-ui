import { render, screen } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import userEvent from '@testing-library/user-event';

describe('SiteNavigationComponent', () => {
  const providers = [provideRouter([])];

  async function setup(inputs = {}) {
    const user = userEvent.setup();
    const result = await render(SiteNavigationComponent, {
      providers,
      ...inputs,
    });
    const router = TestBed.inject(Router);
    return { ...result, user, router };
  }

  it('should render', async () => {
    await setup();

    const heading = screen.getByText('Help & Documentation');
    expect(heading).toBeInTheDocument();
  });
});
