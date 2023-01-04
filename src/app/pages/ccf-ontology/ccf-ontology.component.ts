import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LongCard } from '../../components/card-button-long/long-card';
import { PageDataItems } from '../../components/page-data/page-data';
import { ImageData } from '../../components/simple-image/simple-image';
import { TileItems } from '../../components/simple-tile/tile-items';

interface CcfOntology {
  title: string;
  description: TileItems[];
  overviewData: PageDataItems[];
  ccfKnowledgeData: ImageData[];
  spatialOntologyData: ImageData[];
  relatedToolsData: LongCard[];
  ontologyWebData: LongCard[];
  referencesData: PageDataItems[];
  markdownData: string[];
}

@Component({
  selector: 'ccf-ontology',
  templateUrl: './ccf-ontology.component.html',
  styleUrls: ['./ccf-ontology.component.scss']
})
export class CcfOntologyComponent {
  data = this.route.snapshot.data['content'] as CcfOntology;
  title = this.data.title;
  description = this.data.description;
  overviewData = this.data.overviewData;
  ccfKnowledgeData = this.data.ccfKnowledgeData;
  spatialOntologyData = this.data.spatialOntologyData;
  relatedToolsData = this.data.relatedToolsData;
  ontologyWebData = this.data.ontologyWebData;
  referencesData = this.data.referencesData;
  markdownData = [this.data.markdownData];

  constructor(private router: Router, private readonly route: ActivatedRoute) { }

  cardClicked(card: LongCard): void {
    this.router.navigate([card.route]);
  }
}
