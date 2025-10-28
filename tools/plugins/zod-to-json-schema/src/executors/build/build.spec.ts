import { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import executor from './build';

jest.mock('node:fs/promises', () => ({
  glob: jest.fn().mockReturnValue({
    async *[Symbol.asyncIterator]() {
      // Return no files by default
    },
  }),
  writeFile: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@swc-node/register/register', () => ({
  register: jest.fn(() => jest.fn()),
}));

jest.mock('prettier', () => ({
  format: jest.fn((text) => text),
  resolveConfig: jest.fn().mockResolvedValue({}),
}));

jest.mock('zod', () => ({
  __esModule: true,
  default: jest.requireActual('zod').default,
  toJSONSchema: jest.fn(() => ({ type: 'object', properties: {} })),
}));

jest.mock('node:url', () => ({
  pathToFileURL: jest.fn((path) => ({ href: `file://${path}` })),
}));

jest.mock('node:path', () => ({
  join: jest.fn((...args) => args.filter(Boolean).join('/')),
  resolve: jest.fn((path) => `/workspace/libs/test-project/${path}`),
}));

jest.mock('@nx/devkit', () => ({
  ...jest.requireActual('@nx/devkit'),
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
  },
}));

const options: BuildExecutorSchema = {};

describe('Build Executor', () => {
  let context: ExecutorContext;
  let mockGlob: jest.Mock;
  let mockWriteFile: jest.Mock;
  let mockFormat: jest.Mock;
  let mockResolveConfig: jest.Mock;
  let mockToJSONSchema: jest.Mock;

  beforeEach(() => {
    // Get the mocked functions
    mockGlob = jest.requireMock('node:fs/promises').glob;
    mockWriteFile = jest.requireMock('node:fs/promises').writeFile;
    mockFormat = jest.requireMock('prettier').format;
    mockResolveConfig = jest.requireMock('prettier').resolveConfig;
    mockToJSONSchema = jest.requireMock('zod').toJSONSchema;

    context = {
      root: '/workspace',
      cwd: '/workspace',
      isVerbose: false,
      projectName: 'test-project',
      projectGraph: {
        nodes: {},
        dependencies: {},
      },
      projectsConfigurations: {
        projects: {
          'test-project': {
            root: 'libs/test-project',
          },
        },
        version: 2,
      },
      nxJsonConfiguration: {},
    };

    // Reset all mocks to default behavior
    mockGlob.mockReturnValue({
      async *[Symbol.asyncIterator]() {
        // Return no files by default
      },
    });
    mockWriteFile.mockResolvedValue(undefined);
    mockFormat.mockImplementation((text) => text);
    mockResolveConfig.mockResolvedValue({});
    mockToJSONSchema.mockReturnValue({ type: 'object', properties: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fail when projectName is missing', async () => {
    const contextWithoutProject = { ...context, projectName: undefined };
    const output = await executor(options, contextWithoutProject);
    expect(output.success).toBe(false);
  });

  it('should fail when project configuration is not found', async () => {
    const contextWithInvalidProject = { ...context, projectName: 'invalid-project' };
    const output = await executor(options, contextWithInvalidProject);
    expect(output.success).toBe(false);
  });

  it('should succeed when no schema files are found', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });

  it('should handle build errors gracefully', async () => {
    // Mock glob to return schema files
    mockGlob.mockReturnValueOnce({
      async *[Symbol.asyncIterator]() {
        yield 'test.schema.ts';
      },
    });

    // Make toJSONSchema throw an error
    mockToJSONSchema.mockImplementationOnce(() => {
      throw new Error('Schema conversion failed');
    });

    const output = await executor(options, context);
    expect(output.success).toBe(false);
  });

  it('should handle file write errors', async () => {
    // Mock glob to return schema files
    mockGlob.mockReturnValueOnce({
      async *[Symbol.asyncIterator]() {
        yield 'test.schema.ts';
      },
    });

    // Mock prettier
    mockResolveConfig.mockResolvedValueOnce({ semi: true });
    mockFormat.mockReturnValueOnce('{"type":"object"}');

    // Make writeFile fail
    mockWriteFile.mockRejectedValueOnce(new Error('Write failed'));

    const output = await executor(options, context);
    expect(output.success).toBe(false);
  });
});
