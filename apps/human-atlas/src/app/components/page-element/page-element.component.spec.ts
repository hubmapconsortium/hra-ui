import { NgFor, NgSwitchCase, ViewportScroller } from '@angular/common';
import { Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Shallow } from 'shallow-render';
import { LongCard } from '../card-button-long/long-card';
import { PageDef } from './page-def';
import { PageElementComponent } from './page-element.component';
import { PageElementModule } from './page-element.module';

describe('PageElementComponent', () => {
  let shallow: Shallow<PageElementComponent>;
  const testDef: PageDef = {
    type: 'type',
    key: 'value',
  };

  beforeEach(async () => {
    shallow = new Shallow(PageElementComponent, PageElementModule)
      .withStructuralDirective(NgSwitchCase)
      .withStructuralDirective(NgFor)
      .mock(ActivatedRoute, {
        fragment: from(['', 'anchor']),
      })
      .mock(Router, {
        navigate: jest.fn(),
      })
      .mock(ViewportScroller as never as Type<ViewportScroller>, {
        scrollToAnchor: jest.fn(),
      })
      .mock(Window, { addEventListener: jest.fn() });
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { def: testDef } })).resolves.toBeTruthy();
  });

  it('constructor', async () => {
    const { inject } = await shallow.render({ bind: { def: testDef } });
    const scroller = inject(ViewportScroller);
    expect(scroller.scrollToAnchor).toHaveBeenCalledWith('anchor');
  });

  describe('ngOnInit()', () => {
    it('should return scrolled as true of scroll position is greater than 220', async () => {
      jest.spyOn(window, 'addEventListener').mockImplementation((_type, cb) => (cb as () => void)());
      window.scrollY = 300;

      const { instance } = await shallow.render({ bind: { def: testDef } });
      expect(instance.scrolled).toEqual(true);
    });

    it('should return scrolled as false of scroll position is less than 220', async () => {
      jest.spyOn(window, 'addEventListener').mockImplementation((_type, cb) => (cb as () => void)());
      window.scrollY = 100;

      const { instance } = await shallow.render({ bind: { def: testDef } });
      expect(instance.scrolled).toEqual(false);
    });
  });

  describe('clicked', () => {
    const testCard: LongCard = {
      icon: 'test icon',
      title: 'test title',
      body: 'test body',
      alt: 'test alt',
    };
    it('should navigate to defined route', async () => {
      const { instance, inject } = await shallow.render({
        bind: { def: testDef },
      });
      const router = inject(Router);
      instance.clicked(testCard);
      expect(router.navigate).toHaveBeenCalledWith([testCard.route]);
    });
  });

  describe('scrollTo', () => {
    it('should scroll to desired fragment', async () => {
      const { instance, inject } = await shallow.render({
        bind: { def: testDef },
      });
      instance.scrollTo('id');
      const scroller = inject(ViewportScroller);
      expect(scroller.scrollToAnchor).toHaveBeenCalledWith('id');
    });
  });
});
