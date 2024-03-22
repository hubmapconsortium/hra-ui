import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FTU_DATA_IMPL_ENDPOINTS } from '@hra-ui/services';
import { Shallow } from 'shallow-render';
import { FooterBehaviorComponent } from './footer-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('FooterBehaviorComponent', () => {
  let shallow: Shallow<FooterBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(FooterBehaviorComponent).provide([
      {
        provide: FTU_DATA_IMPL_ENDPOINTS,
        useClass: {
          datasets: '',
          illustrations: '',
          summaries: '',
        },
      },
    ]);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
