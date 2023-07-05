import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, switchMap } from 'rxjs';
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
  ) { }

  private resolveData(): Observable<PageDef[]> {
    const loadData = (file: string) => this.contentService.getContent<PageDef[]>(file).pipe(
      catchError((error) => {
        if (!(error instanceof HttpErrorResponse) || error.status !== 404) {
          this.errorHandler.handleError(error);
        }

        this.router.navigateByUrl('');
        return this.contentService.getContent<PageDef[]>(this.LANDING_PAGE_FILE);
      })
    );

    return this.route.url.pipe(
      map(() => this.router.routerState.snapshot.url),
      map(url => this.getFileName(url)),
      switchMap(loadData)
    )
  }

  private getFileName(url: string): string {
    return url.slice(1).split('#')[0] || this.LANDING_PAGE_FILE;
  }
}
