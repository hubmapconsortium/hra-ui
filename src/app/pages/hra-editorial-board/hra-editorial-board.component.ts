import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDef } from 'src/app/components/page-element/page-def';
import { BoardMemberItems } from '../../components/board-members/board-members';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

interface HraEditorialBoard {
  overviewData: PageDataItems[];
  boardHeader: PageHeaderItems[];
  boardMembersData: BoardMemberItems[];
}

@Component({
  selector: 'editorial-board',
  templateUrl: './hra-editorial-board.component.html',
  styleUrls: ['./hra-editorial-board.component.scss']
})
export class HraEditorialBoardComponent {
  data = this.route.snapshot.data['content'] as PageDef[];
  // overviewData = this.data.overviewData;
  // boardHeader = this.data.boardHeader;
  // boardMembersData = this.data.boardMembersData;

  constructor(private readonly route: ActivatedRoute) { }
}
