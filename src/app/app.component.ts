import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccf';

  constructor(private readonly router: Router, private readonly activated: ActivatedRoute) { }

  onPageChange() {
    setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.activated,
        preserveFragment: true
      });
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
}
