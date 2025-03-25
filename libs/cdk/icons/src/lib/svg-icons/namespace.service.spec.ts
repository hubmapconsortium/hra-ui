import { TestBed } from '@angular/core/testing';
import { SvgIconNamespaceService } from './namespace.service';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { signal } from '@angular/core';
import { ICONS_CONFIG } from '../tokens';

describe('SvgIconNamespaceService', () => {
  it('uses registered directories to resolve the path for a namespace', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_ASSETS_HREF, useValue: signal('/') }],
    });

    const namespace = 'foo';
    const directory = 'assets/foo';
    const service = TestBed.inject(SvgIconNamespaceService);

    service.setNamespaceDirectory(namespace, directory);
    const path = service.resolveNamespaceDirectory(namespace);
    expect(path).toEqual(`/${directory}`);

    const namespace2 = 'bar';
    const path2 = service.resolveNamespaceDirectory(namespace2);
    expect(path2).toEqual('/assets/icons/bar');
  });

  it('uses the configuration default directory if available', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_ASSETS_HREF, useValue: signal('/') },
        { provide: ICONS_CONFIG, useValue: { svgDirectory: 'foo/bar' } },
      ],
    });

    const service = TestBed.inject(SvgIconNamespaceService);
    const path = service.resolveNamespaceDirectory('abc');
    expect(path).toEqual('/foo/bar/abc');
  });
});
