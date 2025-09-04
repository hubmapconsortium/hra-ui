// Mock implementation of vega-embed for Jest tests
const mockResult = {
  view: {
    toImageURL: jest.fn().mockResolvedValue('data:image/png;base64,test'),
  },
  finalize: jest.fn(),
};

const mockEmbed = jest.fn().mockResolvedValue(mockResult);

module.exports = mockEmbed;
module.exports.default = mockEmbed;
