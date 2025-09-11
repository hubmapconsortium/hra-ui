import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { FUNDER_IDS } from '../static-data/parsed';
import { FundingComponent } from './funding.component';

describe('FundingComponent', () => {
  it('should display a link for each funder', async () => {
    await render(FundingComponent, { inputs: { funders: FUNDER_IDS } });

    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(FUNDER_IDS.length);
    links.forEach((link) => {
      expect(link.querySelector('img')).toBeInTheDocument();
    });
  });
});
