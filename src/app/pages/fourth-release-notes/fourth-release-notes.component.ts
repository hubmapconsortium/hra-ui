import { Component } from '@angular/core';
import { asctbReporter, asctbReporterButton, asctbTables, asctbTablesButton, contactCardData, eui, euiButton, fourthReleaseIntro, fourthReleaseStats, headerData, hourEventUseButton, hraHourEvent, ontologyValidations, ontologyValidationsButton, previewButton1, previewButton2, rui, ruiButton, threeDimRefObjects, threeDimRefObjectsButton, vrOrganGallary, vrOrganGallaryButton } from './fourth-release-notes.content';


@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent  {
  headerData = headerData;
  fourthReleaseIntro = fourthReleaseIntro;
  fourthReleaseStats = fourthReleaseStats;
  hraHourEvent = hraHourEvent;
  hourEventUseButton = hourEventUseButton;
  asctbTables = asctbTables;
  asctbTablesButton = asctbTablesButton;
  asctbReporter = asctbReporter;
  asctbReporterButton = asctbReporterButton;
  ontologyValidations = ontologyValidations;
  ontologyValidationsButton = ontologyValidationsButton;
  threeDimRefObjects = threeDimRefObjects;
  threeDimRefObjectsButton = threeDimRefObjectsButton;
  explorationUserInterface = eui;
  explorationUserInterfaceButton = euiButton;
  registrationUserInterface = rui;
  registrationUserInterfaceButton = ruiButton;
  vrOrganGallary = vrOrganGallary;
  vrOrganGallaryButton = vrOrganGallaryButton;
  previewButton1 = previewButton1;
  previewButton2 = previewButton2;
  contactCardData = contactCardData;
}
