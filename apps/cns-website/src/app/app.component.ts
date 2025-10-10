import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Main application component
 */
@Component({
  imports: [HraCommonModule, RouterModule],
  selector: 'cns-website',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
