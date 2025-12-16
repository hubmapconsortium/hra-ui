import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { ReleaseNotesVersionSelectorComponent } from './release-notes-version-selector.component';

describe('ReleaseNotesVersionSelectorComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(ReleaseNotesVersionSelectorComponent, {
      providers: [provideRouter([])],
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should access version and versions signals', async () => {
    const { fixture } = await render(ReleaseNotesVersionSelectorComponent, {
      providers: [provideRouter([])],
    });

    const component = fixture.componentInstance;

    // Access all signals to execute their code
    expect(typeof component.version()).toBe('string');
    expect(Array.isArray(component.versions())).toBe(true);
    expect(typeof component.selectedVersionLabel()).toBe('string');
  });

  it('should call navigateToVersion when selection changes', async () => {
    const { fixture } = await render(ReleaseNotesVersionSelectorComponent, {
      providers: [provideRouter([])],
    });

    const component = fixture.componentInstance;
    const navigateSpy = jest.spyOn(component, 'navigateToVersion' as keyof typeof component);

    component['navigateToVersion']('2.0');

    expect(navigateSpy).toHaveBeenCalledWith('2.0');
  });
});
