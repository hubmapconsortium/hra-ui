import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { dispatch } from '@hra-ui/cdk/injectors';
import { mock } from 'jest-mock-extended';
import { ftuResolver } from './ftu.resolver';
import { EMPTY, of } from 'rxjs';

jest.mock('@hra-ui/cdk/injectors');

const route = mock<ActivatedRouteSnapshot>({
  queryParamMap: {
    get: () => null,
  },
});
const snapshot = mock<RouterStateSnapshot>();
describe('ftuResolver', () => {
  beforeEach(() => {
    jest.mocked(dispatch).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty observable if id param is null', () => {
    expect(ftuResolver(route, snapshot)).toEqual(EMPTY);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should not navigate if id present', () => {
    const routeWithId = mock<ActivatedRouteSnapshot>({
      queryParamMap: {
        get: () => 'home',
      },
    });
    ftuResolver(routeWithId, snapshot);
  });
});
