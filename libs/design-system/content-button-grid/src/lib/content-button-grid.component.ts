import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';

interface ContentButton {
  imageSrc: string;
  date: string;
  tagline: string;
  category: string;
  tag: string;
  featured: boolean;
  link: string;
  external: boolean;
}

@Component({
  selector: 'hra-content-button-grid',
  imports: [HraCommonModule, ContentButtonComponent, MatButtonToggleModule],
  templateUrl: './content-button-grid.component.html',
  styleUrl: './content-button-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentButtonGridComponent {
  readonly cardData = input.required<ContentButton[]>();

  readonly categories = input<string[]>(['publications', 'news']);

  readonly currentCategory = signal<string>('featured');

  readonly filteredCards = computed(() => {
    const category = this.currentCategory();
    if (category === 'featured') {
      return this.cardData().filter((card) => card.featured);
    }
    return this.cardData().filter((card) => card.category === category);
  });
}
