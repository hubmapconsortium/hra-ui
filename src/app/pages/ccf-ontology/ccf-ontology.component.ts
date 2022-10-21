import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { TileDefinition } from 'src/app/shared/simple-tile-items';
import { ccfKnowledgeData, markdownData, ontologyWebData, overviewData, referencesData, relatedToolsData, spatialOntologyData } from './ccf-ontology.content';

@Component({
  selector: 'ccf-ontology',
  templateUrl: './ccf-ontology.component.html',
  styleUrls: ['./ccf-ontology.component.scss']
})
export class CcfOntologyComponent {

  constructor(private router: Router){}

  title = "Common Coordinate Framework Ontology"
  description = TileDefinition
  overviewData = overviewData
  ccfKnowledgeData = ccfKnowledgeData
  spatialOntologyData = spatialOntologyData
  relatedToolsData = relatedToolsData
  ontologyWebData = ontologyWebData
  referencesData = referencesData
  markdownData = markdownData

  cardClicked(card: LongCard): void {
    this.router.navigate([card.route])
  }

}
