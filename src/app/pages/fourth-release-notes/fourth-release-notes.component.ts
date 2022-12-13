import { Component, OnInit } from '@angular/core';
import { headerData, fourthReleaseIntro, fourthReleaseStats, hraHourEvent, hourEventUseButton, asctbTables, asctbTablesButton, asctbReporter, asctbReporterButton, ontologyValidations, ontologyValidationsButton, threeDimRefObjects, threeDimRefObjectsButton, eui, euiButton, rui, ruiButton, vrOrganGallary, vrOrganGallaryButton, previewButton1, previewButton2 } from './fourth-release-notes.content';

@Component({
  selector: 'fourth-release-notes',
  templateUrl: './fourth-release-notes.component.html',
  styleUrls: ['./fourth-release-notes.component.scss']
})
export class FourthReleaseNotesComponent  {

  headerData = headerData
  fourthReleaseIntro = fourthReleaseIntro
  fourthReleaseStats = fourthReleaseStats
  hraHourEvent = hraHourEvent
  hourEventUseButton = hourEventUseButton
  asctbTables = asctbTables
  asctbTablesButton = asctbTablesButton
  asctbReporter = asctbReporter
  asctbReporterButton = asctbReporterButton
  ontologyValidations = ontologyValidations
  ontologyValidationsButton = ontologyValidationsButton
  threeDimRefObjects = threeDimRefObjects
  threeDimRefObjectsButton = threeDimRefObjectsButton
  explorationUserInterface = eui
  explorationUserInterfaceButton = euiButton
  registrationUserInterface = rui
  registrationUserInterfaceButton = ruiButton
  vrOrganGallary = vrOrganGallary
  vrOrganGallaryButton = vrOrganGallaryButton
  previewButton1 = previewButton1
  previewButton2 = previewButton2
}
