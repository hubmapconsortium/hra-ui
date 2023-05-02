import { NgModule } from '@angular/core';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { CommonModule } from '@angular/common';
import { OrganVersionComponent } from './organ-version.component';
import { OrganTabsModule } from '../organ-tabs/organ-tabs.module';


@NgModule({
    declarations: [OrganVersionComponent],
    imports: [
        CommonModule,
        ChooseVersionModule,
        OrganTabsModule
    ],
    exports: [OrganVersionComponent]
})

export class OrganVersionModule { }