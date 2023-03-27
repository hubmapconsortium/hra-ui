import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TissueLibraryService {
  abstract setActiveTissue(): Observable<void>;
  // constructor() { }
}
