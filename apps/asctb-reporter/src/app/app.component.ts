import { Component, OnInit, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { TrackingPopupComponent } from './components/tracking-popup/tracking-popup.component';
import { ConsentService } from './services/consent.service';

declare let gtag: (arg1?: unknown, arg2?: unknown, arg3?: unknown) => void;

@Component({
  selector: 'app-reporter',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  readonly consentService = inject(ConsentService);
  readonly snackbar = inject(MatSnackBar);
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);
  readonly router = inject(Router);

  constructor() {
    switch (environment.tag) {
      case 'Staging':
        document.title = 'ASCT+B Reporter | Staging';
        break;
      case 'Development':
        document.title = 'ASCT+B Reporter | Development';
        break;
      default:
        document.title = 'ASCT+B Reporter';
    }

    this.matIconRegistry.addSvgIcon(
      'debug',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/debug.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'report',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/report.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'indentedList',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/indent.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'compare',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/compare.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'playground',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/playground.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'upload_file',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/upload.svg'),
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        },
      },
      duration: this.consentService.consent === 'not-set' ? Infinity : 3000,
    });
  }
}
