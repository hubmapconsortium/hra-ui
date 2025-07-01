import { Shallow } from 'shallow-render';
import { FullscreenContentComponent } from './fullscreen-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';

describe('FullscreenContentComponent', () => {
  TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule],
  });
  let shallow: Shallow<FullscreenContentComponent>;
  beforeEach(() => {
    shallow = new Shallow(FullscreenContentComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
