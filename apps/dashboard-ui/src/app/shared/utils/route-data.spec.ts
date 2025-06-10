import { render } from '@testing-library/angular';
import { Component, inject } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { routeData } from './route-data';

@Component({
  template: 'Child Component',
  standalone: true,
})
class ChildComponent {}

@Component({
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],
})
class ParentComponent {}

@Component({
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet],
})
class TestAppComponent {
  private router = inject(Router);
  readonly data = routeData();

  async navigateToChild() {
    await this.router.navigate(['/parent/child']);
  }
}

describe('routeData', () => {
  it('should return route data for nested routes', async () => {
    const { fixture } = await render(TestAppComponent, {
      providers: [
        provideRouter([
          {
            path: 'parent',
            component: ParentComponent,
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
