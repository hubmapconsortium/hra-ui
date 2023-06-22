import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';

@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent {
  constructor(private readonly route: ActivatedRoute) { }
  data = this.route.snapshot.data['content'] as PageDef[];
}
