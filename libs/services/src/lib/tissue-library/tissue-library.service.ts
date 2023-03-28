import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TissueLibraryService {
  abstract getTissues(): Observable<void>;
  // constructor() { }
}
