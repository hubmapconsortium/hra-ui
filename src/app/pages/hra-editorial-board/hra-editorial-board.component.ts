import { Component } from '@angular/core';
import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { BoardMemberItems } from 'src/app/components/board-members/board-members';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editorial-board',
  templateUrl: './hra-editorial-board.component.html',
  styleUrls: ['./hra-editorial-board.component.scss']
})

export class HraEditorialBoardComponent {


  overviewData: PageDataItems[];
  boardHeader: PageHeaderItems[];
  boardMembersData: BoardMemberItems[];
  acknowledgmentsData: PageDataItems[];

  constructor(route: ActivatedRoute){
    const data = route.snapshot.data['hraEditorialBoard'];
    this.overviewData=[data.overviewData]
    this.boardHeader = [data.boardHeader]
    this.acknowledgmentsData = [data.acknowledgmentsData]
    this.boardMembersData = data.boardMembersData
  }



  
}

