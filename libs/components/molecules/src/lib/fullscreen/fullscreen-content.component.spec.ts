import { Shallow } from 'shallow-render';
import { FullscreenContentComponent } from './fullscreen-content.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FullscreenContentComponent', () => {
  let shallow: Shallow<FullscreenContentComponent>;
  beforeEach(() => {
    shallow = new Shallow(FullscreenContentComponent).dontMock(BrowserModule, BrowserAnimationsModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
