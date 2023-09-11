import { DownloadFtuComponent } from './download-ftu.component';
import { DownloadFtuModule } from './download-ftu.module';

import { ChooseVersion } from '../choose-version/choose-version';
import { Shallow } from 'shallow-render';
import { FtuVersionData } from './download-ftu';

describe('DownloadFtuComponent', () => {
  const testData: FtuVersionData[] = [
    { version: '1.0', rows: [] },
    {
      version: '2.0', rows: [
        {
          label: '',
          url: '',
          links: [],
          releaseVersion: '',
          dot: ''
        }
      ]
    },
  ];
  const testVersions: ChooseVersion[] = [
    { version: '1.0', release: '1' },
    { version: '2.0', release: '2' },
    { version: '3.0', release: '3' }
  ];

  let shallow: Shallow<DownloadFtuComponent>;

  beforeEach(async () => {
    shallow = new Shallow(DownloadFtuComponent, DownloadFtuModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeDefined();
  });

  it('display metadata should be false by default', async () => {
    const { instance } = await shallow.render();
    expect(instance.displayMetadata).toBe(false);
  })

  describe('.data [get/set]', () => {
    it('should update the selection when set', async () => {
      const { instance } = await shallow.render();
      const spy = spyOn(instance, 'updateSelection');
      instance.data = testData;
      expect(spy).toHaveBeenCalled();
    })
  });

  describe('.displayedColumns [get]', () => {
    it('should return additional columns when displayMetadata is true', async () => {
      const { instance } = await shallow.render({ bind: { displayMetadata: true } });
      expect(instance.displayedColumns).toEqual(['label', 'links', 'releaseVersion', 'digitalObjectType'])
    });
  })

  describe('updateSelection(selectedVersion?)', () => {
    it('should return early when versions or data are empty', async () => {
      const { instance } = await shallow.render();
      instance.updateSelection();
      expect(instance.selectedData.data).toEqual([]);
    });

    it('should update the current selection', async () => {
      const { instance } = await shallow.render({ bind: { data: testData, versions: testVersions } });
      instance.updateSelection(testVersions[1]);
      expect(instance.selectedData.data).toEqual(testData[1].rows);
    });

    it('should update the current selection when versions do not match', async () => {
      const { instance } = await shallow.render({ bind: { data: testData, versions: testVersions } });
      instance.updateSelection(testVersions[2]);
      expect(instance.selectedData.data).toEqual([]);
    });
  });
});
