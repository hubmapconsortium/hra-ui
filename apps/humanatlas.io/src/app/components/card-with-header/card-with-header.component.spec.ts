import { CardWithHeaderComponent } from './card-with-header.component';
import { CardWithHeaderModule } from './card-with-header.module';
import { Shallow } from 'shallow-render';

describe('CardWithHeaderComponent', () => {
  let shallow: Shallow<CardWithHeaderComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CardWithHeaderComponent, CardWithHeaderModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
