import { isAuxClick } from './event';

describe('isAuxClick(event)', () => {
  it('should return false for regular clicks', () => {
    expect(isAuxClick(new MouseEvent('', { button: 0 }))).toBeFalsy();
  });

  it('should return true for any click that is not the primary button or if a modifier key is pressed', () => {
    expect(isAuxClick(new MouseEvent('', { button: 1 }))).toBeTruthy();
    expect(isAuxClick(new MouseEvent('', { altKey: true }))).toBeTruthy();
    expect(isAuxClick(new MouseEvent('', { ctrlKey: true }))).toBeTruthy();
    expect(isAuxClick(new MouseEvent('', { metaKey: true }))).toBeTruthy();
    expect(isAuxClick(new MouseEvent('', { shiftKey: true }))).toBeTruthy();
  });
});
