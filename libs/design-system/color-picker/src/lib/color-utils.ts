/** Type representing an RGB color as a tuple of three numbers */
export type Rgb = [red: number, green: number, blue: number];

/** Converts an RGB color to its hexadecimal string representation */
export function rgbToHex(rgb: Rgb): string {
  const channels = rgb.map((channel) => channel.toString(16).padStart(2, '0'));
  return `#${channels.join('')}`;
}

/** Converts a hexadecimal color string to an RGB color */
export function hexToRgb(hex: string): Rgb {
  const channels: number[] = [];
  for (let offset = 1; offset < hex.length; offset += 2) {
    channels.push(Number.parseInt(hex.slice(offset, offset + 2), 16));
  }

  return channels as Rgb;
}

/** Compares two RGB colors for equality */
export function colorEquals(color1: Rgb, color2: Rgb): boolean {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  return r1 === r2 && g1 === g2 && b1 === b2;
}
