import { provideMarkdown } from 'ngx-markdown';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownComponent } from './markdown.component';
import { provideAnalytics } from '@hra-ui/common/analytics';
import userEvent from '@testing-library/user-event';

describe('MarkdownComponent', () => {
  async function setup(data?: string) {
    const user = userEvent.setup();
    const result = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics()],
      inputs: data ? { data } : { src: 'assets/content/changelog-page/CHANGELOG.md' },
    });
    return { ...result, user };
  }

  it('should render', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should call logEvent when anchor is clicked', async () => {
    const { container, fixture, user } = await setup('# Test\n[Link](https://example.com)');

    const component = fixture.componentInstance;

    const hostEl = container.querySelector('hra-markdown') || container;
    const anchor = document.createElement('a');
    anchor.href = 'https://example.com';
    anchor.textContent = 'Link';
    hostEl.appendChild(anchor);

    component.attachEventListeners();

    await user.click(anchor);

    expect(anchor.href).toBe('https://example.com/');
  });

  it('should push listeners when attaching event listeners', async () => {
    const { container, fixture } = await setup('# Test');

    const component = fixture.componentInstance;

    const hostEl = container.querySelector('hra-markdown') || container;
    const anchor1 = document.createElement('a');
    anchor1.href = 'https://example.com';
    hostEl.appendChild(anchor1);

    const anchor2 = document.createElement('a');
    anchor2.href = 'https://example.com';
    hostEl.appendChild(anchor2);

    component.attachEventListeners();

    expect(component['listeners'].length).toBe(2);
  });

  it('should call unlisten functions when clearing event listeners', async () => {
    const { container, fixture } = await setup('# Test');

    const component = fixture.componentInstance;

    const hostEl = container.querySelector('hra-markdown') || container;
    const anchor = document.createElement('a');
    anchor.href = 'https://example.com';
    hostEl.appendChild(anchor);

    component.attachEventListeners();
    expect(component['listeners'].length).toBeGreaterThan(0);

    component.clearEventListeners();
    expect(component['listeners'].length).toBe(0);
  });
});
