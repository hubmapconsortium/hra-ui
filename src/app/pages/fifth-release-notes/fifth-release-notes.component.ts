import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';

@Component({
  selector: 'fifth-release-notes',
  templateUrl: './fifth-release-notes.component.html',
  styleUrls: ['./fifth-release-notes.component.scss']
})
export class FifthReleaseNotesComponent {
  data = this.route.snapshot.data['content'] as PageDef[];

  constructor(private readonly route: ActivatedRoute) { }
}
