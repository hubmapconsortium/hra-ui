import { TissueBlock } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { DonorCardComponent } from './donor-card.component';

const tissueBlock: TissueBlock = {
  description: '3mm x 2mm,1mm',
  sampleType: 'block',
  label: 'Block 1',
  donor: {
    label: 'Donor A',
    description: 'Provenance A',
    link: 'https://donor.example',
  },
  link: 'https://block.example',
  sectionCount: 2,
  sections: [
    {
      link: 'https://section-1.example',
      sampleType: 'section',
      label: 'Section 1',
      datasets: [
        {
          link: 'https://section-1-ds.example',
          technology: 'Section Tech',
          thumbnail: 'thumb-section',
          label: 'Section Dataset',
        },
      ],
    },
    {
      link: 'https://section-2.example',
      sampleType: 'section',
      label: 'Section 2',
      datasets: [],
    },
  ],
  datasets: [
    {
      link: 'https://dataset.example',
      technology: 'Block Tech',
      thumbnail: 'thumb-block',
      label: 'Block Dataset',
    },
  ],
} as const;

describe('DonorCardComponent', () => {
  it('renders donor summary and block details', async () => {
    await render(DonorCardComponent, {
      inputs: {
        tissueBlock,
        highlighted: true,
        expanded: true,
        selected: true,
      },
    });

    expect(screen.getByText('Donor: Donor A')).toBeInTheDocument();
    expect(screen.getByText('Provenance: Provenance A')).toBeInTheDocument();
    expect(screen.getByText('3D size: 3mm x 2mm')).toBeInTheDocument();
    expect(screen.getByText('Thickness of tissue section: 1mm')).toBeInTheDocument();

    const donorCard = screen.getByText('Donor: Donor A').closest('.donor-card');
    expect(donorCard).toHaveClass('highlighted');
  });

  it('selects on first toggle then expands and emits', async () => {
    const selectOption = jest.fn();
    const expansionChange = jest.fn();

    await render(DonorCardComponent, {
      inputs: { tissueBlock },
      on: { selectOption, expansionChange },
    });

    const header = screen.getByText('Donor: Donor A');

    await userEvent.click(header);
    expect(selectOption).toHaveBeenCalledTimes(1);
    expect(expansionChange).not.toHaveBeenCalled();
    expect(screen.queryByText('Tissue Block')).not.toBeInTheDocument();

    await userEvent.click(header);
    expect(expansionChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Tissue Block')).toBeInTheDocument();
    expect(screen.getByText('Block Tech')).toBeInTheDocument();
    expect(screen.getByText('Section Tech')).toBeInTheDocument();
  });
});
