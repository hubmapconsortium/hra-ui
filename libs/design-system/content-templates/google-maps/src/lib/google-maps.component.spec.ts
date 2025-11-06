import { render } from '@testing-library/angular';
import { GoogleMapsComponent } from './google-maps.component';

describe('GoogleMapsComponent', () => {
  it('should render', async () => {
    const component = await render(GoogleMapsComponent);
    expect(component).toBeTruthy();
  });
});
