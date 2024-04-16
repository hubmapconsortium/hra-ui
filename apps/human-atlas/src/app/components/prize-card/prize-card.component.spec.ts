import { Shallow } from 'shallow-render';
import { PrizeCardComponent } from './prize-card.component';
import { PrizeCardModule } from './prize-card.module';

describe('PrizeCardComponent', () => {
  let shallow: Shallow<PrizeCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PrizeCardComponent, PrizeCardModule);
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
