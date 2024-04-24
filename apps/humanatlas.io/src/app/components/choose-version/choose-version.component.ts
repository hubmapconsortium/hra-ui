import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChooseVersion } from './choose-version';

/** Displays an input select */
@Component({
  selector: 'ccf-choose-version',
  templateUrl: './choose-version.component.html',
  styleUrls: ['./choose-version.component.scss'],
})
export class ChooseVersionComponent {
  /** Details of options in the select */
  @Input() releaseDate: ChooseVersion[] = [];

  /** Initial selected value in the input select */
  @Input() selectedDate?: ChooseVersion;

  /** Emits the input select data when an option is selected */
  @Output() selectedVersion = new EventEmitter<ChooseVersion>();
}
