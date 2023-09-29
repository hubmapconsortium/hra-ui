import { YoutubeModel } from './youtube-model';
import { YoutubeModelComponent } from './youtube-model.component';
import { YoutubeModelModule } from './youtube-model.module';
import { Shallow } from 'shallow-render';

describe('SopLinksComponent', () => {
  const testPlayerData: YoutubeModel = {
    height: 12,
    width: 12,
    title: 'testTitle',
    videoId: 'testVideoId',
    playerTitle: 'testPlayerTitle'
  }
  let shallow: Shallow<YoutubeModelComponent>;

  beforeEach(async () => {
    shallow = new Shallow(YoutubeModelComponent, YoutubeModelModule)
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { playerData: testPlayerData } })).resolves.toBeDefined();
  });

  describe('onResize()', () => {
    it('should call playerSize method', async () => {
      const { instance } = await shallow.render({ bind: { playerData: testPlayerData } });
      const spy = jest.spyOn(instance, 'playerSize')
      instance.onResize();
      expect(spy).toHaveBeenCalled()
    })
  })
});
