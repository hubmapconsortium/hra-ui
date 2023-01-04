import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactCard } from 'src/app/components/contact-card/contact-card';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { UseButton } from 'src/app/components/use-button/use-button';

export interface NavItems {
  label: string;
  id: string;
}

@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent {
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
  vrOrganGallary: PageDataItems[];
  vrOrganGallaryButton: UseButton;
  previewScrollytellingButton: UseButton;
  previewComparingTabula: UseButton;
  previewFtuSegmentation: UseButton;
  previewCcfTissueBlock: UseButton;
  contactCardData: ContactCard[];
  navigationItems: NavItems[] = [
    { label: "Introduction", id: "intro"}, 
    { label: `What's New`, id: "whats-new" },
    { label: 'HRA 24 Hour Event', id: "24-hr-event" },
    { label: 'ASCT+B Tables', id: "asctb-tables" },
    { label: 'ASCT+B Reporter', id: "asctb-reporter" },
    { label: 'ASCT+B Ontology Validations', id: "asctb-ontology-validations" },
    { label: '3D Reference Objects', id: '3d-reference-objects' }, 
    { label: 'Exploration User Interface', id: "exploration-user-interface" },
    { label: 'Registration User Interface', id: 'registration-user-interface' },
    { label: 'VR Organ Gallery', id: "vr-organ-gallary" },
    { label: 'Previews', id: 'previews' }, 
    { label: 'Contact Us', id: "contact-us" },
    { label: 'Outro', id: "outro" }];

  constructor(route: ActivatedRoute) {
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
    this.vrOrganGallary = data.vrOrganGallary;
    this.vrOrganGallaryButton = data.vrOrganGallaryButton;
    this.previewScrollytellingButton = data.previewScrollytellingButton;
    this.previewComparingTabula = data.previewComparingTabula;
    this.previewFtuSegmentation = data.previewFtuSegmentation;
    this.previewCcfTissueBlock = data.previewCcfTissueBlock;
    this.contactCardData = data.contactCardData
  }
}
