import { Component, Input } from '@angular/core';
import { BoardMemberItems } from './board-members';

/** Displays a card with details of board members */
@Component({
  selector: 'ccf-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.scss'],
  standalone: false,
})
export class BoardMembersComponent {
  /** Details for each board member card */
  @Input() membersData: BoardMemberItems[] = [];
}
