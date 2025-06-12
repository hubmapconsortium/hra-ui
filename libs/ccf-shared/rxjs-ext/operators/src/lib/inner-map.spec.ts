import { TestScheduler } from 'rxjs/testing';

import { innerMap } from './inner-map';

describe('innerMap(project)', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('calls the project callback on each element of emitted arrays', () =>
    scheduler.run((helpers) => {
      const { cold, flush } = helpers;
      const arrays = { a: [1, 2], b: [3, 4] };
      const project = jest.fn<unknown, [number, number, number]>();
      const source = cold('ab|', arrays).pipe(innerMap(project));

      source.subscribe();
      flush();

      expect(project).toHaveBeenCalledTimes(4);
      expect(project.mock.calls).toEqual([
        [1, 0, 0],
        [2, 1, 0],
        [3, 0, 1],
        [4, 1, 1],
      ]);
    }));

  it('emits new arrays with the results of the project callback', () =>
    scheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const arrays = { a: [1, 2], b: [3, 4] };
      const project = (val: number) => val + 1;
      const source = cold('ab|', arrays).pipe(innerMap(project));
      const result = { a: [2, 3], b: [4, 5] };

      expectObservable(source).toBe('ab|', result);
    }));
});
