import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, input, output, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileLoader, FileLoaderEvent } from '@hra-ui/cde-visualization';
import { reduce, Subscription } from 'rxjs';

/**
 * Error when wrong file type is uploaded
 */
export interface FileTypeError {
  /** Error type */
  type: 'type-error';
  /** Expected file type */
  expected: string;
  /** Received file type */
  received?: string;
}

/**
 * Error encountered during file parsing
 */
export interface FileParseError {
  /** Error type */
  type: 'parse-error';
  /** Cause of error */
  cause: unknown;
}

/** Combined file load error type */
export type FileLoadError = FileTypeError | FileParseError;

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

  /** Nodes upload error message */
  readonly nodesErrorMessage = input<string>();
  /** Color upload error message */
  readonly colorErrorMessage = input<string>();

  /** Nodes upload error instructions */
  readonly nodesErrorInstructions = input<string>();
  /** Color upload error instructions */
  readonly colorErrorInstructions = input<string>();

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
  readonly loadErrored = output<FileLoadError>();
  /** Loading completed events */
  readonly loadCompleted = output<T[]>();

  /** Loaded file */
  file?: File;

  /** Reference to injector */
  private readonly injector = inject(Injector);

  /** Subscription for data observable */
  private subscription?: Subscription;

  /**
   * Resets subscriptions and uploaded file
   */
  reset(): void {
    this.subscription?.unsubscribe();
    this.file = undefined;
    this.subscription = undefined;
  }

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
    if (!this.hasAcceptableFileType(file)) {
      this.cancelLoad({
        type: 'type-error',
        expected: this.accept(),
        received: this.getFileSuffix(file).slice(1),
      });
      return;
    }

    const loaderInstance = injector.get(loader());
    const event$ = loaderInstance.load(file, options());
    const data$ = event$.pipe(reduce((acc, event) => this.handleLoadEvent(acc, event), [] as T[]));

    this.subscription = data$.subscribe({
      next: (data) => this.loadCompleted.emit(data),
      error: (error) =>
        this.cancelLoad({
          type: 'parse-error',
          cause: error,
        }),
    });
  }

  /**
   * Cancels the currently loading file
   */
  cancelLoad(error?: FileLoadError): void {
    this.reset();
    if (error) {
      this.loadErrored.emit(error);
    } else {
      this.loadCancelled.emit();
    }
  }

  /**
   * Handles a load event; returns data array or emits progress data
   */
  private handleLoadEvent(acc: T[], event: FileLoaderEvent<T>): T[] {
    if (event.type === 'data') {
      acc.push(event.data);
    } else if (event.type === 'progress' && event.total !== undefined) {
      this.progress.emit(event.loaded / event.total);
    }

    return acc;
  }

  /**
   * Checks whether a file is one of the `accept()` file types.
   * This does not guarantee that the file has the correct content so the loader should
   * check for errors too.
   *
   * @param file File to check
   * @returns true if the file matches one of the accepted file types
   */
  private hasAcceptableFileType(file: File): boolean {
    const types = this.accept().split(',');
    return types.includes(file.type) || types.includes(this.getFileSuffix(file));
  }

  /**
   * Gets file suffix including the leading '.'
   *
   * @param file File to extract suffix from
   * @returns The suffix part of the file name or an empty string if the file does not have a suffix
   */
  private getFileSuffix(file: File): string {
    return file.name.match(/\.[^.]+$/i)?.[0] ?? '';
  }
}
