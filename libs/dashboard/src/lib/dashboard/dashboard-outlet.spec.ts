import { render } from '@testing-library/angular';
import { ImageContainerComponent } from '../components/image-container/image-container.component';
import { DashboardComponentOutletComponent } from './dashboard-outlet.component';
import { provideDashboardComponents } from './dashboard-registry.service';

describe('DashboardComponentOutletDirective/DashboardComponentOutletComponent', () => {
  it('should should be empty for an empty spec', async () => {
    const { debugElement } = await render(DashboardComponentOutletComponent, {
      providers: [provideDashboardComponents([])],
      componentInputs: {
        spec: undefined,
      },
    });

    expect(debugElement.children.length).toEqual(0);
  });

  it('should be empty if it cannot find the dynamic component', async () => {
    const log = jest.spyOn(console, 'log').mockReturnValue(undefined);
    const { debugElement } = await render(DashboardComponentOutletComponent, {
      providers: [provideDashboardComponents([])],
      componentInputs: {
        spec: {
          type: 'does-not-exist',
        },
      },
    });

    expect(debugElement.children.length).toEqual(0);
    expect(log).toHaveBeenCalled();
  });

  it('should be empty if the spec is invalid', async () => {
    const log = jest.spyOn(console, 'log').mockReturnValue(undefined);
    const { debugElement } = await render(DashboardComponentOutletComponent, {
      providers: [provideDashboardComponents([ImageContainerComponent])],
      componentInputs: {
        spec: {
          type: 'ImageContainer',
          title: 'Incorrect tooltip type & missing imageUrl',
          tooltip: 123,
        },
      },
    });

    expect(debugElement.children.length).toEqual(0);
    expect(log).toHaveBeenCalled();
  });

  it('should replace the content of the component/directive with the dynamic content', async () => {
    const { debugElement } = await render(DashboardComponentOutletComponent, {
      providers: [provideDashboardComponents([ImageContainerComponent])],
      componentInputs: {
        spec: {
          type: 'ImageContainer',
          title: 'Test',
          tooltip: 'Test',
          imageUrl: '',
        },
      },
    });

    expect(debugElement.children.length).toEqual(1);
  });
});
