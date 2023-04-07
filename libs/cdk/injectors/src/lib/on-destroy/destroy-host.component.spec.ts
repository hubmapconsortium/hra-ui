import { ComponentRef, ViewContainerRef } from '@angular/core';
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

    it('should remove the element from the dom', () => {
      const el: Element = ref.location.nativeElement;
      DestroyHostComponent.create(container);
      expect(el.remove).toHaveBeenCalled();
    });

    it('should not fail if the dom element is null', () => {
      const ref2 = mockDeep<ComponentRef<DestroyHostComponent>>({
        location: { nativeElement: null },
      });
      const container2 = mockDeep<ViewContainerRef>();
      container2.createComponent.mockReturnValue(ref2);

      expect(() => DestroyHostComponent.create(container2)).not.toThrow();
    });
  });
});
