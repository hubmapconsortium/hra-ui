import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VersionDetail } from '../../models/sheet.model';
import { TableNestedMenuComponent } from './table-nested-menu.component';

describe('TableNestedMenuComponent', () => {
  it('should create and generate correct URL', async () => {
    await TestBed.configureTestingModule({
      imports: [TableNestedMenuComponent, NoopAnimationsModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(TableNestedMenuComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

    const version: VersionDetail = {
      value: 'v1.0',
      viewValue: 'Version 1.0',
      sheetId: '123',
      gid: '456',
    };

    const url = component.getUrl(version);
    expect(url).toBe('https://docs.google.com/spreadsheets/d/123/edit#gid=456');
  });
});
