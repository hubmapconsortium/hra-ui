import { DashboardLayoutComponent } from './dashboard-layout.component';
import { render, screen } from '@testing-library/angular';

describe('DashboardLayoutComponent', () => {
  it('should render title, description, and link', async () => {
    const spec = {
      type: 'Dashboard',
      title: 'Dashboard Title',
      description: 'This is a dashboard description.',
      link: {
        url: 'https://example.com',
        label: 'Learn More',
      },
      items: [],
    };

    await render(DashboardLayoutComponent, {
      componentInputs: { spec: spec },
    });

    const title = screen.getByText('Dashboard Title');
    const description = screen.getByText('This is a dashboard description.');
    const link = screen.getByRole('link', { name: 'Learn More' });

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  // it('should render child components', async () => {
  //   const childComponent = {
  //     type: 'ChildComponent',
  //     data: 'Child component data'
  //   };

  //   const spec = {
  //     type: 'Dashboard',
  //     title: 'Dashboard Title',
  //     description: 'This is a dashboard description.',
  //     link: {
  //       url: 'https://example.com',
  //       label: 'Learn More'
  //     },
  //     items: [childComponent]
  //   };

  //   const renderChildComponent = jest.fn().mockReturnValue('Child component rendered');

  //   await render(DashboardLayoutComponent, {
  //     componentInputs: { spec: spec },
  //     imports: [
  //       {
  //         directive: DashboardComponentOutletDirective,
  //         renderers: {
  //           'ChildComponent': renderChildComponent
  //         }
  //       }
  //     ]
  //   });

  //   expect(renderChildComponent).toHaveBeenCalledWith(childComponent);
  //   expect(screen.getByText('Child component rendered')).toBeInTheDocument();
  // });
});
