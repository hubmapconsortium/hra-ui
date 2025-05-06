import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { providePageSectionNavigation } from '../providers';
import { PageSectionInstance, PageSectionService } from './page-section.service';

describe('PageSectionService', () => {
  let service: PageSectionService;

  function createPageSectionInstance(anchor?: string): PageSectionInstance {
    return {
      tagline: signal(''),
      level: signal(1),
      anchor: signal(anchor),
      elementRef: signal(new ElementRef(mock<Element>())),
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...providePageSectionNavigation()],
    });

    service = TestBed.inject(PageSectionService);
  });

  it('can add and remove sections', () => {
    const section = createPageSectionInstance();
    service.addSection(section);
    expect(service.sections()).toEqual([section]);
    service.removeSection(section);
    expect(service.sections()).toEqual([]);
  });

  it('filters linkable sections', () => {
    const section1 = createPageSectionInstance('abc');
    const section2 = createPageSectionInstance();
    service.addSection(section1);
    service.addSection(section2);
    expect(service.linkableSections()).toEqual([section1]);
  });

  it('sorts sections in dom order', () => {
    const section1 = createPageSectionInstance('abc');
    const section2 = createPageSectionInstance('def');
    jest
      .mocked(section1.elementRef().nativeElement)
      .compareDocumentPosition.mockReturnValue(Node.DOCUMENT_POSITION_FOLLOWING);
    jest
      .mocked(section2.elementRef().nativeElement)
      .compareDocumentPosition.mockReturnValue(Node.DOCUMENT_POSITION_PRECEDING);
    service.addSection(section1);
    service.addSection(section2);
    expect(service.sortedSections()).toEqual([section1, section2]);
  });
});
