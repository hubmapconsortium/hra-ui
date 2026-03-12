import { TestBed } from '@angular/core/testing';
import { provideFetchImpl, provideTelemetryOptions, TelemetryService } from './telemetry.service';
import { waitFor } from '@testing-library/angular';

describe('TelemetryService', () => {
  class Range {
    constructor(
      readonly from: number,
      readonly to: number,
    ) {}
  }

  function serializeRange(_prefix: string, value: unknown): unknown {
    return value instanceof Range ? `${value.from}..${value.to}` : value;
  }

  function filterPrefix(prefix: string, value: unknown): unknown {
    return prefix.startsWith('skip') ? undefined : value;
  }

  function setup() {
    const fetch = jest.fn().mockResolvedValue({});

    TestBed.configureTestingModule({
      providers: [
        provideTelemetryOptions({
          filters: [filterPrefix, serializeRange],
        }),
        provideFetchImpl({ fetch }),
      ],
    });

    const service = TestBed.inject(TelemetryService);
    return { service, fetch };
  }

  const data = {
    value: 'abc',
    options: { range: new Range(10, 30) },
    date: new Date(0),
    skipThis: 'skipped',
    skip: { that: 123 },
  };
  const dataQueryString = 'value=abc&options.range=10..30&date=1970-01-01T00%3A00%3A00.000Z';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send the data to the endpoint', () => {
    const { service, fetch } = setup();

    service.send(data);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(dataQueryString), {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
    });
  });

  it('should catch fetch errors and log them to console', async () => {
    const { service, fetch } = setup();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network error');
    fetch.mockRejectedValueOnce(error);

    expect(() => service.send(data)).not.toThrow();
    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(String), error));
  });
});
