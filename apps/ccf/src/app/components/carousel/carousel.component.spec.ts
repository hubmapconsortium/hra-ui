import { Shallow } from 'shallow-render';
import { CarouselComponent } from './carousel.component';
import { CarouselModule } from './carousel.module';

describe('CarouselComponent', () => {
  let shallow: Shallow<CarouselComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CarouselComponent, CarouselModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
