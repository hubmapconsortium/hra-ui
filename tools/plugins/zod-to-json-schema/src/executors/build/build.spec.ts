import { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import executor from './build';

jest.mock('node:fs/promises', () => ({
  glob: jest.fn().mockReturnValue({
    async *[Symbol.asyncIterator]() {
      // Return no files
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

  beforeEach(() => {
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
});
