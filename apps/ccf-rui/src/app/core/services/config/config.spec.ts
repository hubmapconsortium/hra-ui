import { GlobalsService } from 'ccf-shared';
import { mock } from 'jest-mock-extended';
import { globalConfigFactory } from './config';

describe('GlobalConfig', () => {
  describe('globalConfigFactory', () => {
    it('fetches the ruiConfig object from the global object', () => {
      const spyObj = mock<GlobalsService>();
      globalConfigFactory(spyObj);
      expect(spyObj.get).toHaveBeenCalledWith('ruiConfig', expect.anything());
    });
  });
});
