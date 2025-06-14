import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { REGISTRY } from '../static/docs';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private readonly http = inject(HttpClient);

  /**
   * List of all the docs pages
   */
  REGISTRY = REGISTRY;

  /**
   * Behavior subject to return the markdown
   */
  docsData = new BehaviorSubject<string>('');

  getData(title: string) {
    const index = REGISTRY.map((e) => e.urlTitle).indexOf(title);
    this.http.get(REGISTRY[index].path, { responseType: 'text' }).subscribe((data) => {
      this.docsData.next(data);
    });
  }

  getID(title: string) {
    return REGISTRY.map((e) => e.urlTitle).indexOf(title);
  }

  getTitle(id: number) {
    return REGISTRY[id].urlTitle;
  }
}
