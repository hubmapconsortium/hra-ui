import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AggregateCount, TissueBlock } from '@hra-api/ng-client';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ListResult } from '../../../core/models/list-result';
import { ResultsBrowserComponent } from './results-browser.component';

const aggregateData: AggregateCount[] = [
  { label: 'Donors', count: 2 },
  { label: 'Blocks', count: 2 },
];

const resultA: ListResult = {
  tissueBlock: { '@id': 'tb1', spatialEntityId: 'se1' } as unknown as TissueBlock,
  selected: false,
  expanded: false,
};

const resultB: ListResult = {
  tissueBlock: { '@id': 'tb2', spatialEntityId: 'se2' } as unknown as TissueBlock,
  selected: true,
  expanded: false,
  color: '#123456',
};

describe('ResultsBrowserComponent', () => {
  async function renderComponent(overrides: Partial<ListResult>[] = []) {
    const listResults = [resultA, resultB].map((result, index) => ({ ...result, ...overrides[index] }));
    const listResultSelected = jest.fn();
    const listResultDeselected = jest.fn();
    const listResultExpansionChange = jest.fn();

    @Component({
      imports: [ResultsBrowserComponent, MatMenuModule, MatCheckboxModule, MatIconModule, ScrollingModule],
      template: `
        <style>
          cdk-virtual-scroll-viewport {
            height: 400px;
            display: block;
          }
        </style>
        <ccf-results-browser
          highlighted="''"
          [listResults]="listResults"
          [aggregateData]="aggregateData"
          [header]="true"
          (listResultSelected)="listResultSelected($event)"
          (listResultDeselected)="listResultDeselected($event)"
          (listResultExpansionChange)="listResultExpansionChange($event)"
        />
      `,
    })
    class HostComponent {
      listResults = listResults;
      aggregateData = aggregateData;
      listResultSelected = listResultSelected;
      listResultDeselected = listResultDeselected;
      listResultExpansionChange = listResultExpansionChange;
    }

    const { container } = await render(HostComponent, { providers: [provideNoopAnimations()] });

    return { container, listResults, listResultSelected, listResultDeselected, listResultExpansionChange };
  }

  it('emits selection when an unchecked checkbox is clicked', async () => {
    const { listResults, listResultSelected } = await renderComponent();

    const checkboxes = await screen.findAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    await waitFor(() => {
      expect(listResultSelected).toHaveBeenCalledWith(listResults[0]);
    });
  });

  it('emits deselection when a checked checkbox is clicked', async () => {
    const { listResults, listResultDeselected } = await renderComponent();

    const checkboxes = await screen.findAllByRole('checkbox');
    await userEvent.click(checkboxes[1]);

    await waitFor(() => {
      expect(listResultDeselected).toHaveBeenCalledWith(listResults[1]);
    });
  });

  it('resets all selected items from the menu', async () => {
    const { listResultDeselected } = await renderComponent();

    await userEvent.click(screen.getByLabelText('Icon to open nested menu'));
    const resetButton = await screen.findByRole('menuitem', { name: /reset all selections/i });
    await userEvent.click(resetButton);

    await waitFor(() => {
      expect(listResultDeselected).toHaveBeenCalledWith({ ...resultB, selected: false });
    });
  });

  it('filters to selected items when toggling show selected', async () => {
    await renderComponent();

    await userEvent.click(screen.getByLabelText('Icon to open nested menu'));
    const showSelectedButton = await screen.findByRole('menuitem', { name: /show selected/i });
    await userEvent.click(showSelectedButton);

    await waitFor(() => {
      expect(screen.getAllByRole('checkbox').length).toBe(1);
    });
  });

  it('emits expansion change when donor card expands', async () => {
    const { container, listResults, listResultExpansionChange } = await renderComponent();

    const donorCard = await waitFor(() => {
      const element = container.querySelector('[data-item-id="tb1"]');
      expect(element).not.toBeNull();
      return element as Element;
    });

    fireEvent(donorCard, new CustomEvent('expansionChange', { detail: true, bubbles: true }));

    await waitFor(() => {
      expect(listResultExpansionChange).toHaveBeenCalledWith(
        expect.objectContaining({ expanded: expect.anything(), tissueBlock: listResults[0].tissueBlock }),
      );
    });
  });

  it('applies selected color styles to selected checkbox', async () => {
    await renderComponent();

    const checkboxes = await screen.findAllByRole('checkbox');
    const selectedHost = checkboxes[1].closest('mat-checkbox');
    expect(selectedHost).not.toBeNull();

    expect(selectedHost?.getAttribute('style') ?? '').toContain('#123456');
  });
});
