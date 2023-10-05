import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopLinksComponent } from './sop-links.component';
import { SopLinksModule } from './sop-links.module';
import { Shallow } from 'shallow-render';
import { SopLinks } from './sop-links';

describe('SopLinksComponent', () => {
  const sopLinks: SopLinks = {
    sopTitle: 'Test Title',
    href: [{ title: 'Test Link Title', href: 'https:www.example.com' }]
  }
  let shallow: Shallow<SopLinksComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SopLinksComponent, SopLinksModule)
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { links: sopLinks } })).resolves.toBeDefined();
  });
});
