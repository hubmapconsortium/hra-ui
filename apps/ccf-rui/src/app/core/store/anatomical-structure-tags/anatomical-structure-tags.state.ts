import { createEntityCollections, EntityCollections } from '@angular-ru/cdk/entity';
import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, Injector, inject } from '@angular/core';
import { State } from '@ngxs/store';
import { combineLatest, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../models/anatomical-structure-tag';
import { ModelState } from '../model/model.state';
import { PageState } from '../page/page.state';
import { SceneState } from '../scene/scene.state';

/** Tag state model */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type */
export interface AnatomicalStructureTagStateModel {}

/**
 * Tag collection global state
 */
@StateRepository()
@State<EntityCollections<Tag, TagId, AnatomicalStructureTagStateModel>>({
  name: 'tags',
  defaults: {
    ...createEntityCollections(),
  },
})
@Injectable()
export class AnatomicalStructureTagState extends NgxsDataEntityCollectionsRepository<
  Tag,
  TagId,
  AnatomicalStructureTagStateModel
> {
  /** Injector */
  private readonly injector = inject(Injector);

  /** Observable of tags */
  @Computed()
  get tags$(): Observable<Tag[]> {
    return combineLatest([this.entities$, this.scene.nodeCollisions$]).pipe(
      map(([entities, collisions]) => {
        const tags: Tag[] = [];
        const added = new Set<string>();
        const removed = new Set<string>();
        Object.entries(entities).forEach(([id, tag]) => {
          if (tag.type === 'removed') {
            removed.add(id);
          } else {
            added.add(id);
            tags.push(tag);
          }
        });
        for (const model of collisions) {
          const iri = model.representation_of;
          if (iri && !removed.has(iri) && !added.has(iri)) {
            added.add(iri);
            tags.push({
              id: iri,
              label: model.tooltip as string,
              type: 'assigned',
            });
          }
        }
        return tags;
      }),
    );
  }

  /** Latest tags */
  private _latestTags: Tag[] = [];

  /** Latest tags */
  get latestTags(): Tag[] {
    return this._latestTags;
  }

  /** Reference to the model state */
  private model!: ModelState;
  /** Reference to the scene state */
  private scene!: SceneState;
  /** Page state */
  private page!: PageState;

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.model = this.injector.get(ModelState);
    this.scene = this.injector.get(SceneState);
    this.page = this.injector.get(PageState);

    this.tags$.subscribe((tags) => {
      this._latestTags = tags;
    });

    this.entities$.subscribe(() => this.page.setHasChanges());
  }

  /** Add multiple tags */
  @DataAction()
  addTags(tags: Tag[]): void {
    for (const tag of tags) {
      this.addTagRaw(tag);
    }
  }

  /** Add a single tag */
  @DataAction()
  addTag(tag: Tag): void {
    this.addTagRaw(tag);
  }

  /** Remove a single tag */
  @DataAction()
  removeTag(tag: Tag): void {
    const type = this.selectOne(tag.id)?.type;
    if (type === 'added' || type === 'removed') {
      this.removeOne(tag.id);
    } else {
      this.upsertOne({ ...tag, type: 'removed' });
    }
  }

  /**
   * Searches for matching tags (not in the state)
   *
   * @param text Search text
   * @param limit Maximum returned results hint
   * @returns external Search result
   */
  readonly searchExternal = (text: string, limit: number): ObservableInput<TagSearchResult> => {
    const matches = this.model.snapshot.anatomicalStructures.filter(
      (as) => as.name.toLowerCase().indexOf(text.toLowerCase()) !== -1,
    );
    return [
      {
        totalCount: matches.length,
        results: matches
          .map(
            (as): Tag => ({
              id: as.id,
              label: as.name,
              type: 'added',
            }),
          )
          .slice(0, limit),
      },
    ];
  };

  /**
   * Adds a tag. Implementation helper for `addTags` and `addTag`
   *
   * @param tag The tag
   */
  private addTagRaw(tag: Tag): void {
    if (this.snapshot.entities[tag.id]) {
      this.updateEntitiesMany([{ id: tag.id, changes: { type: 'added' } }]);
    } else {
      this.addEntityOne({ ...tag, type: 'added' });
    }
  }
}
