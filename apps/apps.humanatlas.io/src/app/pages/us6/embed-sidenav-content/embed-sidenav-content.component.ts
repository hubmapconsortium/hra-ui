import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

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
  readonly selectedButton = input<number>();

  readonly closeSidenav = output();

  protected readonly tabIndex = signal(0);
  protected readonly iframeWidth = signal(0);
  protected readonly iframeHeight = signal(0);
  protected readonly appSrcDoc = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.code()));

  private readonly sanitizer = inject(DomSanitizer);
  private readonly iframeContainer = viewChild('iframeContainer', { read: ElementRef });

  constructor() {
    effect(
      (cleanup) => {
        if (this.tabIndex() === 1) {
          const observer = this.attachResizeObserver();
          cleanup(() => observer.disconnect());
        }
      },
      { allowSignalWrites: true },
    );
  }

  private attachResizeObserver(): ResizeObserver {
    const observer = new ResizeObserver(() => this.updateIframeSize());
    const iframeContainer = this.iframeContainer()?.nativeElement;
    if (iframeContainer) {
      observer.observe(iframeContainer, { box: 'border-box' });
    }
    this.updateIframeSize();
    return observer;
  }

  private updateIframeSize(): void {
    const iframeContainer = this.iframeContainer()?.nativeElement as HTMLElement | undefined;
    const bbox = iframeContainer?.getBoundingClientRect();
    if (bbox) {
      this.iframeWidth.set(bbox.width);
      this.iframeHeight.set(bbox.height);
    }
  }
}
