import { render, screen } from '@testing-library/angular';
import { AppsSidenavDemoComponent } from './apps-sidenav-demo.component';

describe('AppsSidenavDemoComponent', () => {
  beforeEach(async () => {
    await render(AppsSidenavDemoComponent);
  });

  it('should create', async () => {
    expect(screen.getByText('Sidenav Demonstration')).toBeInTheDocument();
  });
});
