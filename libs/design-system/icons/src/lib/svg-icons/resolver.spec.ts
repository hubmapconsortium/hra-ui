import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { createSvgIconResolver, registerSvgIconResolver } from './resolver';
import { mock } from 'jest-mock-extended';
import { MatIconRegistry } from '@angular/material/icon';

describe('createSvgIconResolver()', () => {
  it('returns a resolver function', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const resolver = TestBed.runInInjectionContext(() => createSvgIconResolver());
    expect(typeof resolver).toEqual('function');

    const safeUrl = resolver('foo', 'bar');
    const url = sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
    expect(url).toEqual('assets/icons/bar/foo.svg');
  });
});

describe('registerSvgIconResolver()', () => {
  it('register a resolver on `MatIconRegistry`', () => {
    const registry = mock<MatIconRegistry>();
    TestBed.configureTestingModule({ providers: [{ provide: MatIconRegistry, useValue: registry }] });
    TestBed.runInInjectionContext(() => registerSvgIconResolver());

    expect(registry.addSvgIconResolver).toHaveBeenCalledTimes(1);
  });
});
