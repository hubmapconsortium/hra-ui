import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Signal, effect, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** Loader options */
export interface FileLoaderOptions {
  /** Signal to stop loading */
  signal: AbortSignal;
}

/** Result from a file loader callback */
export interface FileLoaderResult<T> {
  /** Signal of current progress in range [0, 1] */
  progress: Signal<number>;
  /** Promise resolving to the loaded data */
  result: Promise<T>;
}

/** File loader function */
export type FileLoader<T> = (file: File, options: FileLoaderOptions) => FileLoaderResult<T>;

/** Cleanup function */
type CleanupFn = () => void;

/** Component for loading a file from disk */
@Component({
  selector: 'cde-file-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent<T> {
  /** Title */
  readonly fileTitle = input<string>();
  /** Accepted file types */
  readonly accept = input.required<string>();
  /** File loader */
  readonly loader = input.required<FileLoader<T>>();

  /** Progress events */
  readonly progress = output<number>();
  /** Loading start events */
  readonly loadStarted = output<File>();
  /** Loading cancelled events */
  readonly loadCancelled = output<void>();
  /** Loading error events */
  readonly loadErrored = output<unknown>();
  /** Loading completed events */
  readonly loadCompleted = output<T>();

  /** Reference to injector */
  private readonly injector = inject(Injector);

  /** Loaded file */
  file?: File;
  /** Cleanup functions */
  private cleanup: CleanupFn[] = [];

  /**
   * Loads a file
   *
   * @param el Input element
   */
  load(el: HTMLInputElement): void {
    if (el.files === null) {
      return;
    }

    const { loader, injector, progress, loadStarted } = this;
    const file = (this.file = el.files[0]);
    const cleanup: CleanupFn[] = (this.cleanup = []);
    const abortController = new AbortController();
    const options: FileLoaderOptions = {
      signal: abortController.signal,
    };
    const result = loader()(file, options);
    let done = false;

    el.files = null;
    loadStarted.emit(file);
    const progressRef = effect(() => progress.emit(result.progress()), { injector, manualCleanup: true });
    this.handleResult(result.result, cleanup, () => done);

    cleanup.push(
      () => (done = true),
      () => progressRef.destroy(),
      () => abortController.abort(),
    );
  }

  /**
   * Cancels the currently loading file
   */
  cancelLoad(): void {
    this.runCleanup(this.cleanup);
    this.file = undefined;
    this.loadCancelled.emit();
  }

  /**
   * Runs a set of cleanup functions
   *
   * @param fns Cleanup functions to run
   */
  private runCleanup(fns: CleanupFn[]): void {
    for (const fn of fns) {
      fn();
    }
  }

  /**
   * Processes the result of a loader
   *
   * @param result Promise resolving to the loaded data
   * @param cleanup Cleanup function to run at the end
   * @param isDone Query function returning whether the loading has cancelled
   */
  private async handleResult(result: Promise<T>, cleanup: CleanupFn[], isDone: () => boolean): Promise<void> {
    const { progress, loadErrored, loadCompleted } = this;
    try {
      const data = await result;
      if (!isDone()) {
        progress.emit(1);
        loadCompleted.emit(data);
      }
    } catch (reason) {
      if (!isDone()) {
        this.file = undefined;
        loadErrored.emit(reason);
      }
    } finally {
      this.runCleanup(cleanup);
    }
  }
}
