import { AnyRole } from '../schemas/roles.schema';
import {
  formatTenureDateRanges,
  getTenureStreaks,
  hasProfileDetails,
  isCurrentRole,
  isRoleActiveInYear,
} from './person-roles';

const createMemberRole = (overrides: Partial<Extract<AnyRole, { type: 'member' }>> = {}) => ({
  type: 'member' as const,
  title: 'Research Assistant',
  dateStart: new Date(2020, 0, 1),
  dateEnd: new Date(2021, 11, 31),
  ...overrides,
});

describe('person role utilities', () => {
  it('should treat only an explicit null end date as current', () => {
    expect(isCurrentRole(createMemberRole({ dateEnd: null }))).toBe(true);
    expect(isCurrentRole(createMemberRole({ dateEnd: undefined }))).toBe(false);
    expect(isCurrentRole(createMemberRole())).toBe(false);
  });

  it('should format separate tenure streaks from most to least recent', () => {
    const roles: AnyRole[] = [
      createMemberRole({ dateStart: new Date(2023, 0, 1), dateEnd: new Date(2024, 3, 30) }),
      createMemberRole({ dateStart: new Date(2025, 3, 1), dateEnd: new Date(2026, 0, 31) }),
    ];

    expect(formatTenureDateRanges(roles)).toEqual(['Apr 2025–Jan 2026', 'Jan 2023–Apr 2024']);
  });

  it('should merge overlapping and consecutive roles into one streak', () => {
    const roles: AnyRole[] = [
      createMemberRole({ dateStart: new Date(2023, 0, 1), dateEnd: new Date(2024, 3, 30) }),
      createMemberRole({ dateStart: new Date(2024, 4, 1), dateEnd: new Date(2025, 0, 31) }),
      createMemberRole({ dateStart: new Date(2024, 10, 1), dateEnd: new Date(2026, 0, 31) }),
    ];

    expect(formatTenureDateRanges(roles)).toEqual(['Jan 2023–Jan 2026']);
    expect(getTenureStreaks(roles)).toHaveLength(1);
  });

  it('should distinguish current and unknown end dates', () => {
    expect(formatTenureDateRanges([createMemberRole({ dateEnd: null })])).toEqual(['Jan 2020–Current']);
    expect(formatTenureDateRanges([createMemberRole({ dateEnd: undefined })])).toEqual(['Jan 2020–Unknown']);
  });

  it('should not treat an unknown end date as active indefinitely', () => {
    const unknownEndRole = createMemberRole({ dateEnd: undefined });

    expect(isRoleActiveInYear(unknownEndRole, 2019)).toBe(false);
    expect(isRoleActiveInYear(unknownEndRole, 2020)).toBe(true);
    expect(isRoleActiveInYear(unknownEndRole, 2021)).toBe(false);
    expect(isRoleActiveInYear(createMemberRole({ dateEnd: null }), 2021)).toBe(true);
  });

  it('should merge an unknown role into a confirmed overlapping tenure streak', () => {
    const roles: AnyRole[] = [
      createMemberRole({ dateStart: new Date(2020, 0, 1), dateEnd: new Date(2022, 11, 31) }),
      createMemberRole({ dateStart: new Date(2020, 5, 1), dateEnd: undefined }),
      createMemberRole({ dateStart: new Date(2021, 0, 1), dateEnd: new Date(2021, 11, 31) }),
    ];

    expect(formatTenureDateRanges(roles)).toEqual(['Jan 2020–Unknown']);
  });

  it('should keep an unknown role separate when no overlap is confirmed', () => {
    const roles: AnyRole[] = [
      createMemberRole({ dateStart: new Date(2020, 0, 1), dateEnd: undefined }),
      createMemberRole({ dateStart: new Date(2022, 0, 1), dateEnd: new Date(2023, 11, 31) }),
    ];

    expect(formatTenureDateRanges(roles)).toEqual(['Jan 2022–Dec 2023', 'Jan 2020–Unknown']);
  });

  it('should require meaningful primary-role details beyond email', () => {
    expect(hasProfileDetails([createMemberRole({ email: 'person@example.org' })])).toBe(false);
    expect(hasProfileDetails([createMemberRole({ email: 'person@example.org', background: 'Biography' })])).toBe(true);
  });
});
