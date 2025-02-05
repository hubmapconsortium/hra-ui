import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { FullscreenPortalComponent } from './fullscreen-portal.component';

describe('FullscreenComponent', () => {
  async function setup(options?: RenderComponentOptions<FullscreenPortalComponent>) {
    return render(FullscreenPortalComponent, {
      ...options,
      inputs: {
        tagline: 'Test Title',
        ...options?.inputs,
      },
    });
  }

  it('should open the dialog and render title', async () => {
    const opened = jest.fn();
    const { fixture } = await setup({ inputs: { panelClass: 'test' }, on: { opened } });
    fixture.componentInstance.open();
    await fixture.whenStable();
    const title = await screen.findByText('Test Title');
    expect(title.textContent).toBe(' Test Title ');
  });

  it('should not open the dialog twice', async () => {
    const opened = jest.fn();
    const { fixture } = await setup({ on: { opened } });
    fixture.componentInstance.open();
    fixture.componentInstance.open();
    await fixture.whenStable();

    expect(opened).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog', async () => {
    const beforeClosed = jest.fn();
    const closed = jest.fn();
    const { fixture } = await setup({ on: { beforeClosed, closed } });

    fixture.componentInstance.open();
    await fixture.whenStable();
    fixture.componentInstance.close();
    await fixture.whenStable();

    expect(beforeClosed).toHaveBeenCalledTimes(1);
    expect(closed).toHaveBeenCalledTimes(1);
  });
});
