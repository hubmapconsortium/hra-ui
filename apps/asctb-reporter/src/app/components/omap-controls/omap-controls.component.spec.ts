import { NgControl } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { OmapControlsComponent } from './omap-controls.component';

describe('OmapControlsComponent', () => {
  const defaultProviders = [
    {
      provide: NgControl,
      useValue: { valueChanges: new BehaviorSubject(null) },
    },
  ];

  async function renderOmapControls(onUpdate?: jest.Mock) {
    const spy = onUpdate ?? (jest.fn() as jest.Mock);

    await render('<app-omap-controls (updateConfig)="onUpdate($event)" />', {
      imports: [OmapControlsComponent],
      providers: defaultProviders,
      componentProperties: { onUpdate: spy },
    });

    return { onUpdate: spy };
  }

  it('renders header and checkboxes', async () => {
    await renderOmapControls();

    expect(screen.getByText(/Organ Mapping Antibody Panels/i)).toBeTruthy();
    expect(screen.getByRole('checkbox', { name: /OMAP Organs Only/i })).toBeTruthy();
    expect(screen.getByRole('checkbox', { name: /OMAP Proteins Only/i })).toBeTruthy();
  });

  it('emits updated config when a checkbox is clicked', async () => {
    const updateConfigSpy = jest.fn();

    await renderOmapControls(updateConfigSpy);

    const organsCheckbox = screen.getByRole('checkbox', { name: /OMAP Organs Only/i });
    await fireEvent.click(organsCheckbox);

    expect(updateConfigSpy).toHaveBeenCalledWith({ organsOnly: true, proteinsOnly: false });
  });

  it('emits updated configs when both checkboxes are clicked', async () => {
    const updateConfigSpy = jest.fn();

    await renderOmapControls(updateConfigSpy);

    const organsCheckbox = screen.getByRole('checkbox', { name: /OMAP Organs Only/i });
    const proteinsCheckbox = screen.getByRole('checkbox', { name: /OMAP Proteins Only/i });

    await fireEvent.click(organsCheckbox);
    await fireEvent.click(proteinsCheckbox);

    expect(updateConfigSpy).toHaveBeenLastCalledWith({ organsOnly: true, proteinsOnly: true });
  });
});
