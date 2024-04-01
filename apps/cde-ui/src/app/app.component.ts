import { Component } from '@angular/core';
import { CreateVisualizationPageComponent } from './pages/create-visualization-page/create-visualization-page.component';

@Component({
  standalone: true,
  imports: [CreateVisualizationPageComponent],
  selector: 'cde-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cde-ui';
}
