import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkStateModule } from '@hra-ui/cdk/state';
import {
  BiomarkerDetailsWcComponent,
  HeaderBehaviorComponent,
  HraLandingPageIntroWcBehaviourComponent,
  TissueLibraryBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { HraServiceModule } from '@hra-ui/services';
import { HraStateModule } from '@hra-ui/state';
import { ThemingModule } from '@hra-ui/theming';
import { NgxsModule } from '@ngxs/store';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownModule } from 'ngx-markdown';
import { initFactory } from './app.init';

@Component({
  selector: 'hra-root',
  imports: [
    HttpClientModule,
    MatDialogModule,
    InlineSVGModule,
    MarkdownModule,
    NgxsModule,

    ThemingModule,
    CdkStateModule,
    HraServiceModule,
    HraStateModule,

    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
    HraLandingPageIntroWcBehaviourComponent,
    BiomarkerDetailsWcComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  title = 'ftu-ui-small-wc';
}
