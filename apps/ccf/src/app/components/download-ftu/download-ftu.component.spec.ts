import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFtuComponent } from './download-ftu.component';
import { DownloadFtuModule } from './download-ftu.module';

import { Shallow } from 'shallow-render';
import { FtuVersionData } from './download-ftu';

describe('DownloadFtuComponent', () => {
  let shallow: Shallow<DownloadFtuComponent>;

  beforeEach(async () => {
    shallow = new Shallow(DownloadFtuComponent, DownloadFtuModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeDefined();
  });

  it('display metadata should be false', async () => {
    const { instance } = await shallow.render();
    expect(instance.displayMetadata).toBe(false);
  })

  it('should return an array of FtuVersionData', async () => {
    const ftuVersionData: FtuVersionData[] = []
    const { instance } = await shallow.render();
    instance['_data'] = ftuVersionData;
    const result = instance.data;
    expect(result).toEqual(ftuVersionData);
  })
});
