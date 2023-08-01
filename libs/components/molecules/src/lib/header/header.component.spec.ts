import { Shallow } from 'shallow-render';

import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { HeaderComponent } from './header.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;
  beforeEach(() => {
    shallow = new Shallow(HeaderComponent).dontMock(LinkDirective);
  });

  it('renders images correctly', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
