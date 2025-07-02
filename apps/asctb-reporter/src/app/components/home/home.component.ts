import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ConfigService } from '../../app-config.service';
import { GaAction, GaCategory } from '../../models/ga.model';
import { SheetDetails } from '../../models/sheet.model';
import { CONTIRBUTORS, IMAGES, VIDEO_ACTIONS } from '../../static/home';
import { FooterModule } from '../footer/footer.module';
import { TableNestedMenuModule } from '../table-nested-menu/table-nested-menu.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatMenuModule,
    TableNestedMenuModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    YouTubePlayerModule,
    FontAwesomeModule,
    FooterModule,
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly configService = inject(ConfigService);
  readonly ga = inject(GoogleAnalyticsService);
  private readonly router = inject(Router);

  window = window;
  dataVersion = 'latest';
  VIDEO_ACTIONS = VIDEO_ACTIONS;
  CONTIRBUTORS = CONTIRBUTORS;
  IMAGES = IMAGES;
  videoSectionSelected = 0;

  faLinkedin = faLinkedin;
  faGlobe = faGlobe;
  faGithub = faGithub;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  copyrightYear = new Date().getFullYear();
  masterSheetLink = '';
  sheetOptions: SheetDetails[] = [];

  @ViewChild('tutorialVideoContainer') videoContainer!: ElementRef<HTMLElement>;
  @ViewChild('tutorialVideo') player!: YouTubePlayer;

  private videoContainerResizeObserver?: ResizeObserver;

  constructor() {
    this.configService.config$.subscribe((config) => {
      this.masterSheetLink = config['masterSheetLink'] as string;
    });

    this.configService.sheetConfiguration$.subscribe((sheetOptions) => {
      this.sheetOptions = sheetOptions;
    });
  }

  ngAfterViewInit(): void {
    const actionsDiv = document.getElementById('actionsHeight');
    if (actionsDiv) {
      actionsDiv.style.maxHeight = `${this.player.height + 50}px`;
      actionsDiv.style.overflowY = 'auto';
    }

    this.videoContainerResizeObserver = new ResizeObserver((entries) => {
      const [
        {
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
        },
      ] = entries;

      this.player.width = width;
      this.player.height = height;
    });
    this.videoContainerResizeObserver.observe(this.videoContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.videoContainerResizeObserver?.disconnect();
  }

  seekVideo(seconds: number, id: number) {
    this.videoSectionSelected = id;

    this.player.pauseVideo();
    this.player.seekTo(seconds, true);
    this.player.playVideo();

    this.ga.event(GaAction.CLICK, GaCategory.HOME, `Jump to video section: ${VIDEO_ACTIONS[id].header}`);
  }

  openGithub() {
    window.open('https://github.com/hubmapconsortium/ccf-asct-reporter', '_blank');
    this.ga.event(GaAction.NAV, GaCategory.HOME, 'Open Github');
  }

  openDocs() {
    this.router.navigate(['/docs']);
    this.ga.event(GaAction.NAV, GaCategory.HOME, 'Open Docs');
  }

  openData() {
    window.open(this.masterSheetLink, '_blank');
    this.ga.event(GaAction.NAV, GaCategory.HOME, 'Open Master Tables');
  }

  openDataOld() {
    window.open(
      'https://docs.google.com/spreadsheets/d/1j_SLhFipRWUcRZrCDfNH15OWoiLf7cJks7NVppe3htI/edit#gid=1268820100',
      '_blank',
    );
    this.ga.event(GaAction.NAV, GaCategory.HOME, 'Open Old Data Tables');
  }

  goToPlayground() {
    this.router.navigate(['/vis'], {
      queryParams: { playground: 'true', selectedOrgans: 'example' },
      queryParamsHandling: 'merge',
    });
    this.ga.event(GaAction.NAV, GaCategory.HOME, 'Launch Playground Tool');
  }
}
