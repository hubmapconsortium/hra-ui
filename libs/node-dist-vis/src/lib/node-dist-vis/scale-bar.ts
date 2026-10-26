import { computed, Signal } from '@angular/core';
import { NodesView } from '@hra-ui/node-dist-vis/models';

/** Scale bar shown in the bottom right corner of the visualization */
export interface ScaleBar {
  /** Bar width in css pixels */
  width: number;
  /** Length the bar stands for, for example "100µm" */
  label: string;
}

/** Preferred bar width in css pixels. The bar snaps to the closest round length, so it ends up 51-126px wide */
const PREFERRED_WIDTH = 80;

/** Round lengths the bar snaps to, as multiples of a power of ten */
const ROUND_STEPS = [1, 2, 5];

/** Label units with their size in micrometers, from largest to smallest */
const UNITS: [symbol: string, micrometers: number][] = [
  ['mm', 1000],
  ['µm', 1],
  ['nm', 0.001],
];

/**
 * Finds the round length (1, 2, or 5 times a power of ten) closest to a length
 *
 * @param length Length to round
 * @returns The closest round length
 */
export function roundLength(length: number): number {
  const exponent = Math.floor(Math.log10(length));
  let closest = length;
  let closestDistance = Infinity;
  for (const power of [exponent, exponent + 1]) {
    for (const step of ROUND_STEPS) {
      const candidate = Number((step * 10 ** power).toPrecision(12));
      const distance = Math.abs(Math.log(candidate / length));
      if (distance < closestDistance) {
        closest = candidate;
        closestDistance = distance;
      }
    }
  }

  return closest;
}

/**
 * Formats a length in the largest unit that keeps it at 1 or more, like the design's "1mm"
 *
 * @param micrometers Length in micrometers
 * @returns The formatted length
 */
export function formatLength(micrometers: number): string {
  const [symbol, size] = UNITS.find(([, unitSize]) => micrometers >= unitSize) ?? UNITS[UNITS.length - 1];
  return `${Number((micrometers / size).toPrecision(12))}${symbol}`;
}

/**
 * Create the scale bar for the current zoom. Node positions are in micrometers and scaled so the nodes'
 * full extent spans one world unit, and the orbit view draws one world unit as 2^zoom pixels at its target.
 * When the view is rotated, the bar measures distances at the target, where the view rotates around.
 *
 * @param nodes Nodes view
 * @param viewState Current state of deckgl
 * @returns The scale bar, or undefined when there are no nodes to measure
 */
export function createScaleBar(nodes: Signal<NodesView>, viewState: Signal<object>): Signal<ScaleBar | undefined> {
  return computed(() => {
    const view = nodes();
    const { zoom } = viewState() as { zoom?: number };
    const micrometersPerPixel = view.getScale() / 2 ** (zoom ?? 0);
    if (view.length === 0 || !Number.isFinite(micrometersPerPixel) || micrometersPerPixel <= 0) {
      return undefined;
    }

    const length = roundLength(PREFERRED_WIDTH * micrometersPerPixel);
    return { width: length / micrometersPerPixel, label: formatLength(length) };
  });
}

/**
 * Draws the scale bar onto an exported image of the canvas, in the same place and style as on screen
 *
 * @param context Context of the exported image, the same size as the canvas' drawing buffer
 * @param canvas Visualization canvas
 * @param bar Scale bar element
 * @param label Scale bar label element
 */
export function drawScaleBar(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  bar: HTMLElement,
  label: HTMLElement,
): void {
  const bounds = canvas.getBoundingClientRect();
  if (bounds.width === 0) {
    return;
  }

  const ratio = canvas.width / bounds.width;
  const toImage = (rect: DOMRect) => ({
    x: (rect.left - bounds.left) * ratio,
    y: (rect.top - bounds.top) * ratio,
    width: rect.width * ratio,
    height: rect.height * ratio,
  });

  const barRect = toImage(bar.getBoundingClientRect());
  context.fillStyle = getComputedStyle(bar).backgroundColor;
  context.fillRect(barRect.x, barRect.y, barRect.width, barRect.height);

  const labelStyle = getComputedStyle(label);
  const labelRect = toImage(label.getBoundingClientRect());
  context.font = `${labelStyle.fontWeight} ${parseFloat(labelStyle.fontSize) * ratio}px ${labelStyle.fontFamily}`;
  context.letterSpacing = `${(parseFloat(labelStyle.letterSpacing) || 0) * ratio}px`;
  context.fillStyle = labelStyle.color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(
    label.textContent?.trim() ?? '',
    labelRect.x + labelRect.width / 2,
    labelRect.y + labelRect.height / 2,
  );
}
