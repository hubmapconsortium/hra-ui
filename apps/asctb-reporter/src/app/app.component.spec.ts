import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  it('should create', async () => {
    await render(AppComponent, { imports: [AppModule] });
    expect().nothing();
  });
});
