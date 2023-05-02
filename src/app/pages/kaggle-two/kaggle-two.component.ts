import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { PrizeCard } from '../../components/prize-card/prize-card';

interface KaggleTwentyTwo {
  kaggle2022Header: PageHeaderItems[];
  overviewData: PageDataItems[];
  accuracyPrizeData: PrizeCard[];
  acknowledgments: PageDataItems[];
  judgesPrizeData: PrizeCard[];
  awardsCeremony: PageDataItems[];
  datasets: PageDataItems[];
  awardsYoutube: YoutubeModel;
}

@Component({
  selector: 'kaggle-two',
  templateUrl: './kaggle-two.component.html',
  styleUrls: ['./kaggle-two.component.scss']
})
export class KaggleTwoComponent {
  constructor(private readonly route: ActivatedRoute) { }
  
  data = this.route.snapshot.data['content'] as PageDef[];
  // kaggle2022Header = this.data.kaggle2022Header;
  // overviewData = this.data.overviewData;
  // accuracyPrizeData = this.data.accuracyPrizeData;
  // acknowledgments = this.data.acknowledgments;
  // judgesPrizeData = this.data.judgesPrizeData;
  // awardsCeremony = this.data.awardsCeremony;
  // datasets = this.data.datasets;
  // awardsYoutube = this.data.awardsYoutube;
}
