import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppWebComponent } from './app-web-component';
import { IllustrationData, JsonLd } from './models';
import { ChangeDetectorRef } from '@angular/core';

describe('AppWebComponent', () => {
  let component: AppWebComponent;
  let controller: HttpTestingController;

  const testOrganData: IllustrationData = {
    '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
    '@type': 'FtuIllustration',
    representation_of: 'UBERON:0004193',
    label: 'loop of Henle ascending limb thin segment',
    organ_id: 'UBERON:0002113',
    organ_label: 'Kidney',
    illustration_files: [
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle#svg_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        file_format: 'image/svg+xml',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle#png_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.png',
        file_format: 'image/png',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle#ai_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
        file_format: 'application/pdf',
      },
    ],
    mapping: [
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle#Ascending_Thin_Limb_Cell_1',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Ascending_Thin_Limb_Cell_1',
        label: 'kidney loop of Henle thin ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001107',
      },
    ],
  };

  const testData: JsonLd = {
    '@context': ['', []],
    '@graph': [testOrganData],
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppWebComponent, ChangeDetectorRef],
    });

    jest.clearAllMocks();
    component = TestBed.inject(AppWebComponent);
    controller = TestBed.inject(HttpTestingController);
  });

  describe('setData', () => {
    it('sets data when illustrationSrc is string id', () => {
      component.lookupSrc = '../assets/TEMP/2d-ftu-illustrations.jsonld';
      component.illustrationSrc = 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle';
      component.ngOnChanges();
      const request = controller.expectOne(component.lookupSrc);
      request.flush(testData);
    });

    it('sets data when illustrationSrc is organ data', () => {
      component.lookupSrc = '../assets/TEMP/2d-ftu-illustrations.jsonld';
      component.illustrationSrc = testOrganData;
      component.ngOnChanges();
      const request = controller.expectOne(component.lookupSrc);
      request.flush(testData);
    });

    it('returns dataset if given as lookupsrc', () => {
      component.lookupSrc = testData;
      component.ngOnChanges();
    });
  });
});
