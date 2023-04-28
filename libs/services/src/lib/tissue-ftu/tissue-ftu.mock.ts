import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceOrgan, TissueFtuService } from './tissue-ftu.service';

/** Implementation of TissueFtuService */
@Injectable({
  providedIn: 'root',
})
export class MockTissueFtuService extends TissueFtuService {
  /** Injects http Client */
  private readonly http = inject(HttpClient);

  /** Implementation of getReferenceOrgans method */
  getReferenceOrgans(): Observable<ReferenceOrgan[]> {
    return this.http.get<ReferenceOrgan[]>('');
  }
}
