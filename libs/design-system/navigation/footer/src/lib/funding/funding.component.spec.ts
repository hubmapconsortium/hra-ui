import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { FUNDER_IDS, FundingComponent } from './funding.component';

describe('FundingComponent', () => {
  it('should display a link for each funder', async () => {
    await render(FundingComponent, { inputs: { funders: FUNDER_IDS } });

    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(FUNDER_IDS.length);
    expect(links[0].querySelector('img')).toBeInTheDocument();
    expect(links[0].querySelector('span')).toBeInTheDocument();
  });
});
