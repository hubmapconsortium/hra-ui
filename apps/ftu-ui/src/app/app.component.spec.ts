import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { dispatch, dispatch$, select$, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { mock } from 'jest-mock-extended';
import { of, Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent, filterUndefined } from './app.component';

jest.mock('@hra-ui/cdk/injectors');

describe('AppComponent', () => {
  const dialog = mock<MatDialog>();
  const postRef = mock<MatDialogRef<void>>({ afterClosed: () => of(undefined) });
  const dispatchSpy = jest.fn();

  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(dispatchSpy);
    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch$).mockReturnValue(jest.fn(() => of({})));
    jest.mocked(select$).mockReturnValue(of({}));
    dialog.open.mockReturnValue(postRef);

    shallow = new Shallow(AppComponent);
  });

  afterEach(() => jest.clearAllMocks());

  describe('filterUndefined utility function', () => {
    it('should filter out undefined values from observable', (done) => {
      const source = new Subject<string | undefined>();
      const results: string[] = [];

      source.pipe(filterUndefined()).subscribe({
        next: (value) => results.push(value),
        complete: () => {
          expect(results).toEqual(['value1', 'value2']);
          done();
        },
      });

      source.next(undefined);
      source.next('value1');
      source.next(undefined);
      source.next('value2');
      source.next(undefined);
      source.complete();
    });
  });

  describe('AppComponent', () => {
    it('should create test setup', () => {
      expect(shallow).toBeDefined();
      expect(dispatchSpy).toBeDefined();
    });
  });
});
