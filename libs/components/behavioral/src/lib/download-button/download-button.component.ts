import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAction } from '@hra-ui/state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { dispatch } from '@hra-ui/cdk/injectors';

@Component({
  selector: 'ftu-download-button',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadButtonComponent {
  selectedFormat = 'pdf';
  url = '';
  fileName = '';

  readonly downloadFile = dispatch(DownloadState);

  download() {
    this.url = 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/car.svg'; // replace with your file URL
    this.fileName = 'file.' + this.selectedFormat; // replace with your desired file name
    this.downloadFile(this.selectedFormat);
  }
}
