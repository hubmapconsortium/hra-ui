import { Rgb, hexToRgb } from '../models/color';

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

export function createColorGenerator(): () => Rgb {
  let index = 0;
  return () => {
    const color = COLORS[index];
    index = (index + 1) % COLORS.length;
    return color;
  };
}
