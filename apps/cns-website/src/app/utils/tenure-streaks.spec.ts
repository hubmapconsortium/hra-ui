import { AnyRole } from '../schemas/roles.schema';
import { formatDateRange, mergeStreaks } from './tenure-streaks';

describe('tenure streaks', () => {
  function createRole(dateStart: Date, dateEnd: Date | null | undefined): AnyRole {
    return { type: 'member', title: 'Research Assistant', dateStart, dateEnd };
  }

  describe('mergeStreaks()', () => {
    it('should merge roles that overlap or start within 31 days of each other', () => {
      const roles = [
        createRole(new Date(2020, 0, 1), new Date(2023, 9, 1)),
        createRole(new Date(2023, 10, 1), new Date(2024, 5, 30)),
        createRole(new Date(2024, 0, 1), new Date(2024, 11, 31)),
      ];

      expect(mergeStreaks(roles)).toEqual([{ dateStart: new Date(2020, 0, 1), dateEnd: new Date(2024, 11, 31) }]);
    });

    it('should split roles that start more than 31 days apart', () => {
      const roles = [
        createRole(new Date(2020, 0, 1), new Date(2023, 9, 1)),
        createRole(new Date(2023, 10, 2), new Date(2024, 5, 30)),
      ];

      expect(mergeStreaks(roles)).toEqual([
        { dateStart: new Date(2020, 0, 1), dateEnd: new Date(2023, 9, 1) },
        { dateStart: new Date(2023, 10, 2), dateEnd: new Date(2024, 5, 30) },
      ]);
    });

    it('should keep a streak ongoing when any of its roles is ongoing', () => {
      const roles = [
        createRole(new Date(2015, 7, 24), new Date(2021, 6, 30)),
        createRole(new Date(2021, 7, 2), null),
        createRole(new Date(2022, 0, 1), new Date(2023, 0, 1)),
      ];

      expect(mergeStreaks(roles)).toEqual([{ dateStart: new Date(2015, 7, 24), dateEnd: null }]);
    });

    it('should end a streak at a role with an unknown end date', () => {
      const roles = [
        createRole(new Date(2022, 0, 1), new Date(2022, 11, 31)),
        createRole(new Date(2023, 0, 1), undefined),
        createRole(new Date(2023, 1, 1), new Date(2023, 11, 31)),
      ];

      expect(mergeStreaks(roles)).toEqual([
        { dateStart: new Date(2022, 0, 1), dateEnd: undefined },
        { dateStart: new Date(2023, 1, 1), dateEnd: new Date(2023, 11, 31) },
      ]);
    });
  });

  describe('formatDateRange()', () => {
    it('should format a completed range as months and years', () => {
      expect(formatDateRange({ dateStart: new Date(2020, 0, 1), dateEnd: new Date(2024, 11, 31) })).toBe(
        'Jan 2020–Dec 2024',
      );
    });

    it('should format an ongoing range as present', () => {
      expect(formatDateRange({ dateStart: new Date(2020, 0, 1), dateEnd: null })).toBe('Jan 2020–Present');
    });

    it('should format a range with an unknown end date as unknown', () => {
      expect(formatDateRange({ dateStart: new Date(2020, 0, 1), dateEnd: undefined })).toBe('Jan 2020–Unknown');
    });
  });
});
