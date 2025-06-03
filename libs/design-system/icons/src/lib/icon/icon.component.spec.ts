import {} from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { FakeMatIconRegistry, IconType, MatIconHarness } from '@angular/material/icon/testing';
import { render } from '@testing-library/angular';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  const providers: Provider[] = [
    {
      provide: MatIconRegistry,
      useClass: FakeMatIconRegistry,
    },
  ];

  it('should create', async () => {
    const component = await render(IconComponent, {
      providers,
      componentInputs: {
        icon: { fontIcon: 'arrow_left_alt' },
      },
    });

    expect(component).toBeTruthy();
  });

  it('should render svg icon', async () => {
    const { fixture } = await render(IconComponent, {
      providers,
      componentInputs: {
        svgIcon: 'product:ftu',
      },
    });
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const harness = await loader.getHarness(MatIconHarness);
    const type = await harness.getType();
    expect(type).toBe(IconType.SVG);
  });
});
