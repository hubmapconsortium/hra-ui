import { AccessorContext, AccessorFunction, Color } from '@deck.gl/core/typed';
import { ColorMap } from '../../../models/color-map';
import { colorCategories } from '@deck.gl/carto/typed';

type Color2 = [r: number, g: number, b: number, a?: number];

const WHITE: Color2 = [255, 255, 255];

export function createColorAccessor<T>(
  accessor: AccessorFunction<T, string>,
  colorMap: ColorMap,
  defaultColor?: Color,
): AccessorFunction<T, Color> {
  let context: AccessorContext<T>;
  const coding = colorCategories<T>({
    attr: (obj) => accessor(obj, context),
    domain: colorMap.domain,
    colors: colorMap.range as Color2[],
    nullColor: (defaultColor ?? WHITE) as Color2,
    othersColor: (defaultColor ?? WHITE) as Color2,
  });

  return (obj, info) => {
    context = info;
    return coding(obj, info) as Color;
  };
}
