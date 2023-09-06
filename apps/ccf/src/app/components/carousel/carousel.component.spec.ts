import { CarouselComponent } from './carousel.component';
import { CarouselModule } from './carousel.module';
import { Shallow } from 'shallow-render';

describe('CarouselComponent', () => {
  let shallow: Shallow<CarouselComponent>

  beforeEach(async () => {
    shallow = new Shallow(CarouselComponent, CarouselModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
