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
import { OrganModule } from './components/organ/organ.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    OrganModule,
    IconComponent,
    MatIcon,
    MatIconButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    ButtonsModule,
    TableComponent,
    MatMenuModule,
    MatDivider,
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [provideDesignSystem()],
})
export class AppModule {}
