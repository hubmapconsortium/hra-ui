import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganData } from './two-dim-image';

@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss']
})
export class TwoDimImageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    console.log(this.tissueData[0].tissueData?.length)
  }

  @Input() cardTitle: string
  @Input() tissueData: OrganData[] = [];
  @Input() isMultirow: boolean;
  @Output() infoRoute = new EventEmitter<OrganData>;
  

  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, { panelClass: 'two-dim-image-modal' })
  }
}
