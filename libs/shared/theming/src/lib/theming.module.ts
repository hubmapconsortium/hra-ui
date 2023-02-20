import { NgModule } from '@angular/core';
import { MaterialCssVarsModule } from 'angular-material-css-vars';

/** Configures global theming */
@NgModule({
  imports: [MaterialCssVarsModule.forRoot({})],
})
export class ThemingModule {}
