import { Component, Input } from '@angular/core';
import { Shallow } from 'shallow-render';
import { FullscreenContainerComponent } from './fullscreen-container.component';
import { FullscreenContentComponent } from './fullscreen-content.component';

@Component({
  selector: 'hra-test',
  standalone: true,
  imports: [FullscreenContainerComponent, FullscreenContentComponent],
  template: `
    <hra-fullscreen-container [fullscreen]="fullscreen">
      Some content
      <hra-fullscreen-content> Other content </hra-fullscreen-content>
    </hra-fullscreen-container>
  `,
})
class TestComponent {
  @Input() fullscreen = false;
}

describe('FullscreenContainerComponent', () => {
  let shallow: Shallow<TestComponent>;

  beforeEach(() => {
    shallow = new Shallow(TestComponent).dontMock(FullscreenContainerComponent, FullscreenContentComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should update fullscreen mode of child components', async () => {
    const { findComponent } = await shallow.render({ bind: { fullscreen: true } });
    const child = findComponent(FullscreenContentComponent);
    expect(child).toHaveFoundOne();
    expect(child.isFullScreen).toBeTruthy();
  });
});
