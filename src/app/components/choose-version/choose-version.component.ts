import { Component,  } from '@angular/core';
import { ChooseVersion } from './choose-version';

@Component({
  selector: 'ccf-choose-version',
  templateUrl: './choose-version.component.html',
  styleUrls: ['./choose-version.component.scss']
})
export class ChooseVersionComponent {


  releaseDate: ChooseVersion[] = [
    {release: '1st Release, March 2021'},
    {release: '2nd Release, December 2021'}
  ];


  selectedDate = this.releaseDate[0].release;
  chooseLabel = 'Choose Version of ASCT+B datasets:';

  constructor() { }

}
