import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { BrandMarkComponent } from './mark.component';

describe('BrandMarkComponent', () => {
  it('should render the brand mark inline', async () => {
    await render(BrandMarkComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(screen.queryByLabelText('Human Reference Atlas brandmark')).toBeInTheDocument();
  });
});
