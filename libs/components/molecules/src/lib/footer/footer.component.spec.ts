import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { Shallow } from 'shallow-render';
import { FooterComponent } from './footer.component';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { LinkDirective } from '@hra-ui/cdk';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined);
describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(() => {
    shallow = new Shallow(FooterComponent).dontMock(OverlayModule, MatListModule, LinkDirective);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
