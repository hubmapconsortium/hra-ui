import { Directive, input } from '@angular/core';

@Directive({
  selector: '[hraDashboardOutlet]',
  standalone: true,
})
export class DashboardOutletDirective {
  readonly spec = input<unknown>();
}
