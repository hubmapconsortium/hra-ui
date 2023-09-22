import { MatDialog } from '@angular/material/dialog';
import { OrganData } from './two-dim-image';
import { TwoDimImageComponent } from './two-dim-image.component';
import { TwoDimImageModule } from './two-dim-image.module';
import { Shallow } from 'shallow-render';
import { ElementRef, TemplateRef } from '@angular/core';
import { mock } from 'jest-mock-extended';

describe('TwoDimImageComponent', () => {
  let shallow: Shallow<TwoDimImageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TwoDimImageComponent, TwoDimImageModule)
  });

  it('should create', async () => {
    const testTissueData: OrganData[] = [
      {
        name: 'test',
        image: 'testImage',
        tissueData: []
      }
    ]
    const { instance } = await shallow.render({ bind: { tissueData: testTissueData } })
    expect(instance.tissueData).toEqual(testTissueData);
  });

  describe('openImageViewer()', () => {
    beforeEach(() => {
      shallow.mock(MatDialog, { open: () => { } });
    })
    it('should open image dialog when clicked', async () => {
      const { instance, inject } = await shallow.render();
      const dialog = inject(MatDialog)
      const template = mock<TemplateRef<unknown>>();
      instance.openImageViewer(template);
      expect(dialog.open).toHaveBeenCalledWith(template, { panelClass: 'two-dim-image-modal' })
    });

    it('should not open the image dialog when screensize is small', async () => {
      // const smallScreenSize = 60;
      // const { instance } = await shallow.render();
      // const spy = jest.spyOn(instance.imageRef.nativeElement, 'onclick');
      // const template = mock<TemplateRef<unknown>>();
      // const element = mock<ElementRef<unknown>>();
      // instance.imageRef = element;
      // instance.openImageViewer(template);
      // expect(instance.imageRef.nativeElement.onclick).toBeNull();
    })

  })
});
