import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ThemingService } from '../services/theming/theming.service';

const LOGOS: Record<string, string> & Record<'default', string> = {
  'hubmap-theme-dark': 'hubmap-logo.svg',
  'hubmap-theme-light': 'hubmap-logo.svg',
  'sennet-theme-dark': 'sennet-logo.svg',
  'sennet-theme-light': 'sennet-logo.svg',
  'gtex-theme-dark': 'gtex-logo.png',
  'gtex-theme-light': 'gtex-logo.png',
  default: 'default-logo.svg',
};

/**
 * Header which is always displayed on the site; contains current filter info,
 * a link to download data, and a logo which resets the page when clicked.
 */
@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnChanges {
  /**
   * URL to Portal site
   */
  @Input() homeUrl!: string;

  @Input() loginDisabled!: boolean;

  @Input() logoTooltip!: string;

  /**
   * Is the user logged in?
   */
  @Input() loggedIn!: boolean;

  /**
   * Current filter settings
   */
  @Input() filters!: Record<string, unknown[] | unknown>;

  @Input() baseRef = '';

  /**
   * Emitted when refresh button is clicked
   */
  @Output() readonly refreshClicked = new EventEmitter<void>();

  /**
   * Emitted when download button is clicked
   */
  @Output() readonly downloadClicked = new EventEmitter<void>();

  private readonly themeChanges$ = inject(ThemingService).themeChanges$;
  private readonly baseHref$ = new BehaviorSubject('');

  readonly logoUrl$ = combineLatest([this.themeChanges$, this.baseHref$]).pipe(
    map(([theme, baseHref]) => {
      const logo = LOGOS[theme] ?? LOGOS.default;
      return `url(${baseHref}assets/icons/app/${logo})`;
    }),
  );

  ngOnChanges(changes: SimpleChanges): void {
    if ('baseRef' in changes) {
      this.baseHref$.next(this.baseRef);
    }
  }
}
