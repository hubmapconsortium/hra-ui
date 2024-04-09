import { Component, Input } from '@angular/core';
import { CopyClipBoard } from './copy-clipboard';
import { Clipboard } from '@angular/cdk/clipboard';

/** Displayes a card with API information with a copy button */
@Component({
  selector: 'copy-clipboard',
  templateUrl: './copy-clipboard.component.html',
  styleUrls: ['./copy-clipboard.component.scss'],
})
export class CopyClipboardComponent {
  /** Details of the APIs and buttons */
  @Input() clipBoardData: CopyClipBoard[] = [];

  /** Initializes Clipboard */
  constructor(private clipboard: Clipboard) {}

  /** Copies data inside the card to clipboard */
  copyData(request: string) {
    const splitted = request.split(' ');
    const url = splitted[1];
    this.clipboard.copy(url);
  }
}
