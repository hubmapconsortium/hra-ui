import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventWriterService {
  write(_event: string, _data: object, _meta: object): void {
    //
  }
}
