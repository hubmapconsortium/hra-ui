import { MatDialog } from '@angular/material/dialog';
import { OrganData } from './two-dim-image';
import { TwoDimImageComponent } from './two-dim-image.component';
import { TwoDimImageModule } from './two-dim-image.module';
import { Shallow } from 'shallow-render';
import { TemplateRef } from '@angular/core';
import { mock } from 'jest-mock-extended';
import { NgFor, NgIf } from '@angular/common';
import { FileDownloadService } from '../../services/file-download/file-download.service';

describe('TwoDimImageComponent', () => {
  let shallow: Shallow<TwoDimImageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TwoDimImageComponent, TwoDimImageModule)
      .withStructuralDirective(NgFor)
      .withStructuralDirective(NgIf)
      .mock(FileDownloadService, { download: jest.fn() })
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('openImageViewer()', () => {
    const testData: OrganData[] = [
      {
        name: 'test-organ',
        image: './test-organ.svg',
        tissueData: [
          {
            name: 'test-tissue',
            url: './test-tissue',
            image: './test-tissue.svg'
          }
        ]
      }
    ];
    const template = mock<TemplateRef<unknown>>();

    beforeEach(() => {
      shallow.mock(MatDialog, { open: () => { } });
    })

    it('should open image dialog when clicked', async () => {
      const { instance, inject } = await shallow.render();
      const dialog = inject(MatDialog)
      instance.openImageViewer(template);
      expect(dialog.open).toHaveBeenCalledWith(template, { panelClass: 'two-dim-image-modal' })
    });

    it('should not open the image dialog when screensize is small', async () => {
      const { instance, inject } = await shallow.render({ bind: { tissueData: testData } });
      const dialog = inject(MatDialog);

      document.documentElement.style.fontSize = '16px';
      window.innerWidth = 10;
      instance.openImageViewer(template);
      expect(dialog.open).not.toHaveBeenCalled();
    })
  });

  describe('downloadClick()', () => {
    it('should download the file', async () => {
      const testUrl = './abc.svg'
      const { instance, inject } = await shallow.render();
      const service = inject(FileDownloadService);
      const event = mock<Event>();

      instance.downloadClick(event, testUrl);

      expect(event.preventDefault).toHaveBeenCalledWith();
      expect(service.download).toHaveBeenCalledWith(testUrl);
    })
  })
});
