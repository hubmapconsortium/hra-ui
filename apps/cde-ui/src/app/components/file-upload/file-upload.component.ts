import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, input, output, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileLoader, FileLoaderEvent } from '@hra-ui/cde-visualization';
import { reduce, Subscription } from 'rxjs';

import { FileError } from '../../pages/create-visualization-page/create-visualization-page.component';

/** Component for loading a file from disk */
@Component({
  selector: 'cde-file-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent<T, OptionsT> {
  /** Title */
  readonly fileTitle = input<string>();
  /** Accepted file types */
  readonly accept = input.required<string>();
  /** File loader */
  readonly loader = input.required<Type<FileLoader<T, OptionsT>>>();
  /** File loader options */
  readonly options = input.required<OptionsT>();

  /** Progress events */
  readonly progress = output<number>();
  /** Loading start events */
  readonly loadStarted = output<File>();
  /** Loading cancelled events */
  readonly loadCancelled = output<void>();
  /** Loading error events */
  readonly loadErrored = output<FileError>();
  /** Loading completed events */
  readonly loadCompleted = output<T[]>();

  /** Loaded file */
  file?: File;

  /** Reference to injector */
  private readonly injector = inject(Injector);

  private subscription?: Subscription;

  /**
   * Loads a file
   *
   * @param el Input element
   */
  load(el: HTMLInputElement): void {
    if (el.files === null) {
      return;
    } else if (this.subscription) {
      this.cancelLoad();
    }

    const { injector, loader, options } = this;
    const file = (this.file = el.files[0]);
    if (!this.accept().split(',').includes(file.type)) {
      const match = file.name.match(/\.(.+)$/);
      this.cancelLoad({
        type: 'incorrect-file-type',
        expected: this.accept(),
        received: match ? match[1] : undefined,
      });
      return;
    }

    const loaderInstance = injector.get(loader());
    const event$ = loaderInstance.load(file, options());
    const data$ = event$.pipe(reduce((acc, event) => this.handleLoadEvent(acc, event), [] as T[]));

    this.subscription = data$.subscribe({
      next: (data) => this.loadCompleted.emit(data),
      error: (error) => this.cancelLoad(error),
    });
  }

  /**
   * Cancels the currently loading file
   */
  cancelLoad(error?: FileError): void {
    this.subscription?.unsubscribe();
    this.file = undefined;
    this.subscription = undefined;

    if (error) {
      this.loadErrored.emit(error);
    } else {
      this.loadCancelled.emit();
    }
  }

  private handleLoadEvent(acc: T[], event: FileLoaderEvent<T>): T[] {
    if (event.type === 'data') {
      acc.push(event.data);
    } else if (event.type === 'progress' && event.total !== undefined) {
      this.progress.emit(event.loaded / event.total);
    }

    return acc;
  }
}
