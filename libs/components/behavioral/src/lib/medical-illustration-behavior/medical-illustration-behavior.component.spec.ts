import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';

import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';
import { calledWithFn } from 'jest-mock-extended';
import { ActiveFtuSelectors, TissueLibrarySelectors } from '@hra-ui/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

jest.mock('@hra-ui/cdk/injectors');

describe('MedicalIllustrationBehaviorComponent', () => {
  const TISSUES = {
    test: {
      id: 'test',
      label: 'test',
    },
  };

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');
  const iriSpy2 = jest.fn((): string | undefined => undefined);
  let shallow: Shallow<MedicalIllustrationBehaviorComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(dispatch).mockReturnValue(jest.fn());
    selectSnapshotSpy.calledWith(TissueLibrarySelectors.tissues).mockReturnValue(() => TISSUES);
    shallow = new Shallow(MedicalIllustrationBehaviorComponent);
  });

  describe('.tissueTitle', () => {
    it('should get tissue title', async () => {
      selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);
      const { instance } = await shallow.render();
      expect(instance.tissueTitle).toEqual('test');
    });

    it('returns blank string if no iri', async () => {
      selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy2);
      const { instance } = await shallow.render();
      expect(instance.tissueTitle).toEqual('');
    });
  });
});
