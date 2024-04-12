import { computed, Injectable, signal } from '@angular/core';
import { parse } from 'papaparse';
import { z } from 'zod';

export interface MetadataSelectOption {
  value: string;
  viewValue: string;
}

export interface CellTypeTableData {
  x: number;
  y: number;
  cellType: string;
  z?: number;
  ontologyId?: string;
}

type CsvType = 'data' | 'colormap';

const DEFAULT_COLOR_MAP: ColorMap = { default: [1, 2, 3] };

const CELL_TYPE_DATA = z
  .object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
    Cell_Type: z.string(),
    Ontology_ID: z.string().optional(),
  })
  .array();

type CellTypeData = z.infer<typeof CELL_TYPE_DATA>;

const COLOR_MAP_DATA = z
  .object({
    cell: z.string(),
    R: z.number(),
    G: z.number(),
    B: z.number(),
  })
  .array();

type ColorMapData = z.infer<typeof COLOR_MAP_DATA>;

type ColorMap = Record<string, [number, number, number]>;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  data = signal<CellTypeTableData[]>([]);
  colorMap = signal<ColorMap>(DEFAULT_COLOR_MAP);
  defaultType = signal<string | undefined>(undefined);
  readonly anchorTypes = computed<MetadataSelectOption[]>(() => {
    const initialValues = this.data().map((result) => {
      return {
        value: result.cellType,
        viewValue: result.cellType
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      };
    });
    return this.setDefaultCellType(initialValues, this.defaultType());
  });

  async load(file: File, type: CsvType, defaultType: string) {
    parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (r) => {
        if (type === 'data') {
          this.data.set(this.getCellTypeData(r.data as CellTypeData));
          this.defaultType.set(defaultType);
        } else {
          this.colorMap.set(this.getColorMap(r.data as ColorMapData));
        }
      },
    });
  }

  setDefaultCellType(initialValues: MetadataSelectOption[], defaultType?: string): MetadataSelectOption[] {
    const defaultCellTypeOption = initialValues.find((celltype) => celltype.value === defaultType);
    if (defaultCellTypeOption) {
      return initialValues.map((option) =>
        option.value === defaultType ? { ...option, viewValue: `Default: ${defaultCellTypeOption.viewValue}` } : option,
      );
    } else {
      return initialValues;
    }
  }

  getCellTypeData(cellTypeData: CellTypeData): CellTypeTableData[] {
    return cellTypeData.map((row) => {
      return {
        x: row.x,
        y: row.y,
        z: row.z,
        cellType: row.Cell_Type,
        ontologyId: row.Ontology_ID,
      };
    });
  }

  getColorMap(colorMapData: ColorMapData): ColorMap {
    const result: ColorMap = {};
    colorMapData.forEach((row) => {
      result[row.cell] = [row.R, row.G, row.B];
    });
    return result;
  }

  remove(type: CsvType): void {
    if (type === 'data') {
      this.data.set([]);
    } else {
      this.colorMap.set({});
    }
  }

  useDefaultColors(): void {
    this.colorMap.set(DEFAULT_COLOR_MAP);
  }
}
