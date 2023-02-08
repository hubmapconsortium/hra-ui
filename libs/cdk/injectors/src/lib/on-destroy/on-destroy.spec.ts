import { ComponentRef, ElementRef, inject, NgModuleRef, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { DeepMockProxy, mock, mockDeep, MockProxy } from 'jest-mock-extended';
import { last } from 'rxjs';

import { injectOnDestroy } from './on-destroy';

jest.mock('@angular/core', () => {
  const originalModule = jest.requireActual('@angular/core');

  return {
    __esModule: true,
    ...originalModule,
    inject: jest.fn(),
  };
});

describe(injectOnDestroy, () => {
  const mockedInject = jest.mocked(inject);
  let viewContainer: MockProxy<ViewContainerRef>;
  let component: DeepMockProxy<ComponentRef<unknown>>;

  beforeEach(() => {
    mockedInject.mockReset();
    viewContainer = mock<ViewContainerRef>({ length: 1 });
    component = mockDeep<ComponentRef<unknown>>();

    viewContainer.get.mockImplementation(() => ({} as ViewRef));
    viewContainer.createComponent.mockReturnValue(component);
  });

  it('attaches cleanup to the current view', () => {
    mockedInject.mockReturnValue(viewContainer);
    injectOnDestroy();
    expect(component.hostView.onDestroy).toHaveBeenCalled();
  });

  it('creates a single observable when called multiple times', () => {
    mockedInject.mockReturnValue(viewContainer);
    viewContainer.get.mockReturnValue(component.hostView);
    injectOnDestroy();
    injectOnDestroy();
    expect(component.hostView.onDestroy).toHaveBeenCalledTimes(1);
  });

  it('emits and completes when the view is destroyed', (done) => {
    mockedInject.mockReturnValue(viewContainer);
    injectOnDestroy().pipe(last()).subscribe({
      error: done.fail,
      complete: done,
    });

    component.hostView.onDestroy.mock.lastCall[0]();
  });

  it('attaches to the closest module if there is no view', () => {
    const module = mock<NgModuleRef<unknown>>();
    mockedInject.mockReturnValueOnce(null).mockReturnValueOnce(module);
    injectOnDestroy();
    expect(module.onDestroy).toHaveBeenCalled();
  });

  it('attaches a host component that removes itself from the dom', () => {
    mockedInject.mockReturnValue(viewContainer);
    injectOnDestroy();

    const ref = mockDeep<ElementRef<HTMLElement>>();
    const type = viewContainer.createComponent.mock.lastCall[0] as unknown as Type<unknown>;

    mockedInject.mockReturnValue({ nativeElement: null });
    expect(() => new type()).not.toThrow();

    mockedInject.mockReturnValue(ref);
    expect(() => new type()).not.toThrow();
    expect(ref.nativeElement.remove).toHaveBeenCalled();
  });
});
