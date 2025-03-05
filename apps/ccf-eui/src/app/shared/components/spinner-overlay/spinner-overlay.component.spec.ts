import { Shallow } from 'shallow-render';

import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { SpinnerOverlayModule } from './spinner-overlay.module';

describe('SpinnerOverlayComponent', () => {
  let shallow: Shallow<SpinnerOverlayComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpinnerOverlayComponent, SpinnerOverlayModule);
  });

  it('is invisible when not active', async () => {
    const { element } = await shallow.render({ bind: { active: false } });
    expect((element.nativeElement as Element).classList.contains('active')).toBeFalsy();
  });

  it('is visible when active', async () => {
    const { element } = await shallow.render({ bind: { active: true } });
    expect((element.nativeElement as Element).classList.contains('active')).toBeTruthy();
  });

  it('contains a text description', async () => {
    const { find } = await shallow.render({ bind: { text: 'Test' } });
    const content = (find('.content')?.nativeElement as HTMLElement)?.innerHTML;
    expect(content).toEqual('Test');
  });
});
