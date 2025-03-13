import { Component, Input, inject } from '@angular/core';
import { CopyClipBoard } from './copy-clipboard';
import { Clipboard } from '@angular/cdk/clipboard';

/** Displayes a card with API information with a copy button */
@Component({
  selector: 'copy-clipboard',
  templateUrl: './copy-clipboard.component.html',
  styleUrls: ['./copy-clipboard.component.scss'],
  standalone: false,
})
export class CopyClipboardComponent {
  private readonly clipboard = inject(Clipboard);

  /** Details of the APIs and buttons */
  @Input() clipBoardData: CopyClipBoard[] = [];

  /** Copies data inside the card to clipboard */
  copyData(request: string) {
    const splitted = request.split(' ');
    const url = splitted[1];
    this.clipboard.copy(url);
  }
}
