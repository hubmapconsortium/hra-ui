import { signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSidenav } from '@angular/material/sidenav';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { SidebarStore } from './sidebar.store';

jest.mock('@hra-ui/cdk/breakpoints', () => ({
  watchBreakpoint: jest.fn(),
}));

describe('SidebarStore', () => {
  let breakpointSignal: WritableSignal<boolean>;

  const configureStore = (breakpointValue = false) => {
    TestBed.resetTestingModule();
    breakpointSignal = signal(breakpointValue);
    (watchBreakpoint as jest.Mock).mockReturnValue(breakpointSignal);
    TestBed.configureTestingModule({});
    return TestBed.inject(SidebarStore);
  };

  it('starts without a sidebar', () => {
    const store = configureStore();

    expect(store.sidebar()).toBeNull();
    expect(store.hasSidebar()).toBe(false);
  });

  it('sets a sidebar once and then rejects additional registrations', () => {
    const store = configureStore();
    const sidebar = {} as MatSidenav;

    store.setSidebar(sidebar);
    expect(store.sidebar()).toBe(sidebar);
    expect(store.hasSidebar()).toBe(true);
    expect(() => store.setSidebar({} as MatSidenav)).toThrow('Sidebar has already been set.');
  });

  it('clears the sidebar', () => {
    const store = configureStore();

    store.setSidebar({} as MatSidenav);
    store.clearSidebar();

    expect(store.sidebar()).toBeNull();
    expect(store.hasSidebar()).toBe(false);
  });

  it('derives mode from the breakpoint signal', () => {
    const store = configureStore();

    expect(store.mode()).toBe('over');

    breakpointSignal.set(true);
    expect(store.mode()).toBe('side');
  });

  it('initializes isOpen from the breakpoint signal', () => {
    const store = configureStore(true);

    expect(store.isOpen()).toBe(true);
  });

  it('opens, closes, and toggles the sidebar', () => {
    const store = configureStore();

    expect(store.isOpen()).toBe(false);

    store.open();
    expect(store.isOpen()).toBe(true);

    store.close();
    expect(store.isOpen()).toBe(false);

    store.toggle();
    expect(store.isOpen()).toBe(true);

    store.toggle();
    expect(store.isOpen()).toBe(false);
  });
});
