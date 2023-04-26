import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';
import { dispatch } from '@hra-ui/cdk/injectors';
import { HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'ftu-screen-size-notice-behavior',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, MatButtonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-size-notice-behavior.component.html',
  styleUrls: ['./screen-size-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeBehaviorComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  url = 'abcd';

  portalClick() {
    console.log('Portal Clicked');
  }

  proceedClick() {
    console.log('Proceed CLicked');
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    // your code here
    if (window.innerWidth < 480) {
      if (window.innerWidth < 480) {
        console.log('here');
        //this.renderer.addClass(this.el.nativeElement, 'show-component');
      } else {
        console.log('here1');
        //this.renderer.removeClass(this.el.nativeElement, 'show-component');
      }
    }
  }
}
