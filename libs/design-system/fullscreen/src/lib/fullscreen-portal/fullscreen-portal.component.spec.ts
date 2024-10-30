import { render, screen } from '@testing-library/angular';
import { FullscreenPortalComponent } from './fullscreen-portal.component';

describe('FullscreenComponent', () => {
  it('should open the dialog and render title', async () => {
    const opened = jest.fn();
    const { fixture } = await render(FullscreenPortalComponent, {
      inputs: {
        title: 'Test Title',
      },
      on: {
        opened: opened,
      },
    });
    const component = fixture.componentInstance;
    component.open();
    fixture.detectChanges();
    const title = await screen.findByText('Test Title');
    expect(title.textContent).toBe(' Test Title ');
  });
});
