import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        BrowserAnimationsModule
    ],
    exports: [
        ToolbarComponent
    ]
})

export class ToolbarModule{}