import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { Shallow } from 'shallow-render';
import { BiomarkerDetailsComponent } from './biomarker-details.component';

jest.mock('@hra-ui/cdk/injectors');

describe('BiomarkerDetailsComponent', () => {
  let shallow: Shallow<BiomarkerDetailsComponent>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(selectQuerySnapshot)
      .mockImplementation((selector) => () => (selector === ResourceRegistrySelectors.anyText ? '' : []) as never);
    jest.mocked(selectSnapshot).mockImplementation(() => () => []);

    shallow = new Shallow(BiomarkerDetailsComponent).dontMock(MatTableModule, HoverDirective);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
