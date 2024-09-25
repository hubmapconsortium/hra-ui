import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import { BodyUiComponent } from './body-ui.component';

jest.mock('../body-ui.ts', () => ({
  BodyUI: jest.fn().mockImplementation(() => ({
    deck: {
      setProps: jest.fn(),
      finalize: jest.fn(),
    },
    initialize: jest.fn().mockResolvedValue(undefined),
    finalize: jest.fn(),
    setScene: jest.fn(),
    nodeClick$: { pipe: jest.fn().mockReturnThis(), subscribe: jest.fn() },
    nodeHoverStart$: { pipe: jest.fn().mockReturnThis(), subscribe: jest.fn() },
    nodeHoverStop$: { pipe: jest.fn().mockReturnThis(), subscribe: jest.fn() },
    sceneRotation$: { pipe: jest.fn().mockReturnThis(), subscribe: jest.fn() },
    nodeDrag$: { pipe: jest.fn().mockReturnThis(), subscribe: jest.fn() },
  })),
}));

describe('BodyUiComponent', () => {
  it('should render a canvas element', async () => {
    await render(BodyUiComponent, {
      providers: [provideHttpClient()],
    });

    const canvasElement = screen.getByRole('img');

    expect(canvasElement).toBeTruthy();
    expect(canvasElement.tagName.toLowerCase()).toBe('canvas');
  });
});
