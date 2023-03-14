import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { Shallow } from 'shallow-render';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(() => {
    shallow = new Shallow(FooterComponent).dontMock(OverlayModule, MatListModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
