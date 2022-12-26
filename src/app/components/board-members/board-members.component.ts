import { Component, Input } from '@angular/core';
import { BoardMemberItems } from './board-members';

@Component({
  selector: 'ccf-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.scss']
})
export class BoardMembersComponent {
  @Input() membersData: BoardMemberItems[];
}
