import { Component, input, model } from '@angular/core';
import {
  CdeVisualizationComponent,
  ColorMapEntry,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  EdgeEntry,
  Metadata,
  NodeEntry,
} from '@hra-ui/cde-visualization';

@Component({
  standalone: true,
  imports: [CdeVisualizationComponent],
  selector: 'cde-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly homeLink = input<string>('https://apps.humanatlas.io/cde/');

  readonly nodes = input<string | NodeEntry[]>();
  readonly nodeTargetKey = input<string>('');
  readonly nodeTargetValue = input<string>();

  readonly edges = model<string | EdgeEntry[]>();
  readonly maxEdgeDistance = input<number>();

  readonly colorMap = model<string | ColorMapEntry[]>();
  readonly colorMapKey = input<string>('');
  readonly colorMapValueKey = input(DEFAULT_COLOR_MAP_VALUE_KEY);

  readonly metadata = input<string | Metadata>();
  readonly title = input<string>();
  readonly technology = input<string>();
  readonly organ = input<string>();
  readonly sex = input<string>();
  readonly age = input<number>();
  readonly creationDate = input<string>();
  readonly creationTime = input<string>();
  readonly thickness = input<number>();
  readonly pixelSize = input<number>();
}
