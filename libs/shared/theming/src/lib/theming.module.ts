import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { ThemingState } from './state/theming.state';

/** Configures global theming */
@NgModule({
  imports: [MaterialCssVarsModule.forRoot({}), NgxsModule.forFeature([ThemingState])],
})
export class ThemingModule {}
