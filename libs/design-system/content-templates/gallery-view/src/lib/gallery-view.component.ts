import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HraCommonModule } from '@hra-ui/common';
import { CardsModule } from '@hra-ui/design-system/cards';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';

@Component({
  selector: 'hra-gallery-view',
  imports: [HraCommonModule, GridContainerComponent, CardsModule, SearchFilterComponent],
  templateUrl: './gallery-view.component.html',
  styleUrl: './gallery-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryViewComponent {
  readonly totalCount = model(0);
  readonly viewingCount = model(0);

  search(event: any) {
    console.log(event);
  }
}
