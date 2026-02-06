import { TissueSection } from '@hra-api/ng-client';
import { render } from '@testing-library/angular';

import { TissueSectionVisComponent } from './tissue-section-vis.component';

describe('TissueSectionVisComponent', () => {
  const totalTissueSections = 4;

  it('renders ticks for each section and shows total bounds', async () => {
    const { container } = await render(TissueSectionVisComponent, {
      inputs: { totalTissueSections, tissueSections: [] as TissueSection[] },
    });

    const ticks = container.querySelectorAll('.line-tick');
    expect(ticks.length).toBeGreaterThan(0);
    expect(container.textContent).toContain('0');
    expect(container.textContent).toContain(String(totalTissueSections));
  });

  it('marks existing sections as visible', async () => {
    const { container } = await render(TissueSectionVisComponent, {
      inputs: { totalTissueSections: 1, tissueSections: [{ sectionNumber: 1 } as TissueSection] },
    });

    const tick = container.querySelector('.line-tick');
    expect(tick).toHaveClass('line-tick-visible');
  });
});
