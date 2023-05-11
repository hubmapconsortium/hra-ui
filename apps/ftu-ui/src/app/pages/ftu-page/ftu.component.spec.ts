import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$ } from '@hra-ui/cdk/injectors';
import { EMPTY, of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { FtuComponent } from './ftu.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(injectDestroy$).mockReturnValue(EMPTY);
jest.mocked(dispatch).mockReturnValue(jest.fn());

describe('AppComponent', () => {
  let shallow: Shallow<FtuComponent>;

  beforeEach(() => {
    shallow = new Shallow(FtuComponent).mock(ActivatedRoute, { queryParams: of({ id: 'abc' }) });
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });
});
