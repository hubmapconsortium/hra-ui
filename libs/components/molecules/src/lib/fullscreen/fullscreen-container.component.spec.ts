import { Shallow } from 'shallow-render';
import { FullscreenContentComponent } from './fullscreen-content.component';

import { FullscreenContainerComponent } from './fullscreen-container.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [FullscreenContentComponent],
  exports: [FullscreenContentComponent],
})
class FullscreenTestModule {}

describe('FullscreenContainerComponent', () => {
  let shallow: Shallow<FullscreenContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(FullscreenContainerComponent).import(FullscreenTestModule);
  });

  it('should create', async () => {
    const template = `
      <hra-fullscreen-container>
        Some content
        <hra-fullscreen-content>
          Other content
        </hra-fullscreen-content>
      </hra-fullscreen-container>
    `;
    await expect(shallow.render(template)).resolves.toBeDefined();
  });
});
