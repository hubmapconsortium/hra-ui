import { Route } from '@angular/router';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createJsonSpecResolver, createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { CurrentTeamComponent } from './pages/current-team/current-team.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PeopleProfileComponent } from './pages/people-profile/people-profile.component';
import { ResearchPageComponent } from './pages/research-page/research-page.component';
import { createPersonResolver } from './resolvers/person.resolver';
import { FeaturedDataSchema } from './schemas/featured.schema';
import { PeopleDataSchema } from './schemas/people.schema';
import { PublicationTypesDataSchema } from './schemas/publication-types.schema';
import { ResearchDataSchema } from './schemas/research.schema';
import { TagsDataSchema } from './schemas/tags.schema';

/** People index URL */
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
/** Featured content index URL */
const FEATURED_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-featured.json';
/** News content index URL */
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
/** Publications content index URL */
const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
/** Publication types content index URL */
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';
/** Tags content index URL */
const TAGS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-tags.json';
/** Base URL for person content */
const PERSON_BASE_URL = 'https://cns-iu.github.io/cns-website/content/people';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      featuredContent: createJsonSpecResolver(FEATURED_INDEX_URL, FeaturedDataSchema),
      tags: createJsonSpecResolver(TAGS_INDEX_URL, TagsDataSchema),
    },
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: 'about',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/about-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'amatria',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/amatria/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'jobs',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/jobs-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'people',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CurrentTeamComponent,
        resolve: {
          data: createJsonSpecResolver(PEOPLE_INDEX_URL, PeopleDataSchema),
        },
      },
      {
        path: ':slug',
        component: PeopleProfileComponent,
        resolve: {
          data: createPersonResolver(PERSON_BASE_URL),
        },
      },
    ],
  },
  {
    path: 'privacy-policy',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/privacy-policy-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'research',
    component: ResearchPageComponent,
    resolve: {
      news: createJsonSpecResolver(NEWS_INDEX_URL, ResearchDataSchema),
      publications: createJsonSpecResolver(PUBLICATIONS_INDEX_URL, ResearchDataSchema),
      people: createJsonSpecResolver(PEOPLE_INDEX_URL, PeopleDataSchema),
      publicationTypes: createJsonSpecResolver(PUBLICATION_TYPES_INDEX_URL, PublicationTypesDataSchema),
      tags: createJsonSpecResolver(TAGS_INDEX_URL, TagsDataSchema),
    },
  },
  {
    path: 'visitor-info',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/visitor-info-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Error pages
  {
    path: '500',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
