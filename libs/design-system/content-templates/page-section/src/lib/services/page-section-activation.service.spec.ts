import { ElementRef, InjectionToken, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { INTERSECTION_OBSERVER } from '@hra-ui/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { providePageSectionNavigation } from '../providers';
import { PageSectionActivationOptions, PageSectionActivationService } from './page-section-activation.service';
import { PageSectionInstance, PageSectionService } from './page-section.service';

describe('PageSectionActivationService', () => {
  let sectionService: PageSectionService;
  let activationService: PageSectionActivationService;
  let observer: MockProxy<IntersectionObserver>;
  let observerConstructor: jest.Mock<IntersectionObserver, ConstructorParameters<typeof IntersectionObserver>>;
  let section1: PageSectionInstance;
  let section2: PageSectionInstance;

  function createPageSectionInstance(anchor?: string): PageSectionInstance {
    return {
      tagline: signal(''),
      level: signal(1),
      anchor: signal(anchor),
      elementRef: signal(new ElementRef(mock<Element>())),
    };
  }

  function setup(options?: PageSectionActivationOptions, mockObserver = true): void {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: INTERSECTION_OBSERVER,
          useValue: mockObserver ? observerConstructor : undefined,
        },
        ...providePageSectionNavigation(options),
      ],
    });

    sectionService = TestBed.inject(PageSectionService);
    activationService = TestBed.inject(PageSectionActivationService);

    sectionService.addSection(section1);
    sectionService.addSection(section2);

    TestBed.flushEffects();
  }

  beforeEach(() => {
    observer = mock();
    observerConstructor = jest.fn().mockReturnValue(observer);
    section1 = createPageSectionInstance('abc');
    section2 = createPageSectionInstance('def');
  });

  it('returns undefined when there is no active section', () => {
    setup();
    expect(activationService.activeSection()).toBeUndefined();
  });

  it('can manually set the active section', () => {
    setup({}, false);
    activationService.activate(section1);
    expect(activationService.activeSection()).toBe(section1);
    sectionService.removeSection(section1);
    TestBed.flushEffects();
    expect(activationService.activeSection()).toBeUndefined();
  });

  it('sets the active section when it is intersecting the viewport', () => {
    setup();
    const callback = observerConstructor.mock.calls[0][0];
    callback(
      [
        {
          isIntersecting: true,
          target: section2.elementRef().nativeElement,
        } as IntersectionObserverEntry,
      ],
      observer,
    );

    expect(activationService.activeSection()).toBe(section2);
  });

  describe('resolving the root element', () => {
    it('queries the document if it is a selector', () => {
      const spy = jest.spyOn(document, 'querySelector');
      setup({ root: '#root' });
      expect(spy).toHaveBeenCalledWith('#root');
    });

    it('injects root if it is a token', () => {
      const element = mock<Element>();
      const factory = jest.fn(() => element);
      const token = new InjectionToken('root element', { providedIn: 'root', factory });
      setup({ root: token });
      expect(factory).toHaveBeenCalled();
    });
  });
});
