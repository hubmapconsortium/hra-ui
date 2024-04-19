import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Signal, effect, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface FileLoaderOptions {
  signal: AbortSignal;
}

export interface FileLoaderResult<T> {
  progress: Signal<number>;
  result: Promise<T>;
}

export type FileLoader<T> = (file: File, options: FileLoaderOptions) => FileLoaderResult<T>;

type CleanupFn = () => void;

@Component({
  selector: 'cde-file-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent<T> {
  readonly fileTitle = input<string>();
  readonly accept = input.required<string>();
  readonly loader = input.required<FileLoader<T>>();

  readonly progress = output<number>();
  readonly loadStarted = output<File>();
  readonly loadCancelled = output<void>();
  readonly loadErrored = output<unknown>();
  readonly loadCompleted = output<T>();

  private readonly injector = inject(Injector);

  file?: File;
  private cleanup: CleanupFn[] = [];

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

  cancelLoad(): void {
    this.runCleanup(this.cleanup);
    this.file = undefined;
    this.loadCancelled.emit();
  }

  private runCleanup(fns: CleanupFn[]): void {
    for (const fn of fns) {
      fn();
    }
  }

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
