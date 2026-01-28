import { Component, inject, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkPortalOutlet, Portal, TemplatePortal } from '@angular/cdk/portal';
import { HraPortalOutletGroupDirective } from './portal-outlet-group.directive';
import { HraPortalOutletNameDirective } from './portal-outlet-name.directive';

@Component({
  imports: [HraPortalOutletGroupDirective, HraPortalOutletNameDirective, CdkPortalOutlet],
  standalone: true,
  template: `
    <div hraPortalOutletGroup [portal]="portal()" [activeOutlet]="activeOutlet()">
      <div [hraPortalOutletName]="outletName()"><ng-template cdkPortalOutlet /></div>
    </div>

    <ng-template #portalContent>
      <div class="portal-content">Portal Content</div>
    </ng-template>
  `,
})
class TestHostComponent {
  @ViewChild('portalContent') portalContent!: TemplateRef<unknown>;
  @ViewChild(HraPortalOutletNameDirective) outletDirective!: HraPortalOutletNameDirective;
  @ViewChild(HraPortalOutletGroupDirective) group!: HraPortalOutletGroupDirective;

  private readonly viewContainerRef = inject(ViewContainerRef);

  portal = signal<Portal<unknown> | null>(null);
  activeOutlet = signal<string>('');
  outletName = signal<string>('main');

  createPortal(): TemplatePortal<unknown> {
    return new TemplatePortal(this.portalContent, this.viewContainerRef);
  }
}

@Component({
  imports: [HraPortalOutletNameDirective, CdkPortalOutlet],
  standalone: true,
  template: ` <div hraPortalOutletName="standalone"><ng-template cdkPortalOutlet /></div> `,
})
class StandaloneOutletComponent {
  @ViewChild(HraPortalOutletNameDirective) outletDirective!: HraPortalOutletNameDirective;
}

describe('HraPortalOutletNameDirective', () => {
  describe('within a group', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.outletDirective).toBeTruthy();
    });

    it('should have the correct name', () => {
      expect(component.outletDirective.name()).toBe('main');
    });

    it('should report hasAttached correctly', () => {
      expect(component.outletDirective.hasAttached()).toBe(false);

      const portal = component.createPortal();
      component.portal.set(portal);
      component.activeOutlet.set('main');
      fixture.detectChanges();

      expect(component.outletDirective.hasAttached()).toBe(true);
    });

    it('should handle name changes', () => {
      const portal = component.createPortal();
      component.portal.set(portal);
      component.activeOutlet.set('main');
      fixture.detectChanges();

      expect(component.outletDirective.hasAttached()).toBe(true);

      component.outletName.set('renamed');
      fixture.detectChanges();

      expect(component.outletDirective.name()).toBe('renamed');
    });
  });

  describe('standalone (without group)', () => {
    let fixture: ComponentFixture<StandaloneOutletComponent>;
    let component: StandaloneOutletComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StandaloneOutletComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneOutletComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create without a group', () => {
      expect(component.outletDirective).toBeTruthy();
    });

    it('should have the correct name', () => {
      expect(component.outletDirective.name()).toBe('standalone');
    });
  });
});
