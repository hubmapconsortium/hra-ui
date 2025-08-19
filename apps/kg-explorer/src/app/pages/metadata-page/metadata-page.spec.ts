import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { V1Service } from '@hra-api/ng-client';
import { of } from 'rxjs';

import { PersonInfo } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import { MetadataPageComponent } from './metadata-page.component';

jest.mock('@google/model-viewer', () => ({}));

describe('MetadataPageComponent', () => {
  let component: MetadataPageComponent;
  let fixture: ComponentFixture<MetadataPageComponent>;

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockImplementation((key: string) => {
          const params: Record<string, string> = { type: 'ref-organ', name: 'heart', version: 'v1.0' };
          return params[key];
        }),
      },
    },
  };

  const mockDownloadService = {
    getDownloadOptions: jest.fn().mockReturnValue([{ label: 'Download CSV', value: 'csv' }]),
  };

  const mockV1Service = {
    ontologyTreeModel: jest.fn().mockReturnValue(
      of({
        nodes: {
          heart: { label: 'Heart' },
        },
      }),
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataPageComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MetadataPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set current version from route params', () => {
    expect(component.currentVersion()).toBe('v1.0');
  });

  it('should generate markdown list from person info', () => {
    const people: PersonInfo[] = [
      {
        conforms_to: '',
        firstName: '',
        fullName: '',
        id: 'https://example.com/alice',
        label: 'Alice',
        lastName: '',
        orcid: '',
        type_of: [],
      },
      {
        conforms_to: '',
        firstName: '',
        fullName: '',
        id: 'https://example.com/bob',
        label: 'Bob',
        lastName: '',
        orcid: '',
        type_of: [],
      },
    ];
    const markdown = component['createMarkdownList'](people);
    expect(markdown).toContain('[Alice](https://example.com/alice)');
    expect(markdown).toContain('[Bob](https://example.com/bob)');
  });

  it('should navigate to tag filter on tagClick', () => {
    component.tagClick('heart', 'organs');
    expect(mockRouter.navigate).toHaveBeenCalledWith([''], { queryParams: { organs: 'heart' } });
  });
});
