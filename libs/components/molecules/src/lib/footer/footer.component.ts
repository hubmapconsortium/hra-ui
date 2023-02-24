import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule  } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


/** Downloading labels */
export interface DropdownItemList {
  label: string;
}

@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule,
     MatButtonModule,
     MatIconModule,
     MatSelectModule
    ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent <List extends DropdownItemList = DropdownItemList> {

  @HostBinding('class') readonly clsName = 'hra-footer';

  @Output() readonly buttonClick = new EventEmitter<void>();

  @Output() readonly selectionChange = new EventEmitter<List>();

  // @ViewChild('mySelect') mySelect: MatSelect;

  selected = " ";

  @Input() placeholder?: string;

  @Input() items: List[] = [];

  /** Current selection */
  @Input() selection?: List;

  // OpenSel() {
  //   this.mySelect.open()
  // }

  // updateSelection(selection: List | null): void {
  //   if (selection) {
  //     this.selection = selection;
  //     this.selectionChange.emit(selection);
  //   }
  // }

//   mySelect(){
// console.log("in select")
//   }
}
