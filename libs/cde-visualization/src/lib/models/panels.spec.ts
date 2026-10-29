import { HIDDEN_PANELS_STORAGE_KEY, loadHiddenPanels, parseHiddenPanels, saveHiddenPanels } from './panels';

describe('panels', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe('parseHiddenPanels()', () => {
    it('reads comma or space separated lists and arrays, in layout order', () => {
      expect(parseHiddenPanels('histogram, metadata')).toEqual(['metadata', 'histogram']);
      expect(parseHiddenPanels('violin-graph histogram')).toEqual(['violin-graph', 'histogram']);
      expect(parseHiddenPanels(['histogram', 'distance-visualization'])).toEqual([
        'distance-visualization',
        'histogram',
      ]);
    });

    it('drops unknown ids, the cell types panel, and other values', () => {
      expect(parseHiddenPanels('histogram, legend')).toEqual(['histogram']);
      expect(parseHiddenPanels('cell-types metadata')).toEqual(['metadata']);
      expect(parseHiddenPanels(42)).toEqual([]);
      expect(parseHiddenPanels(undefined)).toEqual([]);
    });
  });

  describe('local storage', () => {
    it('saves and loads the hidden panels', () => {
      expect(loadHiddenPanels()).toBeUndefined();

      saveHiddenPanels(['violin-graph']);
      expect(loadHiddenPanels()).toEqual(['violin-graph']);
    });

    it('ignores stored values that are not json', () => {
      localStorage.setItem(HIDDEN_PANELS_STORAGE_KEY, 'not json');
      expect(loadHiddenPanels()).toBeUndefined();
    });

    it('keeps working when storage is unavailable', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Blocked');
      });
      expect(() => saveHiddenPanels(['histogram'])).not.toThrow();
    });
  });
});
