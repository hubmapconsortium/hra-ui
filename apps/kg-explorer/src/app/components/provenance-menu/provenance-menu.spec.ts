import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render } from '@testing-library/angular';
import { saveAs } from 'file-saver';

import { ProvenanceMenuComponent } from './provenance-menu.component';

jest.mock('file-saver');

describe('ProvenanceMenuComponent', () => {
  it('should download a file', async () => {
    const { fixture } = await render(ProvenanceMenuComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting()],
      inputs: {
        rows: [],
        columns: [],
        version: '1.0',
        availableVersions: ['1.0', '2.0'],
        downloadOptions: [],
      },
    });
    const component = fixture.componentInstance;
    component.download('test/blah/foo');
    expect(saveAs).toHaveBeenCalledWith('test/blah/foo', 'foo');
  });
});
