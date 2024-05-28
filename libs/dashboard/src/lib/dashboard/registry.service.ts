import { Injectable } from '@angular/core';
import { AnyDashboardComponentType } from './component.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardComponentRegistryService {
  private readonly components = new Map<string, AnyDashboardComponentType>();
}
