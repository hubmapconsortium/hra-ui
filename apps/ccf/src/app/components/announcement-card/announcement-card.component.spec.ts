import { Announcement } from './announcement-card';
import { AnnouncementCardComponent } from './announcement-card.component';
import { AnnouncementCardModule } from './announcement-card.module';
import { Shallow } from 'shallow-render';

describe('AnnouncementCardComponent', () => {
  const card: Announcement[] = [{
    message: 'Test Message'
  }]
  let shallow: Shallow<AnnouncementCardComponent>

  beforeEach(async () => {
    shallow = new Shallow(AnnouncementCardComponent, AnnouncementCardModule)
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { messages: card } })).resolves.toBeDefined();
  });
});