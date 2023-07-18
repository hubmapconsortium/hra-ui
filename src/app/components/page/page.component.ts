import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, isDevMode, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { ContentService } from '../../services/content/content.service';
import { PageDef } from '../page-element/page-def';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  readonly data$ = this.resolveData();

  private readonly LANDING_PAGE_FILE = 'landing-page';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly errorHandler: ErrorHandler,
    private readonly contentService: ContentService
  ) {
    this.addScrollToTopListener();
  }

  private resolveData(): Observable<PageDef[]> {
    const loadData = (file: string) => this.contentService.getContent(file).pipe(
      catchError((error) => {
        if (isDevMode() && (!(error instanceof HttpErrorResponse) || error.status !== 404)) {
          this.errorHandler.handleError(error);
        }
        this.router.navigateByUrl('');
        return this.contentService.getContent(this.LANDING_PAGE_FILE);
      })
    );
    return this.route.url.pipe(
      map(() => this.router.routerState.snapshot.url),
      map(url => this.getFileName(url)),
      switchMap(loadData)
    )
  }

  private addScrollToTopListener(): void {
    this.route.url.pipe(distinctUntilChanged()).subscribe(() => {
      setTimeout(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          preserveFragment: true
        });
      })
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  private getFileName(url: string): string {
    return url.slice(1).split('#')[0].split('?')[0] || this.LANDING_PAGE_FILE;
  }
}
