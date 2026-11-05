import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    const result = await render(HomeComponent, {
      providers: [provideHttpClient(), provideMarkdown(), provideIcons()],
    });
    component = result.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
