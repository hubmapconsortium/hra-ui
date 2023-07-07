import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TissueLibrary } from './tissue-library.model';

/** Service for loading the tissue library */
@Injectable()
export abstract class TissueLibraryService {
  /** Loads the entire tissue library */
  abstract getTissueLibrary(): Observable<TissueLibrary>;
}
