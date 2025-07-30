import { render } from '@testing-library/angular';
import { EmptyBiomarkerComponent } from './empty-biomarker.component';

describe('EmptyBiomarkerComponent', () => {
  it('should create', async () => {
    const promise = render(EmptyBiomarkerComponent, { inputs: { emptyBehaviorText: 'Test text' } });
    await expect(promise).resolves.toBeTruthy();
  });
});
