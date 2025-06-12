import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UIState, UIStateModel } from '../../store/ui.state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: false,
})
export class LoadingComponent implements OnInit {
  data = inject<string>(MAT_DIALOG_DATA);

  @Select(UIState) loadingText$!: Observable<UIStateModel>;

  ngOnInit(): void {
    this.loadingText$.subscribe((l) => {
      this.data = l.loadingText;
    });
  }
}
