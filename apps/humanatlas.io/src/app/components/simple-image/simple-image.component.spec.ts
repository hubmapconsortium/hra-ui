import { MatDialog } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';
import { SimpleImageComponent } from './simple-image.component';
import { SimpleImageModule } from './simple-image.module';
import { TemplateRef } from '@angular/core';
import { mock } from 'jest-mock-extended';

describe('SimpleImageComponent', () => {
  let shallow: Shallow<SimpleImageComponent>;

  beforeEach(() => {
    shallow = new Shallow(SimpleImageComponent, SimpleImageModule).mock(MatDialog, {
      open: () => {
        // Intentionally empty
      },
    });
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('openImageViewer(content)', () => {
    it('should open image modal', async () => {
      const { instance, inject } = await shallow.render({
        bind: { customModalClass: 'customClass' },
      });
      const dialog = inject(MatDialog);
      const template = mock<TemplateRef<unknown>>();

      instance.openImageViewer(template);
      expect(dialog.open).toHaveBeenCalledWith(template, {
        panelClass: ['custom-modal', 'customClass'],
      });
    });
  });
});
