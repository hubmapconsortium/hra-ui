import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAssetHref } from '@hra-ui/common/url';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ApiComponent } from './api.component';
import { servers } from '../../constants/server.constants';

jest.mock('rapidoc', () => ({}));

describe('ApiComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideAssetHref('http://localhost/')];

  const setup = () =>
    render(ApiComponent, {
      providers,
      inputs: { logo: '' },
    });

  beforeEach(() => {
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(async () => {});
  });

  it('should create', async () => {
    await expect(setup()).resolves.toBeTruthy();
  });

  it('should scroll to the api container when splash button is clicked', async () => {
    await setup();
    const container = screen.getByTestId('api-container');
    const button = screen.getByRole('button', { name: /Use APIs/i });
    container.scrollIntoView = jest.fn();

    await userEvent.click(button);
    expect(container.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });

  it('should compute selectedServer based on serverId', async () => {
    const { fixture } = await setup();
    const comp = fixture.componentInstance as any;

    comp.serverId.set(servers[1].id);
    expect(comp.selectedServer().id).toBe(servers[1].id);
  });

  it('should update rapidoc server via updateRapidoc()', async () => {
    const { fixture } = await setup();
    const comp = fixture.componentInstance as any;

    const mockRapidoc = { setApiServer: jest.fn() };
    comp.rapidocElement = () => ({ nativeElement: mockRapidoc });

    const server = servers[1];

    comp.updateRapidoc(server);

    expect(comp.serverId()).toBe(server.id);
    expect(mockRapidoc.setApiServer).toHaveBeenCalledWith(server.url);
  });

  it('should update spec-url attribute when selectedServer changes', async () => {
    const { fixture, detectChanges } = await setup();
    const comp = fixture.componentInstance;

    const rapidoc = document.querySelector('rapi-doc') as HTMLElement;
    expect(rapidoc).toBeTruthy();

    comp.serverId.set(servers[1].id);
    detectChanges();

    expect(rapidoc.getAttribute('spec-url')).toBe(servers[1].spec);
  });

  it('should log analytics data on before-try event', async () => {
    const { fixture } = await setup();
    const comp = fixture.componentInstance as any;

    const mockDirective = { logEvent: jest.fn() };
    const event = new CustomEvent('before-try', {
      detail: {
        request: {
          url: 'https://api.example.com/test/endpoint',
          method: 'PATCH',
        },
      },
    });

    comp.onBeforeTry(event, mockDirective);

    expect(mockDirective.logEvent).toHaveBeenCalledWith(
      'click',
      undefined,
      expect.objectContaining({
        endpoint: '/test/endpoint',
        method: 'PATCH',
        server: comp.selectedServer().id,
      }),
    );
  });
});
