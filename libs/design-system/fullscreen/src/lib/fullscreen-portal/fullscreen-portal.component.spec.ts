import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { FullscreenPortalComponent } from './fullscreen-portal.component';

describe('FullscreenComponent', () => {
  async function setup(options?: RenderComponentOptions<FullscreenPortalComponent>) {
    return render(FullscreenPortalComponent, {
      ...options,
      providers: [provideNoopAnimations(), ...(options?.providers || [])],
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

  describe('with view transitions', () => {
    let startViewTransition: jest.Mock;

    /** Waits until the update callback of a view transition has finished */
    async function transitionDone(index: number): Promise<void> {
      await startViewTransition.mock.results[index].value.updateCallbackDone;
    }

    beforeEach(() => {
      startViewTransition = jest.fn((callback: () => Promise<void>) => ({ updateCallbackDone: callback() }));
      Object.defineProperty(document, 'startViewTransition', { configurable: true, value: startViewTransition });
    });

    afterEach(() => {
      delete (document as { startViewTransition?: unknown }).startViewTransition;
    });

    it('should open and close the dialog in view transitions', async () => {
      const opened = jest.fn();
      const closed = jest.fn();
      const { fixture } = await setup({ inputs: { viewTransition: true }, on: { opened, closed } });

      fixture.componentInstance.open();
      await transitionDone(0);
      expect(opened).toHaveBeenCalledTimes(1);

      fixture.componentInstance.close();
      await transitionDone(1);
      expect(closed).toHaveBeenCalledTimes(1);
      expect(startViewTransition).toHaveBeenCalledTimes(2);
    });

    it('should close the dialog in a view transition from the close button and the Escape key', async () => {
      const closed = jest.fn();
      const { fixture } = await setup({ inputs: { viewTransition: true }, on: { closed } });

      fixture.componentInstance.open();
      await transitionDone(0);
      (await screen.findByRole('button')).click();
      await transitionDone(1);
      expect(closed).toHaveBeenCalledTimes(1);

      fixture.componentInstance.open();
      await transitionDone(2);
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await transitionDone(3);
      expect(closed).toHaveBeenCalledTimes(2);
    });

    it('should not use view transitions unless enabled', async () => {
      const opened = jest.fn();
      const { fixture } = await setup({ on: { opened } });

      fixture.componentInstance.open();
      await fixture.whenStable();
      expect(opened).toHaveBeenCalledTimes(1);
      expect(startViewTransition).not.toHaveBeenCalled();
    });
  });

  it('should detach view from container when detach is called', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const viewOutlet = component['viewOutlet']();

    fixture.detectChanges();
    await fixture.whenStable();

    const viewContainerRef = viewOutlet['viewContainerRef'];
    const detachSpy = jest.spyOn(viewContainerRef, 'detach');

    viewOutlet.detach();

    expect(detachSpy).toHaveBeenCalledWith(expect.any(Number));
  });
});
