export type Rgb = [red: number, green: number, blue: number];

export function rgbToHex(rgb: Rgb): string {
  const channels = rgb.map((channel) => channel.toString(16).padStart(2, '0'));
  return `#${channels.join('')}`;
}

export function hexToRgb(hex: string): Rgb {
  const channels: number[] = [];
  for (let offset = 1; offset < hex.length; offset += 2) {
    channels.push(Number.parseInt(hex.slice(offset, offset + 2), 16));
  }

  return channels as Rgb;
}
