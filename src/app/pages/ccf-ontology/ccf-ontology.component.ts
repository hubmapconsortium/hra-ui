import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from 'src/app/components/card-button-long/long-card';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { TileItems } from 'src/app/components/simple-tile/tile-items';
import { ImageData } from "src/app/components/simple-image/simple-image";
import { TileDefinition } from 'src/app/shared/simple-tile-items';
import { ccfKnowledgeData, markdownData, ontologyWebData, overviewData, referencesData, relatedToolsData, spatialOntologyData } from './ccf-ontology.content';

@Component({
  selector: 'ccf-ontology',
  templateUrl: './ccf-ontology.component.html',
  styleUrls: ['./ccf-ontology.component.scss']
})
export class CcfOntologyComponent {

  constructor(private router: Router, private readonly route: ActivatedRoute){
    const data = route.snapshot.data['ccfOntology']
    this.title = data.title
    this.description = data.description
    this.overviewData = data.overviewData
    this.ccfKnowledgeData = data.ccfKnowledgeData
    this.spatialOntologyData = data.spatialOntologyData
    this.relatedToolsData = data.relatedToolsData
    this.ontologyWebData = data.ontologyWebData
    this.referencesData = data.referencesData    
    this.markdownData = [data.markdownData]      
    
  }

  title: string;
  description: TileItems[];
  overviewData: PageDataItems[];
  ccfKnowledgeData: ImageData[];
  spatialOntologyData: ImageData[];
  relatedToolsData: LongCard[]
  ontologyWebData: LongCard[]
  referencesData: PageDataItems[]
  markdownData: string[]

  cardClicked(card: LongCard): void {
    this.router.navigate([card.route])
  }

}
