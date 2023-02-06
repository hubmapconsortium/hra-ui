import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
