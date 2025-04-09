import { render, screen } from '@testing-library/angular';
import { EmbeddedRuiComponent } from './embedded-rui.component';
import { IdLabelPair } from '@hra-api/ng-client';

const ORGAN_OPTIONS: IdLabelPair[] = [{ id: 'id-uri', label: 'heart' }];

class MockRui extends HTMLElement {
  organOptions?: string[];
  register?: (location: object) => void;
  cancelRegistration?: () => void;
}

describe('EmbeddedRuiComponent', () => {
  beforeAll(() => {
    customElements.define('ccf-rui', MockRui);
  });

  it('should create', async () => {
    const result = render(EmbeddedRuiComponent, { inputs: { supportedOrgans: ORGAN_OPTIONS } });
    await expect(result).resolves.toBeTruthy();
  });

  it('should set organOptions on ccf-rui element', async () => {
    const organsArrayResult = ['id-uri'];

    await render(EmbeddedRuiComponent, {
      inputs: { supportedOrgans: ORGAN_OPTIONS },
    });

    const ruiElement = screen.getByTestId('rui') as MockRui;
    expect(ruiElement.organOptions).toEqual(organsArrayResult);
  });

  it('should set register and cancelRegistration on ccf-rui element', async () => {
    const created = jest.fn();
    const closed = jest.fn();

    await render(EmbeddedRuiComponent, {
      inputs: { supportedOrgans: ORGAN_OPTIONS },
      on: {
        locationCreated: created,
        closed: closed,
      },
    });

    const ruiElement = screen.getByTestId('rui') as MockRui;

    expect(ruiElement.register).toBeDefined();
    ruiElement.register?.({});
    expect(created).toHaveBeenCalled();

    expect(ruiElement.cancelRegistration).toBeDefined();
    ruiElement.cancelRegistration?.();
    expect(closed).toHaveBeenCalled();
  });
});
