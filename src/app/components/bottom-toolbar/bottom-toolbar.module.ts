import { BottomToolbarComponent } from './bottom-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [BottomToolbarComponent],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        BottomToolbarComponent
    ]
})

export class BottomToolbarModule { }