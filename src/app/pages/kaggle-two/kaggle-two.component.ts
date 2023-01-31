import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeModel } from 'src/app/components/youtube-model/youtube-model';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { PrizeCard } from '../../components/prize-card/prize-card';


@Component({
  selector: 'kaggle-two',
  templateUrl: './kaggle-two.component.html',
  styleUrls: ['./kaggle-two.component.scss']
})
export class KaggleTwoComponent {
  kaggle2022Header: PageHeaderItems[];
  overviewData: PageDataItems[];
  accuracyPrizeData: PrizeCard[];
  acknowledgments: PageDataItems[];
  judgesPrizeData: PrizeCard[];
  awardsCeremony: PageDataItems[];
  datasets: PageDataItems[];
  awardsYoutube: YoutubeModel;

  constructor(route: ActivatedRoute) {
    const data = route.snapshot.data['content'];
    this.kaggle2022Header = data.kaggle2022Header;
    this.overviewData = data.overviewData;
    this.accuracyPrizeData = data.accuracyPrizeData;
    this.acknowledgments = data.acknowledgments;
    this.judgesPrizeData = data.judgesPrizeData;
    this.awardsCeremony = data.awardsCeremony;
    this.datasets = data.datasets;
    this.awardsYoutube = data.awardsYoutube;
  }
}
