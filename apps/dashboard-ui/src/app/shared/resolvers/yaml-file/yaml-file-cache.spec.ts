import { TestBed } from '@angular/core/testing';
import { YAML_FILE_CACHE } from './yaml-file-cache';

describe('YAML_FILE_CACHE', () => {
  it('should create a Map instance through factory function', () => {
    TestBed.configureTestingModule({});

    const cache = TestBed.inject(YAML_FILE_CACHE);

    expect(cache).toBeInstanceOf(Map);
    expect(cache.size).toBe(0);
  });
});
