import { firstValueFrom } from 'rxjs';
import { MockTissueLibraryService } from './tissue-library.mock';

describe('TissueLibraryService', () => {
  const service = new MockTissueLibraryService();

  it('returns mock tissue data', async () => {
    const data = await firstValueFrom(service.getTissueLibrary());
    expect(data).toBeDefined();
  });
});
