import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { provideRouterExt } from '../providers';
import { LinkDirective } from './link.directive';

describe('LinkDirective', () => {
  const baseUrl = 'https://humanatlas.io/';
  const pageUrl = `${baseUrl}page`;
  const otherUrl = 'https://apps.humanatlas.io/';
  const externalUrl = 'https://example.com';

  @Component({
    template: `<a hraLink="${pageUrl}">link</a>`,
    imports: [LinkDirective],
  })
  class MockHome {}

  const providers = [
    provideAppConfiguration({ url: baseUrl }),
    provideRouter([{ path: '**', component: MockHome }]),
    provideRouterExt(),
  ];

  it('should set anchor tag attributes', async () => {
    await render(`<a hraLink="${externalUrl}" hraLinkExternal>link</a>`, { imports: [LinkDirective], providers });

    const el = screen.queryByText('link');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('href', externalUrl);
    expect(el).toHaveAttribute('target', '_blank');
    expect(el).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses the router for local links', async () => {
    TestBed.configureTestingModule({ providers });

    const user = userEvent.setup();
    const harness = await RouterTestingHarness.create('/');
    const router = TestBed.inject(Router);
    const el = screen.getByText('link');

    await user.click(el);
    harness.detectChanges();
    expect(router.url).toEqual('/page');
  });

  it('uses default anchor behavior for auxiliary clicks', async () => {
    await render(`<a hraLink="${otherUrl}">link</a>`, { imports: [LinkDirective], providers });

    const user = userEvent.setup();
    const el = screen.getByText('link');
    el.addEventListener('click', (event) => {
      expect(event.defaultPrevented).toBeFalsy();
      event.preventDefault();
    });

    await user.keyboard('{Control>}');
    await user.click(el);

    expect.hasAssertions();
  });
});
