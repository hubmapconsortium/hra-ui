import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const mockRouter = {
    events: of({}),
    navigate: jest.fn(),
    createUrlTree: jest.fn().mockReturnValue({}),
    serializeUrl: jest.fn().mockReturnValue('mock-url'),
    navigateByUrl: jest.fn(),
  };

  const mockActivatedRoute = {
    snapshot: {
      data: {
        documentationUrl: 'Neuron',
        typeLabel: 'https://docs.io/neuron',
      },
      root: {
        firstChild: {
          params: {
            type: 'ref-organ',
            name: 'heart',
          },
        },
      },
    },
  };

  const mockKgService = {
    digitalObjects: jest.fn().mockReturnValue(
      of({
        '@graph': [
          {
            '@id': 'https://lod.humanatlas.io/ref-organ/heart',
            title: 'Heart Object',
          },
        ],
      }),
    ),
  };

  it('should render the component and compute breadcrumbs', async () => {
    await render(AppComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Heart Object')).toBeInTheDocument();
  });

  it('uses default breadcrumbs if there are no params', async () => {
    const mockActivatedRoute2 = {
      snapshot: {
        root: {
          firstChild: {
            params: {},
          },
        },
      },
    };

    await render(AppComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute2 },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    expect(mockKgService.digitalObjects).toHaveBeenCalled();
    expect(screen.getByText('Knowledge Graph')).toBeInTheDocument();
  });
});
