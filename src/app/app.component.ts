import { Component } from '@angular/core';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccf';

  onPageChange() {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'auto' 
     });
 }
}
