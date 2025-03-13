import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, isDevMode, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { ContentService } from '../../services/content/content.service';
import { PageDef } from '../page-element/page-def';

/** Calls page renderer with data from yaml files*/
@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: false,
})
export class PageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly contentService = inject(ContentService);

  /** Observable of file content */
  readonly data$ = this.resolveData();

  /** Landing page file name */
  private readonly LANDING_PAGE_FILE = 'landing-page';

  /** Creates instance of Router, ActivatedRoute, ErrorHandler,
   * ContentService and invokes addScrollToTopListener */
  constructor() {
    this.addScrollToTopListener();
  }

  /** Returns an observable of page content */
  private resolveData(): Observable<PageDef[]> {
    const loadData = (file: string) =>
      this.contentService.getContent(file).pipe(
        catchError((error) => {
          if (isDevMode() && (!(error instanceof HttpErrorResponse) || error.status !== 404)) {
            this.errorHandler.handleError(error);
          }
          this.router.navigateByUrl('');
          return this.contentService.getContent(this.LANDING_PAGE_FILE);
        }),
      );
    return this.route.url.pipe(
      map(() => this.router.routerState.snapshot.url),
      map((url) => this.getFileName(url)),
      switchMap(loadData),
    );
  }

  /** Scrolls to the top of the page when the URL is changed */
  private addScrollToTopListener(): void {
    this.route.url.pipe(distinctUntilChanged()).subscribe(() => {
      setTimeout(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          preserveFragment: true,
          queryParamsHandling: 'preserve',
        });
      }, 100);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  }

  /** Returns a valid file name */
  private getFileName(url: string): string {
    return url.slice(1).split('#')[0].split('?')[0] || this.LANDING_PAGE_FILE;
  }
}
