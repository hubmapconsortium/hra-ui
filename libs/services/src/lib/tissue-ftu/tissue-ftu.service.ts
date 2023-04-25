import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

/** Service to fetch reference organs */
@Injectable({
  providedIn: 'root',
})
export class TissueFtuService {
  /** injects http client */
  private http = inject(HttpClient);

  /** Method to fetch reference organs */
  getReferenceOrgans(): Observable<unknown> {
    return this.http.get('');
  }
}
