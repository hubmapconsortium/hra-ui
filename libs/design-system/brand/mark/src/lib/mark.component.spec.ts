import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BrandMarkComponent } from './mark.component';

describe('BrandMarkComponent', () => {
  it('should render the brand mark inline', async () => {
    await render(BrandMarkComponent, {
      imports: [InlineSVGModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(screen.queryByLabelText('Human Reference Atlas brandmark')).toBeInTheDocument();
  });
});
