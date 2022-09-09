import { Component, OnInit } from '@angular/core';
import { TILE_DEFINITION } from 'src/app/shared/simple-tile-items';
import { ccfKnowledgeData, markdownData, ontologyWebData, overviewData, referencesData, relatedToolsData, spatialOntologyData } from './ccf-ontology.content';

@Component({
  selector: 'ccf-ontology',
  templateUrl: './ccf-ontology.component.html',
  styleUrls: ['./ccf-ontology.component.scss']
})
export class CcfOntologyComponent {

  description = TILE_DEFINITION
  overviewData = overviewData
  ccfKnowledgeData = ccfKnowledgeData
  spatialOntologyData = spatialOntologyData
  relatedToolsData = relatedToolsData
  ontologyWebData = ontologyWebData
  referencesData = referencesData
  markdownData = markdownData

  constructor() { }

}
