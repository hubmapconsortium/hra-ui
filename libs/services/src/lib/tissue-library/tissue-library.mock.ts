import { Injectable } from '@angular/core';
import { TISSUE_DATA_SCHEMA, TissueData, TissueLibraryService } from './tissue-library.service';
import { Observable, defer, of } from 'rxjs';

const MOCK_TISSUE_DATA = TISSUE_DATA_SCHEMA.parse({
  root: 'http://example.com/root',
  nodes: {
    'http://example.com/node1': {
      '@type': 'RootType',
      '@id': 'http://example.com/node1',
      id: 'http://example.com/node1',
      parent: '',
      label: 'Node 1',
      synonymLabels: ['Synonym 1', 'Synonym 2', 'Synonym 3'],
      children: [],
    },
    'http://example.com/node2': {
      '@type': 'RootType',
      '@id': 'http://example.com/node2',
      id: 'http://example.com/node2',
      parent: '',
      label: 'Node 2',
      synonymLabels: ['Synonym 4', 'Synonym 5', 'Synonym 6'],
      children: ['http://example.com/node3'],
    },
    'http://example.com/node3': {
      '@type': 'RootType',
      '@id': 'http://example.com/node3',
      id: 'http://example.com/node3',
      parent: '',
      label: 'Node 3',
      synonymLabels: [],
      children: [],
    },
  },
});

@Injectable({
  providedIn: 'root',
})
export class MockTissueLibraryService extends TissueLibraryService {
  getTissues(): Observable<TissueData> {
    return of(MOCK_TISSUE_DATA);
  }
}
