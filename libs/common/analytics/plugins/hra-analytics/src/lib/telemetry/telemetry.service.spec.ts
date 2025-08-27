import { TestBed } from '@angular/core/testing';
import { TelemetryService } from './telemetry.service';
import { provideTelemetryParameterFilter } from './telemetry.tokens';

describe('TelemetryService', () => {
  class Range {
    constructor(
      readonly from: number,
      readonly to: number,
    ) {}
  }

  function serializeRange(_prefix: string, value: unknown): unknown {
    if (value instanceof Range) {
      return `${value.from}..${value.to}`;
    }
    return value;
  }

  const data = { value: 'abc', options: { range: new Range(10, 30) } };
  const dataQueryString = 'value=abc&options.range=10..30';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTelemetryParameterFilter(serializeRange)],
    });
  });

  it('should stringify data into a query string', () => {
    const service = TestBed.inject(TelemetryService);
    expect(service.stringify(data)).toEqual(dataQueryString);
  });

  it('should send the data to the endpoint', () => {
    const doFetch = jest.fn();
    const service = TestBed.inject(TelemetryService);

    service.send(data, doFetch);
    expect(doFetch).toHaveBeenCalledWith(expect.stringContaining(dataQueryString), {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
    });
  });
});
