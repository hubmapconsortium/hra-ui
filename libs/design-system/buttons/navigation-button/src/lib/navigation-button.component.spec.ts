import { render, screen } from '@testing-library/angular';
import { MatIconModule } from '@angular/material/icon';
import { NavigationButtonComponent } from './navigation-button.component';
import { NavigationIconDirective } from './navigation-icon.directive';
import { NavigationButtonTaglineDirective } from './navigation-button-tagline.directive';
import { NavigationButtonDescriptionDirective } from './navigation-button-description.directive';

describe('NavigationButtonComponent', () => {
  const setup = async (template: string) => {
    return render(template, {
      imports: [
        NavigationButtonComponent,
        NavigationIconDirective,
        NavigationButtonTaglineDirective,
        NavigationButtonDescriptionDirective,
        MatIconModule,
      ],
    });
  };

  it('should create', async () => {
    const { fixture } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Test</span>
      </hra-navigation-button>
    `);
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should render tagline text', async () => {
    const { getByText } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Test Label</span>
      </hra-navigation-button>
    `);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('should apply label class to tagline element', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Test Label</span>
      </hra-navigation-button>
    `);
    const tagline = container.querySelector('[hraNavigationButtonTagline]');
    expect(tagline?.classList.contains('label')).toBe(true);
  });

  it('should set href attribute', async () => {
    await setup(`
      <hra-navigation-button link="/test-link">
        <span hraNavigationButtonTagline>Test</span>
      </hra-navigation-button>
    `);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-link');
  });

  it('should render description when provided', async () => {
    const { getByText } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Label</span>
        <span hraNavigationButtonDescription>Supporting text</span>
      </hra-navigation-button>
    `);
    expect(getByText('Supporting text')).toBeTruthy();
  });

  it('should apply supporting-text class to description element', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Label</span>
        <span hraNavigationButtonDescription>Supporting text</span>
      </hra-navigation-button>
    `);
    const description = container.querySelector('[hraNavigationButtonDescription]');
    expect(description?.classList.contains('supporting-text')).toBe(true);
  });

  it('should render leading icon', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <mat-icon [hraNavigationIcon]="'leading'">info</mat-icon>
        <span hraNavigationButtonTagline>Label</span>
      </hra-navigation-button>
    `);
    const leadingIcon = container.querySelector('.leading-icon');
    expect(leadingIcon).toBeTruthy();
  });

  it('should render trailing icon', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Label</span>
        <mat-icon [hraNavigationIcon]="'trailing'">arrow_right_alt</mat-icon>
      </hra-navigation-button>
    `);
    const trailingIcon = container.querySelector('.trailing-icon');
    expect(trailingIcon).toBeTruthy();
  });

  it('should default to trailing icon when position is not specified', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Label</span>
        <mat-icon hraNavigationIcon>arrow_right_alt</mat-icon>
      </hra-navigation-button>
    `);
    const trailingIcon = container.querySelector('.trailing-icon');
    expect(trailingIcon).toBeTruthy();
    const leadingIcon = container.querySelector('.leading-icon');
    expect(leadingIcon).toBeFalsy();
  });

  it('should render indent when indented is true', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test" [indented]="true">
        <span hraNavigationButtonTagline>Label</span>
      </hra-navigation-button>
    `);
    expect(container.querySelector('.indent')).toBeTruthy();
  });

  it('should apply basic variant class by default', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test">
        <span hraNavigationButtonTagline>Test</span>
      </hra-navigation-button>
    `);
    const component = container.querySelector('hra-navigation-button');
    expect(component?.classList.contains('hra-navigation-button-basic')).toBe(true);
  });

  it('should apply cta variant class', async () => {
    const { container } = await setup(`
      <hra-navigation-button link="/test" variant="cta">
        <span hraNavigationButtonTagline>Test</span>
      </hra-navigation-button>
    `);
    const component = container.querySelector('hra-navigation-button');
    expect(component?.classList.contains('hra-navigation-button-cta')).toBe(true);
  });
});
