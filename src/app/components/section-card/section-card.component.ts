import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {

  public cards: any[] = [
    {
      title: "Data", description: 'Research the data using Human Reference Atlas',
      img: '../../../assets/images/card1.png'
    },
    {
      title: 'CCF Ontology', description: 'Discover the Common Cooordinate Framework Ontology',
      img: '../../../assets/images/card2.png'
    },
    {
      title: "Tools", description: 'Construct, Visualize, and use the tools of the Human Reference Atlas',
      img: '../../../assets/images/card3.png'
    },
    {
      title: "Training and Outreach", description: 'Checkout HuBMAP`s education and engagement efforts',
      img: '../../../assets/images/card4.png'
    }
  ];

  constructor() {

  }
  ngOnInit(): void {
  }


}
