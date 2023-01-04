import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardMemberItems } from '../../components/board-members/board-members';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

interface HraEditorialBoard {
  overviewData: PageDataItems;
  boardHeader: PageHeaderItems;
  boardMembersData: BoardMemberItems[];
  acknowledgmentsData: PageDataItems;
}

@Component({
  selector: 'editorial-board',
  templateUrl: './hra-editorial-board.component.html',
  styleUrls: ['./hra-editorial-board.component.scss']
})
export class HraEditorialBoardComponent {
  data = this.route.snapshot.data['content'] as HraEditorialBoard;
  overviewData = [this.data.overviewData];
  boardHeader = [this.data.boardHeader];
  acknowledgmentsData = [this.data.acknowledgmentsData];
  boardMembersData = this.data.boardMembersData;

  constructor(private readonly route: ActivatedRoute) { }
}
