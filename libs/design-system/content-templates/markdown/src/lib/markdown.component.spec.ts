import { provideMarkdown } from 'ngx-markdown';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownComponent } from './markdown.component';
import { provideAnalytics } from '@hra-ui/common/analytics';

describe('MarkdownComponent', () => {
  it('should render', async () => {
    const component = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        src: 'assets/content/changelog-page/CHANGELOG.md',
      },
    });
    expect(component).toBeTruthy();
  });

  it('should call logEvent when anchor is clicked', async () => {
    const { fixture } = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics()],
      inputs: {
        data: '# Test\n[Link](https://example.com)',
      },
    });

    const component = fixture.componentInstance;
    fixture.detectChanges();

    const hostEl = fixture.nativeElement;
    const anchor = document.createElement('a');
    anchor.href = 'https://example.com';
    anchor.textContent = 'Link';
    hostEl.appendChild(anchor);

    component.attachEventListeners();

    expect(() => anchor.click()).not.toThrow();
  });

  it('should push listeners when attaching event listeners', async () => {
    const { fixture } = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics()],
      inputs: {
        data: '# Test',
      },
    });

    const component = fixture.componentInstance;
    fixture.detectChanges();

    const hostEl = fixture.nativeElement;
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
    const { fixture } = await render(MarkdownComponent, {
      providers: [provideMarkdown(), provideHttpClient(), provideAnalytics()],
      inputs: {
        data: '# Test',
      },
    });

    const component = fixture.componentInstance;
    fixture.detectChanges();

    const hostEl = fixture.nativeElement;
    const anchor = document.createElement('a');
    anchor.href = 'https://example.com';
    hostEl.appendChild(anchor);

    component.attachEventListeners();
    expect(component['listeners'].length).toBeGreaterThan(0);

    component.clearEventListeners();
    expect(component['listeners'].length).toBe(0);
  });
});
