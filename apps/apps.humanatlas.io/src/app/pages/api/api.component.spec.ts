import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ApiComponent } from './api.component';

jest.mock('rapidoc', () => ({}));

describe('ApiComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystemCommon()];

  it('should create', async () => {
    const promise = render(ApiComponent, { providers });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should scroll to the api container when splash button is clicked', async () => {
    await render(ApiComponent, { providers });
    const container = screen.getByTestId('api-container');
    const button = screen.getByRole('button', { name: /Use APIs/i });
    container.scrollIntoView = jest.fn();

    await userEvent.click(button);
    expect(container.scrollIntoView).toHaveBeenCalled();
  });
});
