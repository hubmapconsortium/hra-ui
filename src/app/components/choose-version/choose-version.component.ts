import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChooseVersion } from './choose-version';

@Component({
  selector: 'ccf-choose-version',
  templateUrl: './choose-version.component.html',
  styleUrls: ['./choose-version.component.scss'],
})
export class ChooseVersionComponent {
  @Input()
  releaseDate: ChooseVersion[] = [];

  @Input()
  selectedDate: ChooseVersion;

  @Output()
  selectedVersion = new EventEmitter<ChooseVersion>;

}
