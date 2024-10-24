import { AnimationDriver } from '@angular/animations/browser';
import { MockAnimationDriver, MockAnimationPlayer } from '@angular/animations/browser/testing';
import { provideDesignSystem } from '@hra-ui/design-system';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { ExpansionPanelComponent } from './expansion-panel.component';

describe('ExpansionPanelComponent', () => {
  async function setup(options?: RenderComponentOptions<ExpansionPanelComponent>) {
    return render(ExpansionPanelComponent, {
      ...options,
      inputs: {
        title: 'Test Title',
        ...options?.inputs,
      },
      providers: [
        provideDesignSystem(),
        {
          provide: AnimationDriver,
          useClass: MockAnimationDriver,
        },
      ],
    });
  }

  it('should render the expansion panel', async () => {
    await setup();
    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
  });

  it('should set inert attribute on body element when animation starts', async () => {
    await setup();

    const button = screen.getByTestId('toggle');
    await userEvent.click(button);

    const player = MockAnimationDriver.log.pop() as MockAnimationPlayer;
    const element = player.element as HTMLElement;

    expect(element).toHaveAttribute('inert');
    player.finish();
    expect(element).not.toHaveAttribute('inert');
    expect(element.style.height).toBe('0px');
    expect(element.style.visibility).toBe('hidden');
  });
});
