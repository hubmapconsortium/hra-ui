import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

/**
 * Component for header
 */
@Component({
  selector: 'cde-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, AssetUrlPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
