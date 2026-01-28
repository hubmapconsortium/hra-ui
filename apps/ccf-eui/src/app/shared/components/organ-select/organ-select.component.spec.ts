import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';
import { BehaviorSubject } from 'rxjs';
import { SceneState } from '../../../core/store/scene/scene.state';
import { OrganSelectComponent } from './organ-select.component';

interface SceneStateMock {
  selectedReferenceOrgans$: BehaviorSubject<OrganInfo[]>;
  setSelectedReferenceOrgans: jest.Mock<void, [OrganInfo[]]>;
}

function createSceneStateMock(initial: OrganInfo[] = []): SceneStateMock {
  const selectedReferenceOrgans$ = new BehaviorSubject<OrganInfo[]>(initial);
  return {
    selectedReferenceOrgans$,
    setSelectedReferenceOrgans: jest.fn((organs: OrganInfo[]) => selectedReferenceOrgans$.next(organs)),
  };
}

describe('OrganSelectComponent', () => {
  const [organA, organB, organC] = ALL_ORGANS.slice(0, 3);

  it('removes a selected organ via chip remove button', async () => {
    const sceneMock = createSceneStateMock([organA, organB]);

    const { fixture } = await render(OrganSelectComponent, {
      providers: [{ provide: SceneState, useValue: sceneMock }],
    });

    const trigger = fixture.debugElement.query(By.css('input')).injector.get(MatAutocompleteTrigger);
    trigger.openPanel();
    fixture.detectChanges();

    const removeButton = await screen.findByRole('button', { name: `remove ${organA.name}` });
    await userEvent.click(removeButton);

    await waitFor(() => {
      expect(sceneMock.setSelectedReferenceOrgans).toHaveBeenCalledWith([organB]);
    });
  });

  it('selects an organ from autocomplete and clears the search input', async () => {
    const sceneMock = createSceneStateMock([]);

    const { fixture } = await render(OrganSelectComponent, {
      providers: [{ provide: SceneState, useValue: sceneMock }],
    });

    const input = screen.getByLabelText('Organs');
    const trigger = fixture.debugElement.query(By.css('input')).injector.get(MatAutocompleteTrigger);
    trigger.openPanel();
    fixture.detectChanges();

    await userEvent.type(input, organC.name.slice(0, 4));

    const option = await screen.findByRole('option', { name: organC.name });
    await userEvent.click(option);
    fixture.detectChanges();
    await fixture.whenStable();

    await waitFor(() => {
      expect(sceneMock.setSelectedReferenceOrgans).toHaveBeenCalledWith([organC]);
    });
  });

  it('adds an organ when checkbox is checked', async () => {
    const sceneMock = createSceneStateMock([]);

    const { fixture } = await render(OrganSelectComponent, {
      providers: [{ provide: SceneState, useValue: sceneMock }],
    });

    const input = screen.getByLabelText('Organs');
    const trigger = fixture.debugElement.query(By.css('input')).injector.get(MatAutocompleteTrigger);
    trigger.openPanel();
    fixture.detectChanges();

    await userEvent.type(input, organA.name.slice(0, 3));

    const option = await screen.findByRole('option', { name: organA.name });
    const optionContainer = option.closest('.autocomplete-option') as HTMLElement;
    const checkbox = within(optionContainer).getByRole('checkbox');
    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(sceneMock.setSelectedReferenceOrgans).toHaveBeenCalledWith([organA]);
    });
  });

  it('removes an organ when checkbox is unchecked', async () => {
    const sceneMock = createSceneStateMock([organB]);

    const { fixture } = await render(OrganSelectComponent, {
      providers: [{ provide: SceneState, useValue: sceneMock }],
    });

    const input = screen.getByLabelText('Organs');
    const trigger = fixture.debugElement.query(By.css('input')).injector.get(MatAutocompleteTrigger);
    trigger.openPanel();
    fixture.detectChanges();

    await userEvent.type(input, organB.name.slice(0, 3));

    const option = await screen.findByRole('option', { name: organB.name });
    const optionContainer = option.closest('.autocomplete-option') as HTMLElement;
    const checkbox = within(optionContainer).getByRole('checkbox');
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(sceneMock.setSelectedReferenceOrgans).toHaveBeenCalledWith([]);
    });
  });
});
