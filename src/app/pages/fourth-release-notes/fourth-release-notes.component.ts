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

@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent implements AfterViewInit, OnDestroy, OnInit {
  private subscriptions = new Subscription();

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
  icon = "list";
  scrolled: boolean = false;

  navigationItems: NavItems[] = [
    { menuName: "Introduction", id: "intro" },
    { menuName: `What's New`, id: "whats-new" },
    { menuName: 'HRA 24 Hour Event', id: "24-hr-event" },
    { menuName: 'HRA Release Calendar', id: "hra-release-calendar" },
    { menuName: 'ASCT+B Tables', id: "asctb-tables" },
    { menuName: 'ASCT+B Reporter', id: "asctb-reporter" },
    { menuName: 'ASCT+B Ontology Validations', id: "asctb-ontology-validations" },
    { menuName: '3D Reference Objects', id: '3d-reference-objects' },
    { menuName: 'Exploration User Interface', id: "exploration-user-interface" },
    { menuName: 'Registration User Interface', id: 'registration-user-interface' },
    { menuName: 'VR Organ Gallery', id: "vr-organ-gallery" },
    { menuName: 'Previews', id: 'previews' },
    { menuName: 'Contact Us', id: "contact-us" },
    { menuName: 'Outro', id: "outro" }
  ];

  mobileNavigationItems: NavItems[] = [{ menuName: "Table of Contents", id: "'" }, ...this.navigationItems]

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

  constructor(private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller) {
    const data = route.snapshot.data['content'];
    this.headerData = data.headerData;
    this.fourthReleaseIntro = data.fourthReleaseIntro;
    this.fourthReleaseStats = data.fourthReleaseStats;
    this.hraHourEvent = data.hraHourEvent;
    this.hourEventUseButton = data.hourEventUseButton;
    this.asctbTables = data.asctbTables;
    this.asctbTablesButton = data.asctbTablesButton;
    this.asctbReporter = data.asctbReporter;
    this.asctbReporterButton = data.asctbReporterButton;
    this.ontologyValidations = data.ontologyValidations;
    this.ontologyValidationsButton = data.ontologyValidationsButton;
    this.threeDimRefObjects = data.threeDimRefObjects
    this.threeDimRefObjectsButton = data.threeDimRefObjectsButton
    this.explorationUserInterface = data.eui;
    this.explorationUserInterfaceButton = data.euiButton;
    this.registrationUserInterface = data.rui;
    this.registrationUserInterfaceButton = data.ruiButton;
    this.vrOrganGallery = data.vrOrganGallery;
    this.vrOrganGalleryButton = data.vrOrganGalleryButton;
    this.previewScrollytellingButton = data.previewScrollytellingButton;
    this.previewComparingTabula = data.previewComparingTabula;
    this.previewFtuSegmentation = data.previewFtuSegmentation;
    this.previewCcfTissueBlock = data.previewCcfTissueBlock;
    this.contactCardData = data.contactCardData;
    this.hourEventPageButton = data.hourEventPageButton
    this.hraReleaseCalendar = data.hraReleaseCalendar

    this.subscriptions.add(this.route.fragment.subscribe((anchor) => {
      if (anchor) {
        this.scroller.scrollToAnchor(anchor);
      }
    }));
  }

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
