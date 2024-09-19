import { Rgb, hexToRgb } from '@hra-ui/design-system/color-picker';

/** Array of predefined colors in RGB format */
const COLORS: Rgb[] = [
  hexToRgb('#70A5A8'),
  hexToRgb('#CD8490'),
  hexToRgb('#7495AE'),
  hexToRgb('#AADCDF'),
  hexToRgb('#E9E4F3'),
  hexToRgb('#D6B6D7'),
  hexToRgb('#E97B74'),
  hexToRgb('#BAD2E7'),
  hexToRgb('#8DC599'),
  hexToRgb('#F9CE8D'),
  hexToRgb('#EDB8AC'),
  hexToRgb('#A295C9'),
  hexToRgb('#A1ACD2'),
  hexToRgb('#637597'),
];

/**
 * Creates a generator function that cycles through a predefined list of colors.
 *
 * @returns A function that returns the next color in the list.
 */
export function createColorGenerator(): () => Rgb {
  let index = 0;
  return () => {
    const color = COLORS[index];
    index = (index + 1) % COLORS.length;
    return color;
  };
}
