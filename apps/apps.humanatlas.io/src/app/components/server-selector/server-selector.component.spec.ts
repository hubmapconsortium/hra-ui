import { render } from '@testing-library/angular';
import { servers } from '../../constants/server.constants';
import { ServerSelectorComponent } from './server-selector.component';

describe('ServerSelectorComponent', () => {
  it('should render', async () => {
    const promise = render(ServerSelectorComponent, {
      inputs: {
        servers,
        selectedServer: servers[0],
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
