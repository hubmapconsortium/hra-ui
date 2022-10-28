import { Component } from '@angular/core';
import { acknowledgmentsData, boardHeader, boardMembersData, overviewData } from './hra-editorial-board.content';

@Component({
  selector: 'ccf-hra-editorial-board',
  templateUrl: './hra-editorial-board.component.html',
  styleUrls: ['./hra-editorial-board.component.scss']
})

export class HraEditorialBoardComponent {
  boardHeader = boardHeader;
  overviewData = overviewData
  boardMembersData = boardMembersData
  acknowledgmentsData = acknowledgmentsData
}
