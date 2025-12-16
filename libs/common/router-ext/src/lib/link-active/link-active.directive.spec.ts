import { Component, InputSignal, OutputRef } from '@angular/core';
import { IsActiveMatchOptions, provideRouter } from '@angular/router';
import { provideAppConfiguration, provideWindow } from '@hra-ui/common/injectors';
import { render, RenderTemplateOptions, screen } from '@testing-library/angular';
import { LinkDirective } from '../link/link.directive';
import { provideRouterExt } from '../providers';
import { LinkActiveDirective } from './link-active.directive';

interface TemplateProperties {
  options: InputSignal<IsActiveMatchOptions>;
  isActiveChange: OutputRef<boolean>;
}

describe('LinkActiveDirective', () => {
  const baseUrl = 'https://humanatlas.io/';
  const linkUrl = `${baseUrl}test`;
  const linkUrl2 = `${baseUrl}test2`;
  const template1 = `
    <a
      hraLink="${linkUrl}"
      hraLinkActive="active"
      [hraLinkActiveOptions]="options"
      (isActiveChange)="isActiveChange($event)" >
      Link
    </a>
  `;
  const template2 = `
    <div
      hraLinkActive="active"
      [hraLinkActiveOptions]="options"
      (isActiveChange)="isActiveChange($event)">
      <a hraLink="https://apps.humanatlas.io"> </a>
      <a hraLink="${linkUrl}"> </a>
      <a hraLink="${linkUrl2}"> </a>
    </div>
  `;

  const defaultMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
  };

  @Component({
    imports: [LinkDirective],
    template: `<a hraLink="${baseUrl}">link</a>`,
  })
  class MockHome {}

  function setup(
    options: RenderTemplateOptions<unknown, TemplateProperties> = {},
    template = template1,
    router = true,
  ) {
    return render(template, {
      imports: [LinkDirective, LinkActiveDirective],
      providers: [
        provideAppConfiguration({ url: baseUrl }),
        ...(router ? [provideRouter([{ path: '**', component: MockHome }]), provideRouterExt()] : []),
        ...(options.providers ?? []),
      ],
      componentProperties: {
        options: { ...defaultMatchOptions, ...options.inputs?.options },
        isActiveChange: options.on?.isActiveChange,
      },
    });
  }

  it("applies classes when the connected link's url is active", async () => {
    const isActiveChange = jest.fn();
    const { navigate } = await setup({
      on: {
        isActiveChange,
      },
    });

    await navigate('/test');
    expect(isActiveChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('connects to child element links', async () => {
    const isActiveChange = jest.fn();
    const { navigate } = await setup(
      {
        on: {
          isActiveChange,
        },
      },
      template2,
    );

    await navigate('/test2');
    expect(isActiveChange).toHaveBeenCalledWith(true);
    await navigate('/foo');
    expect(isActiveChange).toHaveBeenCalledWith(false);
  });

  it('uses the window location when router is unavailable', async () => {
    const isActiveChange = jest.fn();
    await setup(
      {
        providers: [
          provideWindow({
            location: {
              href: linkUrl,
            },
          } as typeof window),
        ],
        on: { isActiveChange },
      },
      undefined,
      false,
    );

    expect(isActiveChange).toHaveBeenCalledWith(true);
  });
});
