import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from '../../components/card-button-long/long-card';
import { PageDataItems } from '../../components/page-data/page-data';
import { ImageData } from '../../components/simple-image/simple-image';
import { TileItems } from '../../components/simple-tile/tile-items';


@Component({
  selector: 'ccf-ontology',
  templateUrl: './ccf-ontology.component.html',
  styleUrls: ['./ccf-ontology.component.scss']
})
export class CcfOntologyComponent {
  title: string;
  description: TileItems[];
  overviewData: PageDataItems[];
  ccfKnowledgeData: ImageData[];
  spatialOntologyData: ImageData[];
  relatedToolsData: LongCard[];
  ontologyWebData: LongCard[];
  referencesData: PageDataItems[];
  markdownData: string[];

  constructor(private router: Router, route: ActivatedRoute){
    const data = route.snapshot.data['content'];
    this.title = data.title;
    this.description = data.description;
    this.overviewData = data.overviewData;
    this.ccfKnowledgeData = data.ccfKnowledgeData;
    this.spatialOntologyData = data.spatialOntologyData;
    this.relatedToolsData = data.relatedToolsData;
    this.ontologyWebData = data.ontologyWebData;
    this.referencesData = data.referencesData;
    this.markdownData = [data.markdownData];   
  }

  cardClicked(card: LongCard): void {
    this.router.navigate([card.route]);
  }
}
