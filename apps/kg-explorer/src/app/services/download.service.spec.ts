import { TestBed } from '@angular/core/testing';

import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { DownloadService } from './download.service';
import * as mockMetadata from '../testing/mock-metadata.json';

const mockMetadataWithDuplicates: DigitalObjectMetadata = {
  ...mockMetadata,
  distributions: [
    ...mockMetadata.distributions,
    {
      id: 'a second json file type',
      label: '',
      title: 'Second JSON file',
      downloadUrl: '',
      accessUrl: '',
      mediaType: 'application/json',
    },
  ],
};

const mockMetadataWithUnsupportedFileType: DigitalObjectMetadata = {
  ...mockMetadata,
  distributions: [
    ...mockMetadata.distributions,
    {
      id: 'an unsupported file type',
      label: '',
      title: 'Unsupported file',
      downloadUrl: '',
      accessUrl: '',
      mediaType: 'application/unsupported',
    },
  ],
};

describe('DownloadService', () => {
  let service: DownloadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadService],
    });

    service = TestBed.inject(DownloadService);
  });

  it('return download options from the metadata', async () => {
    expect(service.getDownloadOptions(mockMetadata).length).toEqual(10);
  });

  it('handles duplicate file types', () => {
    expect(service.getDownloadOptions(mockMetadataWithDuplicates)[10].description).toEqual('Second JSON file');
  });

  it('excludes files with an undefined file type', () => {
    expect(service.getDownloadOptions(mockMetadataWithUnsupportedFileType).length).toEqual(10);
  });
});
