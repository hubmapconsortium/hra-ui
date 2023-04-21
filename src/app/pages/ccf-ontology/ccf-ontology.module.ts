import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CcfOntologyComponent } from './ccf-ontology.component';
import { SimpleTileModule } from '../../components/simple-tile/simple-tile.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { SimpleImageModule } from '../../components/simple-image/simple-image.module';
import { CardButtonLongModule } from '../../components/card-button-long/card-button-long.module';
import { MarkdownModule } from 'ngx-markdown';
import { AnnouncementCardModule } from '../../components/announcement-card/announcement-card.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';


@NgModule({
  declarations: [
    CcfOntologyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleTileModule,
    PageDataModule,
    SimpleImageModule,
    CardButtonLongModule,
    AnnouncementCardModule,
    PageRendererModule,
    MarkdownModule.forChild()
  ],
  providers: [],
  bootstrap: []
})
export class CcfOntologyModule { }
