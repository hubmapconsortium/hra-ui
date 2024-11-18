import { colorCategories } from '@deck.gl/carto/typed';
import { AccessorContext, AccessorFunction, Color } from '@deck.gl/core/typed';
import { ColorMap } from '@hra-ui/node-dist-vis/models';

/** Color format expected by `colorCategories` */
type Color2 = [r: number, g: number, b: number, a?: number];

/** Color used if no default is provided */
const WHITE: Color2 = [255, 255, 255];

/**
 * Create a color accessor
 *
 * @param accessor Domain value accessor
 * @param colorMap Color map
 * @param defaultColor Default color
 * @returns An accessor
 */
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
