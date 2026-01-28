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
      <div hraPortalOutletName="main"><ng-template cdkPortalOutlet /></div>
      <div hraPortalOutletName="secondary"><ng-template cdkPortalOutlet /></div>
    </div>

    <ng-template #portalContent>
      <div class="portal-content">Portal Content</div>
    </ng-template>
  `,
})
class TestHostComponent {
  @ViewChild('portalContent') portalContent!: TemplateRef<unknown>;
  @ViewChild(HraPortalOutletGroupDirective) group!: HraPortalOutletGroupDirective;

  private readonly viewContainerRef = inject(ViewContainerRef);

  portal = signal<Portal<unknown> | null>(null);
  activeOutlet = signal<string>('');

  createPortal(): TemplatePortal<unknown> {
    return new TemplatePortal(this.portalContent, this.viewContainerRef);
  }
}

describe('HraPortalOutletGroupDirective', () => {
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
    expect(component.group).toBeTruthy();
  });

  it('should have empty portal and activeOutlet by default', () => {
    expect(component.group.portal()).toBeNull();
    expect(component.group.activeOutlet()).toBe('');
  });

  it('should attach portal to active outlet', () => {
    const portal = component.createPortal();
    component.portal.set(portal);
    component.activeOutlet.set('main');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeTruthy();
  });

  it('should switch portal between outlets', () => {
    const portal = component.createPortal();
    component.portal.set(portal);
    component.activeOutlet.set('main');
    fixture.detectChanges();

    let content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeTruthy();

    component.activeOutlet.set('secondary');
    fixture.detectChanges();

    content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeTruthy();
  });

  it('should detach portal when activeOutlet is cleared', () => {
    const portal = component.createPortal();
    component.portal.set(portal);
    component.activeOutlet.set('main');
    fixture.detectChanges();

    let content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeTruthy();

    component.activeOutlet.set('');
    fixture.detectChanges();

    content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeFalsy();
  });

  it('should detach portal when portal is set to null', () => {
    const portal = component.createPortal();
    component.portal.set(portal);
    component.activeOutlet.set('main');
    fixture.detectChanges();

    let content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeTruthy();

    component.portal.set(null);
    fixture.detectChanges();

    content = fixture.nativeElement.querySelector('.portal-content');
    expect(content).toBeFalsy();
  });
});
