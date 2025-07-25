import { Immutable } from '@angular-ru/cdk/typings';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/** Color */
export interface Color {
  /** Hex string */
  color: string;
  /** Rgba tuple */
  rgba: [number, number, number, number];
  /** Rank */
  rank: number;
}

/** Default palette */
export const DEFAULT_COLOR_PALETTE: Color[] = [
  '#FF8800',
  '#2979ff',
  '#ffd740',
  '#b92dff',
  '#da326f',
  '#7323e2',
  '#acf32b',
  '#82B1FF',
  '#E040FB',
  '#00E5FF',
].map((color, rank) => {
  const rgba: Color['rgba'] = [0, 0, 0, 255];
  for (let index = 0; index < 3; index++) {
    const start = 2 * index + 1;
    rgba[index] = Number.parseInt(color.slice(start, start + 2), 16);
  }
  return { color, rgba, rank };
});

/** State model */
export interface ColorAssignmentStateModel {
  /** Color palette */
  colorPalette: Color[];
  /** Available colors */
  colorsAvailable: Color[];
  /** Assignments */
  colorAssignments: Record<string, Color>;
  /** Assignment list */
  colorAssignmentsList: { color: Color; key: string }[];
}

/**
 * Color Assignment State
 */
@StateRepository()
@State<ColorAssignmentStateModel>({
  name: 'colors',
  defaults: {
    colorPalette: DEFAULT_COLOR_PALETTE.concat(),
    colorsAvailable: DEFAULT_COLOR_PALETTE.concat(),
    colorAssignments: {},
    colorAssignmentsList: [],
  },
})
@Injectable()
export class ColorAssignmentState extends NgxsImmutableDataRepository<ColorAssignmentStateModel> {
  /** When a color is forcefully unassigned */
  private readonly forcedUnassignment = new Subject<void>();

  /** When a color is forcefully unassigned */
  readonly forcedUnassignment$ = this.forcedUnassignment.asObservable();
  /** Color assignments */
  readonly colorAssignments$ = this.state$.pipe(
    map((x) => x?.colorAssignments),
    distinctUntilChanged(),
  );
  /** Color assignment list */
  readonly colorAssignmentsList$ = this.state$.pipe(
    map((x) => x?.colorAssignmentsList),
    distinctUntilChanged(),
  );

  /** Get the color for a key */
  getColor(key: string): Immutable<Color> | undefined {
    const { colorAssignments } = this.snapshot;
    return colorAssignments[key];
  }

  /** Assign a color for a key */
  @DataAction()
  assignColor(@Payload('key') key: string, @Payload('doReset') doReset = false): Immutable<Color> {
    let { colorAssignments, colorAssignmentsList, colorsAvailable } = this.snapshot;
    if (doReset) {
      colorsAvailable = this.snapshot.colorPalette.concat();
      colorAssignmentsList = [];
      colorAssignments = {};
    }
    let color = colorAssignments[key];
    if (!color) {
      if (colorsAvailable.length > 0) {
        color = colorsAvailable[0];
      } else {
        color = colorAssignmentsList[colorAssignmentsList.length - 1].color;
        colorAssignmentsList = colorAssignmentsList.slice(0, -1);
        this.forcedUnassignment.next();
      }
      colorsAvailable = colorsAvailable.filter((c) => c.color !== color.color);
      colorAssignmentsList = [{ color, key }].concat(colorAssignmentsList);
      colorAssignments = colorAssignmentsList.reduce<Record<string, Immutable<Color>>>((acc, item, rank) => {
        acc[item.key] = { ...item.color, rank };
        return acc;
      }, {});

      this.ctx.patchState({
        colorsAvailable,
        colorAssignments,
        colorAssignmentsList,
      });
    }
    return color;
  }

  /** Unassigns a color for a key */
  @DataAction()
  unassignColor(@Payload('key') key: string): void {
    let { colorAssignments, colorAssignmentsList, colorsAvailable } = this.snapshot;
    const color = colorAssignments[key];
    if (color) {
      colorsAvailable = [color].concat(colorsAvailable);
      colorAssignmentsList = colorAssignmentsList.filter((a) => a.color.color !== color.color);
      colorAssignments = colorAssignmentsList.reduce<Record<string, Immutable<Color>>>((acc, item, rank) => {
        acc[item.key] = { ...item.color, rank };
        return acc;
      }, {});

      this.ctx.patchState({
        colorsAvailable,
        colorAssignments,
        colorAssignmentsList,
      });
    }
  }
}
