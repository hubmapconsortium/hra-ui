import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-release-notes-page',
  imports: [CommonModule],
  templateUrl: './release-notes-page.component.html',
  styleUrl: './release-notes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesPageComponent {}
