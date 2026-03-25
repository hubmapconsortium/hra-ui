import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerComponent } from '@hra-ui/design-system/indicators/progress-spinner';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UIState, UIStateModel } from '../../store/ui.state';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, ProgressSpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  @Select(UIState) loadingText$!: Observable<UIStateModel>;

  protected readonly data = signal(inject<string>(MAT_DIALOG_DATA));

  ngOnInit(): void {
    this.loadingText$.subscribe(({ loadingText }) => this.data.set(loadingText));
  }
}
