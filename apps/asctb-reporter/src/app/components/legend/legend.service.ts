import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BMNode } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { CompareData, PROTEIN_PRESENCE } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';

@Injectable({
  providedIn: 'root',
})
export class LegendService {
  private readonly legendData = new Subject<Legend[]>();
  readonly legendData$ = this.legendData.asObservable();

  makeLegendData(treeData: TNode[], bimodalData: BMNode[], compareData: CompareData[] = []): Legend[] {
    const legends: Legend[] = [];
    let addedBMBG = false;
    let addedBMBP = false;
    let addedBMBL = false;
    let addedBMBM = false;
    let addedBMBF = false;
    let addedCT = false;
    let addedBMProteinAbsencePath = false;
    let addedBMProteinPresencePath = false;
    let addedBMProteinIntermediatePath = false;
    for (const i of treeData) {
      if (legends.findIndex((l) => l.name === 'Anatomical Structures') === -1) {
        legends.push({
          name: 'Anatomical Structures',
          color: '#E41A1C',
          style: '',
          sortOrder: 1,
        });
      }
      if (i.isNew) {
        if (legends.findIndex((l) => l.color === i.color) === -1) {
          if (compareData.length) {
            legends.push({
              name: compareData.find((c) => c.color === i.color)?.title ?? '',
              color: i.color,
              style: '',
              sortOrder: 10,
            });

            legends.push({
              name: (compareData.find((c) => c.color === i.color)?.title ?? '') + ' - New Nodes',
              color: i.color,
              style: 'stroke',
              sortOrder: 11,
            });
          }
        }
      }
    }

    for (const i of bimodalData) {
      if (i.isNew) {
        if (legends.findIndex((l) => l.color === i.color) === -1) {
          if (compareData.length) {
            legends.push({
              name: compareData.find((c) => c.color === i.color)?.title ?? '',
              color: i.color,
              style: '',
              sortOrder: 10,
            });

            legends.push({
              name: (compareData.find((c) => c.color === i.color)?.title ?? '') + ' - New Nodes',
              color: i.color,
              style: 'stroke',
              sortOrder: 11,
            });
          }
        }
      }
      if (i.type === 'BM') {
        if (!addedBMBG && i.bType === 'gene') {
          legends.push({
            name: 'Gene Biomarkers',
            color: '#4DAF4A',
            style: '',
            bmType: 'biomarker',
            sortOrder: 3,
          });
          addedBMBG = true;
        }
        if (!addedBMBP && i.bType === 'protein') {
          legends.push({
            name: 'Protein Biomarkers',
            color: '#4DAF4A',
            style: '',
            bmType: 'biomarker',
            sortOrder: 4,
          });
          addedBMBP = true;
        }
        if (!addedBMProteinPresencePath && i.proteinPresence === PROTEIN_PRESENCE.POS && i.bType === 'protein') {
          legends.push({
            name: 'Protein Presence',
            color: '#00008B',
            style: '',
            sortOrder: 97,
          });
          addedBMProteinPresencePath = true;
        }
        if (!addedBMProteinAbsencePath && i.proteinPresence === PROTEIN_PRESENCE.NEG && i.bType === 'protein') {
          legends.push({
            name: 'Protein Absence',
            color: '#E16156',
            style: '',
            sortOrder: 98,
          });
          addedBMProteinAbsencePath = true;
        }
        if (
          !addedBMProteinIntermediatePath &&
          i.proteinPresence === PROTEIN_PRESENCE.INTERMEDIATE &&
          i.bType === 'protein'
        ) {
          legends.push({
            name: 'Intermediate Protein',
            color: '#4B2079',
            style: '',
            sortOrder: 99,
          });
          addedBMProteinIntermediatePath = true;
        }
        if (!addedBMBL && i.bType === 'lipids') {
          legends.push({
            name: 'Lipids Biomarkers',
            color: '#4DAF4A',
            style: '',
            bmType: 'biomarker',
            sortOrder: 5,
          });
          addedBMBL = true;
        }
        if (!addedBMBM && i.bType === 'metabolites') {
          legends.push({
            name: 'Metabolites Biomarkers',
            color: '#4DAF4A',
            style: '',
            bmType: 'biomarker',
            sortOrder: 6,
          });
          addedBMBM = true;
        }
        if (!addedBMBF && i.bType === 'proteoforms') {
          legends.push({
            name: 'Proteoforms Biomarkers',
            color: '#4DAF4A',
            style: '',
            bmType: 'biomarker',
            sortOrder: 7,
          });
          addedBMBF = true;
        }
      }
      if (!addedCT && i.type === 'BM') {
        legends.push({
          name: 'Cell Types',
          color: '#377EB8',
          style: '',
          sortOrder: 2,
        });
        addedCT = true;
      }
    }

    for (const item of compareData) {
      if (legends.findIndex((l) => l.color === item.color) === -1) {
        legends.push({
          name: item.title,
          color: item.color,
          style: '',
          sortOrder: 10,
        });
      }
    }
    legends.push({
      name: 'AS-AS, AS-CT, CT-BM Paths',
      color: '#ccc',
      style: '',
      sortOrder: 99,
    });
    this.legendData.next(legends);
    return legends;
  }
}
