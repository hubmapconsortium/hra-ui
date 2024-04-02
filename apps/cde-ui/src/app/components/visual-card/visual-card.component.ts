import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VisualCard {
  cardImage: string;
  cardLabel: string;
}
@Component({
  selector: 'cde-visual-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visual-card.component.html',
  styleUrl: './visual-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualCardComponent {
  @Input() cardData: VisualCard[] = [
    {
      cardImage: '../../assets/intestine.svg',
      cardLabel: 'Explore 2D Intestine Data',
    },
    {
      cardImage: '../../assets/skin.svg',
      cardLabel: 'Explore 3D Skin Data',
    },
    {
      cardImage: '../../assets/tonsil.svg',
      cardLabel: 'Create a Visualization',
    },
  ];
}
