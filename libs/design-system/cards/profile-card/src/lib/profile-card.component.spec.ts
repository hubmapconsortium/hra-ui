import { ProfileCardComponent } from './profile-card.component';
import { render } from '@testing-library/angular';

describe('ProfileCardComponent', () => {
  it('should render', async () => {
    const promise = render(ProfileCardComponent, {
      inputs: {
        alignment: 'left',
        pictureUrl: 'assets/ui-images/placeholder.png',
        name: 'Firstname Lastname',
        description: 'Occupation, Company',
      },
    });

    await expect(promise).resolves.toBeDefined();
  });
});
