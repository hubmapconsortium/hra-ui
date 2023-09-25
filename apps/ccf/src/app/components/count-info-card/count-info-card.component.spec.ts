import { CountInfoCardComponent } from './count-info-card.component';
import { CountInfoCardModule } from './count-info-card.module';
import { Shallow } from 'shallow-render';

describe('CountInfoCardComponent', () => {
  let shallow: Shallow<CountInfoCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CountInfoCardComponent, CountInfoCardModule)
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
