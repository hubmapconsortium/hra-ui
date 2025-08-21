import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureDirective } from './feature.directive';

describe('FeatureDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new FeatureDirective();
      expect(directive).toBeTruthy();
    });
  });

  it('should compute path correctly with and without parent', () => {
    @Component({
      template: '<div hraFeature="parent"><div hraFeature="child"></div></div>',
      imports: [FeatureDirective],
    })
    class TestComponent {}

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directives = fixture.debugElement.queryAll((el) => el.providerTokens?.includes(FeatureDirective));

    const parentDirective = directives[0].injector.get(FeatureDirective);
    expect(parentDirective.path()).toBe('parent');

    const childDirective = directives[1].injector.get(FeatureDirective);
    expect(childDirective.path()).toBe('parent.child');
  });
});
