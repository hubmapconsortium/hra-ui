import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {

  public datalist:any[] = [
    {title: "Data", description: 'Research the data using Human Reference Atlas'},
    {title: 'CCF Ontology', description: 'Discover the Common Cooordinate Framework Ontology'},
    {title: "Tools", description: 'Construct, Visualize, and use the tools of the Human Reference Atlas'},
    {title: "Training and Outreach", description: 'Checkout HuBMAP`s education and engagement efforts'}
  ];

  constructor() {
   
   }
  ngOnInit(): void {
  }
    

}
