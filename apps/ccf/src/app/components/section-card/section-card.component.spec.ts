import { SectionCardComponent } from './section-card.component';
import { SectionCardModule } from './section-card.module';

import { Shallow } from 'shallow-render';
import { SectionCardItems } from './section-card-items';

describe('SectionCardComponent', () => {
  const cards: SectionCardItems[] = [
    {
      title: 'Test title',
      description: 'Test description',
      image: 'Test Image',
      gif: 'Test Gif',
      route: 'Test route'
    }
  ]
  let shallow: Shallow<SectionCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SectionCardComponent, SectionCardModule)
  });

  it('should create', async () => { 
    await expect(shallow.render({ bind: { cards: cards } })).resolves.toBeTruthy();
    // const { instance, outputs } = await shallow.render({ bind: { cards: cards } })
    // expect(instance.cards).toBeDefined();
    // expect(outputs.cardRoutes.emit).toBeCalled()
  });
});
