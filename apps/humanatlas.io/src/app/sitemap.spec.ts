import { Route } from '@angular/router';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { appRoutes } from './app.routes';

const PUBLIC_DIR = join(__dirname, '../../public');
const SITE_URL = 'https://humanatlas.io';
const RELEASE_NOTES_PATH = 'release-notes/:version';

function readPublicFile(path: string): string {
  return readFileSync(join(PUBLIC_DIR, path), 'utf-8');
}

function isPageRoute(route: Route): boolean {
  return route.component !== undefined && route.canActivate === undefined && route.path !== '**';
}

function getReleaseNotesPaths(): string[] {
  const data = load(readPublicFile('assets/content/release-notes-page/versions.yaml')) as {
    versions: { version: string }[];
  };
  return data.versions.map(({ version }) => `release-notes/v${version}`);
}

function getPageUrls(): string[] {
  return appRoutes
    .filter(isPageRoute)
    .flatMap((route) => (route.path === RELEASE_NOTES_PATH ? getReleaseNotesPaths() : [route.path ?? '']))
    .map((path) => `${SITE_URL}/${path}`);
}

function getSitemapUrls(): string[] {
  return Array.from(readPublicFile('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g), ([, url]) => url);
}

describe('sitemap.xml', () => {
  it('should list every page route and release notes version', () => {
    expect(getSitemapUrls().sort()).toEqual(getPageUrls().sort());
  });
});

describe('robots.txt', () => {
  it('should point crawlers to the sitemap', () => {
    expect(readPublicFile('robots.txt')).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
