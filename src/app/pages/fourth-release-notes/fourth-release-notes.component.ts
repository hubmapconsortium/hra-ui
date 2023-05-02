import { ConnectedPosition } from '@angular/cdk/overlay';
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactCard } from 'src/app/components/contact-card/contact-card';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { NavItems } from 'src/app/components/toolbar/nav-items';
import { UseButton } from 'src/app/components/use-button/use-button';

interface FourthReleaseNotes {
  headerData: PageHeaderItems[];
  fourthReleaseIntro: PageDataItems[];
  fourthReleaseStats: PageDataItems[];
  hraHourEvent: PageDataItems[];
  hourEventUseButton: UseButton;
  asctbTables: PageDataItems[];
  asctbTablesButton: UseButton;
  asctbReporter: PageDataItems[];
  asctbReporterButton: UseButton;
  ontologyValidations: PageDataItems[];
  ontologyValidationsButton: UseButton;
  threeDimRefObjects: PageDataItems[];
  threeDimRefObjectsButton: UseButton;
  explorationUserInterface: PageDataItems[];
  explorationUserInterfaceButton: UseButton;
  registrationUserInterface: PageDataItems[];
  registrationUserInterfaceButton: UseButton;
  vrOrganGallery: PageDataItems[];
  vrOrganGalleryButton: UseButton;
  previewScrollytellingButton: UseButton;
  previewComparingTabula: UseButton;
  previewFtuSegmentation: UseButton;
  previewCcfTissueBlock: UseButton;
  contactCardData: ContactCard[];
  hourEventPageButton: UseButton;
  hraReleaseCalendar: PageDataItems[];
  navigationItems: NavItems[];
  mobileNavigationItems: NavItems[];
  icon: string;
  scrolled: boolean;
}

@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent implements AfterViewInit, OnDestroy, OnInit {
  private subscriptions = new Subscription();
  icon = "list";
  scrolled: boolean = false;
  
  data = this.route.snapshot.data['content'] as FourthReleaseNotes;
  headerData = this.data.headerData;
  fourthReleaseIntro = this.data.fourthReleaseIntro;
  fourthReleaseStats = this.data.fourthReleaseStats;
  hraHourEvent = this.data.hraHourEvent;
  hourEventUseButton = this.data.hourEventUseButton;
  asctbTables = this.data.asctbTables;
  asctbTablesButton = this.data.asctbTablesButton;
  asctbReporter = this.data.asctbReporter;
  asctbReporterButton = this.data.asctbReporterButton;
  ontologyValidations = this.data.ontologyValidations;
  ontologyValidationsButton = this.data.ontologyValidationsButton;
  threeDimRefObjects = this.data.threeDimRefObjects
  threeDimRefObjectsButton = this.data.threeDimRefObjectsButton
  explorationUserInterface = this.data.explorationUserInterface;
  explorationUserInterfaceButton = this.data.explorationUserInterfaceButton;
  registrationUserInterface = this.data.registrationUserInterface;
  registrationUserInterfaceButton = this.data.registrationUserInterfaceButton;
  vrOrganGallery = this.data.vrOrganGallery;
  vrOrganGalleryButton = this.data.vrOrganGalleryButton;
  previewScrollytellingButton = this.data.previewScrollytellingButton;
  previewComparingTabula = this.data.previewComparingTabula;
  previewFtuSegmentation = this.data.previewFtuSegmentation;
  previewCcfTissueBlock = this.data.previewCcfTissueBlock;
  contactCardData = this.data.contactCardData;
  hourEventPageButton = this.data.hourEventPageButton;
  hraReleaseCalendar = this.data.hraReleaseCalendar;
  navigationItems = this.data.navigationItems;
  mobileNavigationItems = [{ menuName: "Table of Contents", id: "'" }, ...this.navigationItems]

  constructor(private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller) {
    this.subscriptions.add(this.route.fragment.subscribe((anchor) => {
      if (anchor) {
        this.scroller.scrollToAnchor(anchor);
      }
    }));
  }

  readonly TableOfContentsPosition: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 0,
      offsetY: 0
    }
  ];

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 220) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    });
  }

  ngAfterViewInit(): void {
    const anchor = this.route.snapshot.fragment;
    if (anchor) {
      this.scroller.scrollToAnchor(anchor);
      setTimeout(() => {
        this.scroller.scrollToAnchor(anchor);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  scrollTo(id: string): void {
    this.router.navigate([], { fragment: id });
    this.scroller.scrollToAnchor(id);
  }
}
