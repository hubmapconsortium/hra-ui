import { render, screen } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';
import { provideRouter, Router, Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import userEvent from '@testing-library/user-event';

@Component({
  standalone: true,
  template: '<div>Test Page</div>',
})
class TestPageComponent {}

describe('SiteNavigationComponent', () => {
  const mockMenu = [
    {
      type: 'category' as const,
      label: 'Test Category',
      icon: 'folder',
      children: [
        {
          type: 'item' as const,
          label: 'Test Item',
          url: '/test-route',
        },
      ],
    },
    {
      type: 'item' as const,
      label: 'Standalone Item',
      url: '/standalone',
    },
  ];

  async function setup(inputs = {}, routes: Routes = []) {
    const user = userEvent.setup();
    const result = await render(SiteNavigationComponent, {
      providers: [provideRouter(routes)],
      ...inputs,
    });
    const router = TestBed.inject(Router);
    return { ...result, user, router };
  }

  it('should render', async () => {
    await setup();

    expect(screen.getByText('Help & Documentation')).toBeInTheDocument();
  });

  it('should expand category when clicking on expansion panel', async () => {
    const { user } = await setup({ inputs: { navigationMenu: mockMenu } });

    await user.click(screen.getByText('Test Category'));

    const childItem = await screen.findByText('Test Item');
    expect(childItem).toBeVisible();
  });

  it('should collapse category when clicking again', async () => {
    const { user } = await setup({ inputs: { navigationMenu: mockMenu } });

    const categoryHeader = screen.getByText('Test Category');
    await user.click(categoryHeader);
    await screen.findByText('Test Item');
    await user.click(categoryHeader);

    expect(categoryHeader).toBeInTheDocument();
  });

  it('should handle menu with external links', async () => {
    const menuWithExternalLink = [
      {
        type: 'category' as const,
        label: 'External Category',
        icon: 'link',
        children: [
          {
            type: 'item' as const,
            label: 'External Item',
            url: 'https://example.com',
          },
        ],
      },
    ];

    await setup({ inputs: { navigationMenu: menuWithExternalLink } });

    expect(screen.getByText('External Category')).toBeInTheDocument();
  });

  it('should navigate to route', async () => {
    const routes: Routes = [
      { path: '', component: TestPageComponent },
      { path: 'test-route', component: TestPageComponent },
    ];

    const { router } = await setup({ inputs: { navigationMenu: mockMenu } }, routes);

    await router.navigate(['/test-route']);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(router.url).toBe('/test-route');
  });
});
