import { TestBed } from '@angular/core/testing';
import { EventWriterService } from './event-writer.service';

describe('EventWriterService', () => {
  let service: EventWriterService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWriterService);
    consoleSpy = jest.spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call serialize and log to console with proper parameters', () => {
    const event = 'test-event';
    const data = { userId: '123' };
    const meta = { source: 'web' };

    service.write(event, data, meta);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Writing event data:/));

    const loggedString = consoleSpy.mock.calls[0][0];
    expect(loggedString).toContain('event=test-event');
    expect(loggedString).toContain('source=web');
    expect(loggedString).toContain('e.userId=123');
  });

  it('should return empty for null and undefined', () => {
    const nullResults = [...service.serialize(null, 'path')];
    const undefinedResults = [...service.serialize(undefined, 'path')];

    expect(nullResults).toEqual([]);
    expect(undefinedResults).toEqual([]);
  });

  it('should serialize primitive values', () => {
    const stringResult = [...service.serialize('test', 'path')];
    const numberResult = [...service.serialize(42, 'num')];
    const booleanResult = [...service.serialize(true, 'bool')];

    expect(stringResult).toEqual([['path', 'test']]);
    expect(numberResult).toEqual([['num', '42']]);
    expect(booleanResult).toEqual([['bool', 'true']]);
  });

  it('should serialize Date objects', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    const result = [...service.serialize(date, 'date')];

    expect(result).toEqual([['date', '2023-01-01T00:00:00.000Z']]);
  });

  it('should serialize arrays with object detection', () => {
    const primitiveArray = ['a', 'b'];
    const objectArray = [{ name: 'John' }, { name: 'Jane' }];

    const primitiveResult = [...service.serialize(primitiveArray, 'items')];
    const objectResult = [...service.serialize(objectArray, 'users')];

    expect(primitiveResult).toEqual([
      ['items[]', 'a'],
      ['items[]', 'b'],
    ]);
    expect(objectResult).toEqual([
      ['users[0].name', 'John'],
      ['users[1].name', 'Jane'],
    ]);
  });

  it('should serialize objects with prefix logic', () => {
    const obj = { name: 'John', age: 30 };
    const rootResult = [...service.serialize(obj, '')];
    const nestedResult = [...service.serialize(obj, 'user')];

    expect(rootResult).toContainEqual(['name', 'John']);
    expect(rootResult).toContainEqual(['age', '30']);
    expect(nestedResult).toContainEqual(['user.name', 'John']);
    expect(nestedResult).toContainEqual(['user.age', '30']);
  });
});
