import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

/** Below this size, use smaller icons */
const EXTRA_SMALL_THRESHOLD = 430;
/** Below this size, use smaller logo */
const SMALL_LOGO_THRESHOLD = 768;

/**
 * Component for footer
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, AssetUrlPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** HRA Logo url */
  readonly logo = input<string>('assets/logo/hra_logo_contrast.svg');

  /** Uses smaller icons when screen is extra small */
  isExtraSmall = false;
  /** Use the smaller HRA logo when screen is smaller */
  useSmallerLogo = false;

  /**
   * Sets initial values for isExtraSmall and useSmallerLogo
   */
  constructor() {
    this.onResize();
  }

  /**
   * Updates isExtraSmall and useSmallerLogo on screen resize
   */
  @HostListener('window:resize')
  onResize() {
    this.isExtraSmall = window.innerWidth < EXTRA_SMALL_THRESHOLD;
    this.useSmallerLogo = window.innerWidth < SMALL_LOGO_THRESHOLD;
  }
}
