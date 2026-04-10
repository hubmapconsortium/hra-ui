import { Route } from '@angular/router';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createJsonSpecResolver, createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { ArchiveRedirectComponent } from './pages/archive-redirect/archive-redirect.component';
import { CurrentTeamComponent } from './pages/current-team/current-team.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PeopleProfileComponent } from './pages/people-profile/people-profile.component';
import { ResearchPageComponent } from './pages/research-page/research-page.component';
import { createPersonResolver } from './resolvers/person.resolver';
import { FeaturedDataSchema } from './schemas/featured.schema';
import { PeopleDataSchema } from './schemas/people.schema';
import { ResearchTypesDataSchema } from './schemas/research-type.schema';
import { ResearchDataSchema } from './schemas/research.schema';
import { TagsDataSchema } from './schemas/tags.schema';
import { createMountRedirectRoute } from './utils/mount-redirect';

/** Base URL for content and indexes */
const BASE_URL = 'https://cns.iu.edu/';

/** People index URL */
const PEOPLE_INDEX_URL = BASE_URL + 'assets/indexes/app-people.json';
/** Featured content index URL */
const FEATURED_INDEX_URL = BASE_URL + 'assets/indexes/app-featured.json';
/** News content index URL */
const NEWS_INDEX_URL = BASE_URL + 'assets/indexes/app-news.json';
/** Publications content index URL */
const PUBLICATIONS_INDEX_URL = BASE_URL + 'assets/indexes/app-publications.json';
/** Publication types content index URL */
const PUBLICATION_TYPES_INDEX_URL = BASE_URL + 'assets/indexes/app-publication-types.json';
/** Events content index URL */
const EVENT_INDEX_URL = BASE_URL + 'assets/indexes/app-events.json';
/** Event types content index URL */
const EVENT_TYPES_INDEX_URL = BASE_URL + 'assets/indexes/app-event-types.json';
/** Funding content index URL */
const FUNDING_INDEX_URL = BASE_URL + 'assets/indexes/app-funding.json';
/** Funding types content index URL */
const FUNDING_TYPES_INDEX_URL = BASE_URL + 'assets/indexes/app-funding-types.json';
/** Visualizations content index URL */
const VISUALIZATIONS_INDEX_URL = BASE_URL + 'assets/indexes/app-visualizations.json';
/** Display tags content index URL */
const DISPLAY_TAGS_INDEX_URL = BASE_URL + 'assets/indexes/app-display-tags.json';
/** Base URL for person content */
const PERSON_BASE_URL = BASE_URL + 'content/people';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      featuredContent: createJsonSpecResolver(FEATURED_INDEX_URL, FeaturedDataSchema),
      tags: createJsonSpecResolver(DISPLAY_TAGS_INDEX_URL, TagsDataSchema),
    },
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: '2012-ucsdmap',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/2012-ucsdmap/data.yaml', ContentPageDataSchema),
    },
  },
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
    path: 'exhibit',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContentPageComponent,
        resolve: {
          data: createYamlSpecResolver('assets/content/exhibit/data.yaml', ContentPageDataSchema),
        },
      },
      {
        path: 'envisioning-intelligences',
        component: ContentPageComponent,
        resolve: {
          data: createYamlSpecResolver('assets/content/envisioning-intelligences/data.yaml', ContentPageDataSchema),
        },
      },
    ],
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
    path: 'publications',
    redirectTo: '/research?category=publication&view=list&group-by=year',
  },
  {
    path: 'research',
    component: ResearchPageComponent,
    resolve: {
      news: createJsonSpecResolver(NEWS_INDEX_URL, ResearchDataSchema),
      publications: createJsonSpecResolver(PUBLICATIONS_INDEX_URL, ResearchDataSchema),
      events: createJsonSpecResolver(EVENT_INDEX_URL, ResearchDataSchema),
      funding: createJsonSpecResolver(FUNDING_INDEX_URL, ResearchDataSchema),
      visualizations: createJsonSpecResolver(VISUALIZATIONS_INDEX_URL, ResearchDataSchema),
      people: createJsonSpecResolver(PEOPLE_INDEX_URL, PeopleDataSchema),
      publicationTypes: createJsonSpecResolver(PUBLICATION_TYPES_INDEX_URL, ResearchTypesDataSchema),
      eventTypes: createJsonSpecResolver(EVENT_TYPES_INDEX_URL, ResearchTypesDataSchema),
      fundingTypes: createJsonSpecResolver(FUNDING_TYPES_INDEX_URL, ResearchTypesDataSchema),
      tags: createJsonSpecResolver(DISPLAY_TAGS_INDEX_URL, TagsDataSchema),
    },
  },
  {
    path: 'visitor-info',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/visitor-info-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Redirects
  {
    path: '2012-UCSDMap.html',
    redirectTo: '/2012-ucsdmap',
  },
  {
    path: 'all_news.html',
    redirectTo: '/research?category=news',
  },
  {
    path: 'amatria.html',
    redirectTo: '/amatria',
  },
  {
    path: 'collaborators.html',
    redirectTo: '/research?team=past&roles=collaborator',
  },
  {
    path: 'contact.html',
    redirectTo: '/contact',
  },
  {
    path: 'current_students.html',
    redirectTo: '/people?roles=phdStudent',
  },
  {
    path: 'current_team.html',
    redirectTo: '/people',
  },
  {
    path: 'funding.html',
    redirectTo: '/research?category=funding',
  },
  {
    path: 'history.html',
    redirectTo: '/about#our-history',
  },
  {
    path: 'home.html',
    redirectTo: '/',
  },
  {
    path: 'interactive_displays.html',
    redirectTo: '/research?category=display',
  },
  {
    path: 'jobs.html',
    redirectTo: '/jobs',
  },
  {
    path: 'latest_news.html',
    redirectTo: '/research?category=news',
  },
  {
    path: 'mission.html',
    redirectTo: '/about#our-mission',
  },
  {
    path: 'presentations.html',
    redirectTo: '/research?event=presentation',
  },
  {
    path: 'previous_collaborators.html',
    redirectTo: '/research?team=past&roles=collaborator',
  },
  {
    path: 'publications.html',
    redirectTo: '/research?category=publication',
  },
  {
    path: 'visitor_info.html',
    redirectTo: '/visitor_info',
  },
  {
    path: 'visualizations.html',
    redirectTo: '/research?category=visualization',
  },
  {
    path: 'workshops.html',
    redirectTo: '/research?event=workshop',
  },

  // Mount redirects
  createMountRedirectRoute('docs'),
  createMountRedirectRoute('images'),

  // Error pages
  {
    path: '500',
    component: ServerErrorPageComponent,
    data: {
      reportIssueLink: 'https://github.com/cns-iu/cns-website/issues/new',
    },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    component: ArchiveRedirectComponent,
  },
];
