import { BottomToolbarComponent } from './bottom-toolbar.component';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [BottomToolbarComponent],
    imports: [
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [
        BottomToolbarComponent,
        MatButtonModule
    ]
})

export class BottomToolbarModule{}