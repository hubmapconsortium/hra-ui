import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';

@Component({
  selector: 'hra-embed-sidenav-content',
  standalone: true,
  imports: [CommonModule, ClipboardModule, MatTabsModule, ButtonsModule, CodeBlockComponent, FlatCardModule],
  templateUrl: './embed-sidenav-content.component.html',
  styleUrl: './embed-sidenav-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbedSidenavContentComponent {
  readonly tagline = input.required<string>();
  readonly code = input.required<string>();
  readonly showApp = input.required<boolean>();
  readonly tabIndex = model(0);

  readonly closeSidenav = output();

  protected readonly appSrcDoc = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.code()));

  private readonly sanitizer = inject(DomSanitizer);
}
