import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradientPoint } from '@hra-ui/components/atoms';

@Component({
  selector: 'hra-biomarker-table-data-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biomarker-table-data-icon.component.html',
  styleUrls: ['./biomarker-table-data-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataIconComponent implements OnChanges {
  @Input() meanValue = 0.0;

  @Input() gradientPoints: GradientPoint[] = [];

  color = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('meanValue' in changes || 'gradientPoints' in changes) {
      const span = this.findSpan(this.gradientPoints, this.meanValue * 100);

      const startColor = this.hexToRgb(span[0]) || [];
      const endColor = this.hexToRgb(span[1]) || [];

      this.color = this.interpolateColor(startColor, endColor, this.meanValue);
    }
  }

  findSpan(gradientPoints: GradientPoint[], meanExpressionValue: number): [string, string] {
    gradientPoints.sort((a, b) => a.percentage - b.percentage);

    let start = '';
    let end = '';

    // TODO: Simplify this loop
    for (let i = 0; i <= gradientPoints.length; i++) {
      if (gradientPoints[i]['percentage'] < meanExpressionValue) {
        continue;
      }

      if (gradientPoints[i]['percentage'] === meanExpressionValue) {
        start = gradientPoints[i]['color'];
        end = gradientPoints[i]['color'];
      } else {
        if (i == 0) {
          start = gradientPoints[i]['color'];
          end = gradientPoints[i]['color'];
        } else {
          start = gradientPoints[i - 1]['color'];
          end = gradientPoints[i]['color'];
        }
      }
      break;
    }
    return [start, end];
  }

  hexToRgb(color: string): number[] | null {
    const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) {
      return null;
    }

    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);

    return [r, g, b, 1];
  }

  rgbToHex(color: number[]): string {
    const outParts = [
      color[0].toString(16),
      color[1].toString(16),
      color[2].toString(16),
      Math.round(color[3] * 255)
        .toString(16)
        .substring(0, 2),
    ];

    // Pad single-digit output values
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    });

    return '#' + outParts.join('');
  }

  interpolateColor(color1: number[], color2: number[], w1: number): string {
    if (color1.length === 0 || color2.length === 0) {
      return '#FFFFFF';
    }
    const w2 = 1 - w1;
    const r = Math.round(color1[0] * w1 + color2[0] * w2);
    const g = Math.round(color1[1] * w1 + color2[1] * w2);
    const b = Math.round(color1[2] * w1 + color2[2] * w2);

    return this.rgbToHex([r, g, b, 1]);
  }
}
