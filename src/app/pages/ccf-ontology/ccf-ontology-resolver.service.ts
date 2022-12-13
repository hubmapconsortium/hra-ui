import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from 'src/app/services/content/content.service';

@Injectable({
    providedIn: 'root'
  })
 
export class CcfOntologyResolver implements Resolve<string> {

    constructor(private readonly contentService: ContentService){
    }

    resolve(route: ActivatedRouteSnapshot): Observable<string> {
        const file = route.data['contentFile'];
        return this.contentService.getContent(file);
    }
}