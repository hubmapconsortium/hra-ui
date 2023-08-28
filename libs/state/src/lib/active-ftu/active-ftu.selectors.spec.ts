import { ActiveFtuModel } from './active-ftu.state';
import { ActiveFtuSelectors } from './active-ftu.selectors';
import { Iri } from '@hra-ui/services';

describe('ActiveFtuSelectors', () => {
  const testIri: ActiveFtuModel = { iri: 'https://www.example.com/test-iri' as Iri };

  it('should return true when the iri is set', () => {
    const result = ActiveFtuSelectors.isActive(testIri);
    expect(result).toBe(true);
  });

  it('should return undefined when iri is not set', () => {
    const result = ActiveFtuSelectors.iri({ iri: undefined });
    expect(result).toBeUndefined();
  });
});
