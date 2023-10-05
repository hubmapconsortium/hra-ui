import { UseButton } from './use-button';
import { UseButtonComponent } from './use-button.component';
import { UseButtonModule } from './use-button.module';
import { Shallow } from 'shallow-render';

describe('UseButtonComponent', () => {
  const data: UseButton = {
    text: 'test',
    url: 'https://example.com',
  };

  let shallow: Shallow<UseButtonComponent>;

  beforeEach(() => {
    shallow = new Shallow(UseButtonComponent, UseButtonModule);
  });

  it('should create', async () => {
    await expect(
      shallow.render({ bind: { buttonData: data } })
    ).resolves.toBeDefined();
  });
});
