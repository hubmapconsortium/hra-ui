import { render } from '@testing-library/angular';
import { Component, inject } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { routeData } from './route-data';

@Component({
  template: 'Child',
  standalone: true,
})
class ChildComponent {}

@Component({
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],
})
class TestAppComponent {
  data = routeData();
  private router = inject(Router);

  navigateToChild() {
    return this.router.navigate(['/parent/child']);
  }
}

describe('routeData', () => {
  it('should return route data for nested routes', async () => {
    const { fixture } = await render(TestAppComponent, {
      providers: [
        provideRouter([
          {
            path: 'parent',
            data: { title: 'Parent' },
            children: [
              {
                path: 'child',
                component: ChildComponent,
                data: { title: 'Child' },
              },
            ],
          },
        ]),
      ],
    });

    const component = fixture.componentInstance;
    await component.navigateToChild();
    expect(component.data()).toBeDefined();
  });
});
