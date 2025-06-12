import { provideMarkdown } from 'ngx-markdown';
import { ProfileCardComponent } from './profile-card.component';
import { render } from '@testing-library/angular';

describe('ProfileCardComponent', () => {
  const providers = [provideMarkdown()];

  it('should render', async () => {
    const promise = render(ProfileCardComponent, {
      inputs: {
        pictureUrl: 'assets/ui-images/placeholder.png',
        name: 'Firstname Lastname',
        description: 'Occupation, Company',
      },
      providers,
    });

    await expect(promise).resolves.toBeDefined();
  });
});
