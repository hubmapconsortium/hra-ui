import { HttpClient } from '@angular/common/http';
import { computed, ErrorHandler, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResolveFn } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, filter, forkJoin, map, of, pipe, switchMap, take, tap } from 'rxjs';
import { TagItem, TagsDataSchema } from '../../schemas/tags.schema';

/** Parameters for loading tag data */
export interface LoadTagsParams {
  /** URL to load category tags from */
  categoriesUrl: string;
  /** URL to load project tags from */
  projectsUrl: string;
}

/** Store for managing tag data */
interface TagsState {
  /** Category tag items */
  categoryItems: TagItem[] | null;
  /** Project tag items */
  projectItems: TagItem[] | null;
  /** Loading state for tag data */
  loading: boolean;
}

/** Initial state for the tags store */
const initialState: TagsState = {
  categoryItems: null,
  projectItems: null,
  loading: false,
};

/**
 * Creates a resolver function for loading tag data into the TagsStore before route activation
 *
 * @param params Parameters for loading tag data
 * @returns Resolver function
 */
export function createTagsResolver(params: LoadTagsParams): ResolveFn<TagItem[]> {
  return () => {
    const tags = inject(TagsStore);
    if (tags.categoryItems() && tags.projectItems()) {
      return of(tags.tags());
    } else if (!tags.loading()) {
      tags.loadAll(params);
    }

    return tags.loading$.pipe(
      filter((loading) => !loading),
      take(1),
      map(() => tags.tags()),
    );
  };
}

/** Tags store for managing tag data */
export const TagsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const tags = computed(() => {
      const categoryItems = store.categoryItems() ?? [];
      const projectItems = store.projectItems() ?? [];
      return [...categoryItems, ...projectItems];
    });

    const tagsMap = computed(() => new Map(tags().map((item) => [item.slug, item])));

    return {
      tags,
      tagsMap,
    };
  }),
  withProps((store) => ({
    loading$: toObservable(store.loading),
  })),
  withMethods((store) => {
    const http = inject(HttpClient);
    const errorHandler = inject(ErrorHandler);

    const load = (key: string, url: string) => {
      return http.get(url, { responseType: 'json' }).pipe(
        map((response) => TagsDataSchema.parse(response)),
        tap((data) => patchState(store, { [key]: data })),
        catchError((error) => {
          errorHandler.handleError(error);
          return of(undefined);
        }),
        take(1),
      );
    };

    return {
      loadAll: rxMethod<LoadTagsParams>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((params) => {
            const category$ = load('categoryItems', params.categoriesUrl);
            const project$ = load('projectItems', params.projectsUrl);
            return forkJoin([category$, project$]);
          }),
          tap(() => patchState(store, { loading: false })),
        ),
      ),
    };
  }),
  withMethods((store) => {
    const getItemsByIds = (ids: string[]) => {
      const tagMap = store.tagsMap();
      return ids.map((id) => tagMap.get(id)).filter((item): item is TagItem => !!item);
    };

    const getLabelsByIds = (ids: string[]) => getItemsByIds(ids).map((item) => item.name);

    return {
      getItemsByIds,
      getLabelsByIds,
    };
  }),
);
