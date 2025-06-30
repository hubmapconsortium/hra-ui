import { NgModule } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconComponent } from '@hra-ui/design-system/icons';
import { TableComponent } from '@hra-ui/design-system/table';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { HraApiModule, HraApiConfiguration } from '@hra-api/ng-client';
import { AnalyticsModule } from 'ccf-shared/analytics';
import { environment } from '../environments/environment';
import { StoreModule } from './store/store.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataSourceService, ApiEndpointDataSourceService } from 'ccf-shared';
import { OrganComponent } from './components/organ/organ.component';

@NgModule({
  imports: [
    BrowserModule,
    OrganComponent,
    IconComponent,
    MatIcon,
    MatIconButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    ButtonsModule,
    TableComponent,
    MatMenuModule,
    MatDivider,
    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,
      appName: 'organ-info',
      projectName: 'ccf',
      developmentMode: !environment.production,
    }),
    HraApiModule.forRoot(
      () =>
        new HraApiConfiguration({
          basePath: environment.dbOptions.remoteApiEndpoint,
        }),
    ),
    StoreModule,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    provideDesignSystem(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: DataSourceService, useExisting: ApiEndpointDataSourceService },
  ],
})
export class AppModule {}
