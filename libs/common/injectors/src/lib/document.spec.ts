import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { injectDocument } from './document';

describe('Document Injector', () => {
  it('should inject the document object', () => {
    const mockDocument = { title: 'Test Document' } as Document;

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: mockDocument }],
    });

    TestBed.runInInjectionContext(() => {
      const document = injectDocument();
      expect(document).toBe(mockDocument);
      expect(document.title).toBe('Test Document');
    });
  });
});
