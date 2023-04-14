import { MedicalIllustrationModel } from './medical-illustration.model';
import { MedicalIllustrationSelectors } from './medical-illustration.selectors';

describe('MedicalIllustrationSelectors', () => {
  const state: MedicalIllustrationModel = { url: 'test' };
  it('should return the current url', () => {
    const result = MedicalIllustrationSelectors.url(state);
    expect(result).toEqual('test');
  });
});
