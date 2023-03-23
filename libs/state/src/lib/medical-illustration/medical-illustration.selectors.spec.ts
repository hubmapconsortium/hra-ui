import { MedicalIllustrationModel } from './medical-illustration.state';
import { MedicalIllustrationSelectors } from './medical-illustration.selectors';

describe('MedicalIllustrationSelectors', () => {
  const state: MedicalIllustrationModel = { url: 'test' };
  it('should return the current url', () => {
    const result = MedicalIllustrationSelectors.getUrl(state);
    expect(result).toEqual('test');
  });
});
