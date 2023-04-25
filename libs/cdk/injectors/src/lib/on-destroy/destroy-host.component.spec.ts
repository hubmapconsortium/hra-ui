import { ComponentRef, ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mockDeep } from 'jest-mock-extended';
import { DestroyHostComponent } from './destroy-host.component';

describe('DestroyHostComponent', () => {
  describe('create(container)', () => {
    const container = mockDeep<ViewContainerRef>();
    const ref = mockDeep<ComponentRef<DestroyHostComponent>>();
    container.createComponent.mockReturnValue(ref);

    beforeEach(() => jest.clearAllMocks());

    it('should create a new component at index 0', () => {
      DestroyHostComponent.create(container);
      expect(container.createComponent).toHaveBeenCalledWith(DestroyHostComponent, { index: 0 });
    });

    it('should return a ComponentRef', () => {
      expect(DestroyHostComponent.create(container)).toBe(ref);
    });
  });

  describe('ngAfterViewInit()', () => {
    it('should remove the element from the dom', () => {
      const el = mockDeep<ElementRef<Element>>();
      TestBed.overrideProvider(ElementRef, { useValue: el });

      const comp = TestBed.runInInjectionContext(() => new DestroyHostComponent());
      comp.ngAfterViewInit();
      expect(el.nativeElement.remove).toHaveBeenCalled();
    });
  });
});
