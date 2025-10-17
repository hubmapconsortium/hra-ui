import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationButtonComponent } from './navigation-button.component';

describe('NavigationButtonComponent', () => {
  let component: NavigationButtonComponent;
  let fixture: ComponentFixture<NavigationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render label text', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('link', '/test');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.label');
    expect(label.textContent).toBe('Test Label');
  });

  it('should set href attribute', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test-link');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('href')).toBe('/test-link');
  });

  it('should render supporting text when provided', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('supportingText', 'Supporting');
    fixture.detectChanges();

    const supportingText = fixture.nativeElement.querySelector('.supporting-text');
    expect(supportingText.textContent).toBe('Supporting');
  });

  it('should not render supporting text when not provided', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.detectChanges();

    const supportingText = fixture.nativeElement.querySelector('.supporting-text');
    expect(supportingText).toBeNull();
  });

  it('should render leading icon when showLeadingIcon is true', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('showLeadingIcon', true);
    fixture.detectChanges();

    const leadingIcon = fixture.nativeElement.querySelector('.leading-icon');
    expect(leadingIcon).toBeTruthy();
  });

  it('should render trailing icon when showTrailingicon is true', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('showTrailingicon', true);
    fixture.detectChanges();

    const trailingIcon = fixture.nativeElement.querySelector('.trailing-icon');
    expect(trailingIcon).toBeTruthy();
  });

  it('should render indent when showIndent is true', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('showIndent', true);
    fixture.detectChanges();

    const indent = fixture.nativeElement.querySelector('.indent');
    expect(indent).toBeTruthy();
  });

  it('should not render leading icon when showIndent is true', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('showIndent', true);
    fixture.componentRef.setInput('showLeadingIcon', true);
    fixture.detectChanges();

    const leadingIcon = fixture.nativeElement.querySelector('.leading-icon');
    expect(leadingIcon).toBeNull();
  });

  it('should apply menu-item variant class by default', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('hra-navigation-button-menu-item')).toBe(true);
  });

  it('should apply cta variant class', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('variant', 'cta');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('hra-navigation-button-cta')).toBe(true);
  });

  it('should apply icon_alignment class when supportingText is provided', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.componentRef.setInput('link', '/test');
    fixture.componentRef.setInput('supportingText', 'Supporting');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('icon_alignment')).toBe(true);
  });
});
