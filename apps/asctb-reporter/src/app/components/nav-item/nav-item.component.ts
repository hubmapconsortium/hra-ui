import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  standalone: false,
})
export class NavItemComponent {
  @Input() label = '';
  @Input() disabled = false;
}
