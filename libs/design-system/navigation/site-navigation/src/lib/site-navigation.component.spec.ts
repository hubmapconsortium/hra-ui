import { render } from '@testing-library/angular';
import { SiteNavigationComponent } from './site-navigation.component';

describe('SiteNavigationComponent', () => {
  it('should render', async () => {
    const promise = render(SiteNavigationComponent);
    await expect(promise).resolves.toBeTruthy();
  });

  it('should set expanded category when changeExpandedCategory is called with true', async () => {
    const { fixture } = await render(SiteNavigationComponent);

    const component = fixture.componentInstance;
    const categoryName = 'Test Category';

    component.changeExpandedCategory(true, categoryName);

    expect(component.expandedCategory()).toBe(categoryName);
  });

  it('should update expanded category in constructor', async () => {
    const { fixture } = await render(SiteNavigationComponent);

    const component = fixture.componentInstance;

    expect(component.expandedCategory()).toBeDefined();
  });

  it('should not set expanded category when isExpanded is false', async () => {
    const { fixture } = await render(SiteNavigationComponent);

    const component = fixture.componentInstance;

    component.changeExpandedCategory(true, 'Category 1');
    expect(component.expandedCategory()).toBe('Category 1');

    component.changeExpandedCategory(false, 'Category 2');
    expect(component.expandedCategory()).toBe('Category 1');
  });

  it('should set expanded category when isExpanded is true', async () => {
    const { fixture } = await render(SiteNavigationComponent);

    const component = fixture.componentInstance;

    expect(component.expandedCategory()).toBe('');

    component.changeExpandedCategory(true, 'New Category');
    expect(component.expandedCategory()).toBe('New Category');
  });

  it('should return category label when route is active', async () => {
    const mockMenu = [
      {
        type: 'category' as const,
        label: 'Test Category',
        icon: 'icon',
        children: [
          {
            type: 'item' as const,
            label: 'Item 1',
            url: '/test-url',
          },
        ],
      },
    ];

    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        navigationMenu: mockMenu,
      },
    });

    const component = fixture.componentInstance;

    Object.defineProperty(component, 'urlResolver', {
      value: jest.fn().mockReturnValue('/test-url'),
      writable: true,
    });

    const mockRouter = component['router'];
    if (mockRouter) {
      jest.spyOn(mockRouter, 'isActive').mockReturnValue(true);

      const result = component['findExpandedCategory'](mockMenu);
      expect(result).toBe('Test Category');
    }
  });

  it('should return empty string when route is not active', async () => {
    const mockMenu = [
      {
        type: 'category' as const,
        label: 'Test Category',
        icon: 'icon',
        children: [
          {
            type: 'item' as const,
            label: 'Item 1',
            url: '/test-url',
          },
        ],
      },
    ];

    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        navigationMenu: mockMenu,
      },
    });

    const component = fixture.componentInstance;

    Object.defineProperty(component, 'urlResolver', {
      value: jest.fn().mockReturnValue('/test-url'),
      writable: true,
    });

    const mockRouter = component['router'];
    if (mockRouter) {
      jest.spyOn(mockRouter, 'isActive').mockReturnValue(false);

      const result = component['findExpandedCategory'](mockMenu);
      expect(result).toBe('');
    }
  });

  it('should return empty string when URL is absolute', async () => {
    const mockMenu = [
      {
        type: 'category' as const,
        label: 'External Category',
        icon: 'icon',
        children: [
          {
            type: 'item' as const,
            label: 'External Item',
            url: 'https://example.com',
          },
        ],
      },
    ];

    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        navigationMenu: mockMenu,
      },
    });

    const component = fixture.componentInstance;

    Object.defineProperty(component, 'urlResolver', {
      value: jest.fn().mockReturnValue('https://example.com'),
      writable: true,
    });

    const result = component['findExpandedCategory'](mockMenu);
    expect(result).toBe('');
  });

  it('should call updateExpandedCategory and update the expanded category signal', async () => {
    const mockMenu = [
      {
        type: 'category' as const,
        label: 'Updated Category',
        icon: 'icon',
        children: [
          {
            type: 'item' as const,
            label: 'Active Item',
            url: '/active-route',
          },
        ],
      },
    ];

    const { fixture } = await render(SiteNavigationComponent, {
      inputs: {
        navigationMenu: mockMenu,
      },
    });

    const component = fixture.componentInstance;

    Object.defineProperty(component, 'urlResolver', {
      value: jest.fn().mockReturnValue('/active-route'),
      writable: true,
    });

    const mockRouter = component['router'];
    if (mockRouter) {
      jest.spyOn(mockRouter, 'isActive').mockReturnValue(true);
    }

    component['updateExpandedCategory']();

    if (mockRouter) {
      expect(component.expandedCategory()).toBe('Updated Category');
    } else {
      expect(component.expandedCategory()).toBe('');
    }
  });
});
