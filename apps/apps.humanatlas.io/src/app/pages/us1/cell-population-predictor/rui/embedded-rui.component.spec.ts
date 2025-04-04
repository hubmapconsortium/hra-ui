import { render, screen } from '@testing-library/angular';
import { EmbeddedRuiComponent } from './embedded-rui.component';
import { IdLabelPair } from '@hra-api/ng-client';

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
    const result = render(EmbeddedRuiComponent);
    await expect(result).resolves.toBeTruthy();
  });

  it('should set organOptions on ccf-rui element', async () => {
    const organOptions: IdLabelPair[] = [{ id: 'id-uri', label: 'heart' }];
    const organsArrayResult = ['id-uri'];

    await render(EmbeddedRuiComponent, {
      inputs: { supportedOrgans: organOptions },
    });

    const ruiElement = screen.getByTestId('rui') as MockRui;
    expect(ruiElement.organOptions).toEqual(organsArrayResult);
  });

  it('should set register and cancelRegistration on ccf-rui element', async () => {
    const created = jest.fn();
    const closed = jest.fn();

    await render(EmbeddedRuiComponent, {
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
