import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouterExt } from '../providers';
import { FragmentLinkDirective } from './fragment-link.directive';

describe('FragmentLinkDirective', () => {
  const fragment = '#foobar';

  @Component({
    imports: [FragmentLinkDirective],
    template: `<a hraFragmentLink="${fragment}">link</a>`,
  })
  class MockHome {}

  const providers = [provideRouter([{ path: '**', component: MockHome }]), provideRouterExt()];

  it('should set anchor tag attributes', async () => {
    await render(MockHome, { providers });

    const el = screen.queryByText('link');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('href', fragment);
  });

  it('uses the router when available', async () => {
    TestBed.configureTestingModule({ providers });

    const user = userEvent.setup();
    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    const el = screen.getByText('link');

    await user.click(el);
    harness.detectChanges();
    expect(router.url).toContain(fragment);
  });

  it('uses default anchor behavior for auxiliary clicks', async () => {
    await render(MockHome);

    const user = userEvent.setup();
    const el = screen.getByText('link');
    el.addEventListener('click', (event) => {
      expect(event.defaultPrevented).toBeFalsy();
      event.preventDefault();
    });

    await user.keyboard('{Shift>}');
    await user.click(el);

    expect.hasAssertions();
  });
});
