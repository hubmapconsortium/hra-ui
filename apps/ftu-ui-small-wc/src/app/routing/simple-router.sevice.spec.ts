import { TestBed } from '@angular/core/testing';
import { dispatch } from '@hra-ui/cdk/injectors';
import { NavigationLessRouter } from './simple-router.service';

jest.mock('@hra-ui/cdk/injectors');

describe('SimpleRouter', () => {
  let service: NavigationLessRouter;
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationLessRouter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    service.navigate([], { queryParams: { id: '' } });
    expect(dispatch).toHaveBeenCalled();
  });

  it('should be created without queryparams', () => {
    service.navigate([]);
    expect(dispatch).toHaveBeenCalled();
  });
});
