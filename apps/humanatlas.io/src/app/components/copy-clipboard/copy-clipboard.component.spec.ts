import { NgFor } from '@angular/common';
import { CopyClipboardComponent } from './copy-clipboard.component';
import { CopyClipboardModule } from './copy-clipboard.module';
import { Clipboard } from '@angular/cdk/clipboard';
import { Shallow } from 'shallow-render';

describe('ContactCardComponent', () => {
  let shallow: Shallow<CopyClipboardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CopyClipboardComponent, CopyClipboardModule)
      .mock(Clipboard, {
        copy: jest.fn(),
      })
      .withStructuralDirective(NgFor);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('copyData()', () => {
    it('should copy the data to the clipboard', async () => {
      const { instance, inject } = await shallow.render();
      const clipboard = inject(Clipboard);
      instance.copyData('GET: test');
      expect(clipboard.copy).toHaveBeenCalledWith('test');
    });
  });
});
