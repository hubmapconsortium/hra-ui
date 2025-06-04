import { coerceIconList } from './coercion';

describe('coerceIconList', () => {
  it('should return the empty array for undefined inputs', () => {
    expect(coerceIconList(undefined)).toEqual([]);
  });

  it('should coerce non-arrays value into an array of a single value', () => {
    expect(coerceIconList('icon')).toHaveLength(1);
  });

  it('should convert values into icon content template objects', () => {
    const input = ['custom', { fontIcon: 'arrow' }];
    expect(coerceIconList(input)).toEqual([
      {
        component: 'Icon',
        svgIcon: 'custom',
      },
      {
        component: 'Icon',
        fontIcon: 'arrow',
      },
    ]);
  });
});
