import { ComponentRef, ElementRef, NgModuleRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mockDeep } from 'jest-mock-extended';
import { Observable } from 'rxjs';
import { DestructorScope } from './destructor-subject';
import { injectDestroy$ } from './on-destroy';

describe('injectDestroy$()', () => {
  function setKeyWithScope<T = unknown>(
    keyToken: unknown = NgModuleRef,
    scopeToken: unknown = NgModuleRef,
    keyImpl?: object,
    scopeImpl?: object
  ) {
    const key = mockDeep(keyImpl);
    const scope = mockDeep<DestructorScope & T>(scopeImpl as never);
    TestBed.overrideProvider(keyToken, { useValue: key });
    TestBed.overrideProvider(scopeToken, { useValue: scope });
    return [key, scope] satisfies [unknown, unknown];
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
    setKeyWithScope();
  });

  it('should return an observable', () => {
    const res = TestBed.runInInjectionContext(injectDestroy$);
    expect(res).toBeInstanceOf(Observable);
  });

  it('should return the same observable when run multiple times in the same context', () => {
    const res1 = TestBed.runInInjectionContext(injectDestroy$);
    const res2 = TestBed.runInInjectionContext(injectDestroy$);
    expect(res1).toBe(res2);
  });

  it('should use the dom element as key if it exists', () => {
    const spy = jest.fn(() => ({}));
    setKeyWithScope(ElementRef, undefined, {
      get nativeElement() {
        return spy();
      },
      set nativeElement(value: unknown) {
        // Do nothing
      },
    });

    TestBed.runInInjectionContext(injectDestroy$);
    expect(spy).toHaveBeenCalled();
  });

  it('should use the view container as scope if it exists', () => {
    const ref = mockDeep<ComponentRef<unknown>>({ location: { nativeElement: null } });
    const [, vcr] = setKeyWithScope<ViewContainerRef>(NgModuleRef, ViewContainerRef);
    vcr.createComponent.mockReturnValue(ref);
    TestBed.runInInjectionContext(injectDestroy$);
    expect(ref.onDestroy).toHaveBeenCalled();
  });
});
