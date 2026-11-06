import { ApplicationRef, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { focusAfterNextRender } from './focus';

describe('focusAfterNextRender()', () => {
  let container: HTMLElement;
  let inside: HTMLButtonElement;
  let target: HTMLButtonElement;
  let outside: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    inside = document.createElement('button');
    target = document.createElement('button');
    outside = document.createElement('button');
    container.append(inside, target);
    document.body.append(container, outside);
  });

  afterEach(() => {
    container.remove();
    outside.remove();
  });

  function run(force?: boolean): void {
    focusAfterNextRender(container, () => target, TestBed.inject(Injector), force);
    TestBed.inject(ApplicationRef).tick();
  }

  it('should focus the target when focus is inside the container', () => {
    inside.focus();
    run();
    expect(document.activeElement).toBe(target);
  });

  it('should leave focus alone when it is outside the container', () => {
    outside.focus();
    run();
    expect(document.activeElement).toBe(outside);
  });

  it('should focus the target when forced', () => {
    outside.focus();
    run(true);
    expect(document.activeElement).toBe(target);
  });
});
