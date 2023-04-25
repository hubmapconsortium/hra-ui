import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TissueFtuService {
  private http = inject(HttpClient);

  getReferenceOrgans(): Observable<unknown> {
    return this.http.get('');
  }
}
