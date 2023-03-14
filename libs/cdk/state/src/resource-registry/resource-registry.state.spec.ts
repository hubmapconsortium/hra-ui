import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { Add, AddFromYaml, AddMany, LoadFromYaml, LoadMarkdown } from './resource-registry.actions';
import { createResourceId, ResourceRegistryContext, ResourceType } from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

describe('ResourceRegistryState', () => {
  const ctx = mock<ResourceRegistryContext>();
  let state: ResourceRegistryState;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceRegistryState],
    });

    state = TestBed.inject(ResourceRegistryState);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('addOne(ctx, action)', () => {
    it('should add one entry', () => {
      state.addOne(
        ctx,
        new Add(createResourceId('test'), {
          type: ResourceType.Markdown,
          markdown: 'foobar',
        })
      );
      expect(ctx.patchState).toHaveBeenLastCalledWith({
        [createResourceId('test')]: {
          type: ResourceType.Markdown,
          markdown: 'foobar',
        },
      });
    });
  });

  describe('addMany(ctx, action)', () => {
    it('should add many entries', () => {
      const entries = {
        [createResourceId('test1')]: {
          type: ResourceType.Markdown,
          markdown: 'foobar',
        },
        [createResourceId('test2')]: {
          type: ResourceType.Url,
          url: 'https://google.com',
        },
      };

      state.addMany(ctx, new AddMany(entries));
      expect(ctx.patchState).toHaveBeenCalledWith(entries);
    });
  });

  describe('addYaml(ctx, action)', () => {
    const yaml = `
    test:
      type: markdown
      markdown: foobar
    `;

    it('should add all entries from a yaml string', () => {
      state.addYaml(ctx, new AddFromYaml(yaml));
      expect(ctx.patchState).toHaveBeenCalledWith({
        [createResourceId('test')]: {
          type: ResourceType.Markdown,
          markdown: 'foobar',
        },
      });
    });
  });

  describe('loadYaml(ctx, action)', () => {
    it('should load yaml file and call addYaml', () => {
      jest.spyOn(state, 'addYaml');
      state.loadYaml(ctx, new LoadFromYaml('http://google.com')).subscribe();
      const req = controller.expectOne('http://google.com');
      req.flush({});
      expect(req.request.url).toBe('http://google.com');
      expect(state.addYaml).toHaveBeenCalled();
    });
  });

  describe('loadMarkdown(ctx, action', () => {
    it('should load markdown and call addOne', () => {
      jest.spyOn(state, 'addOne');
      state.loadMarkdown(ctx, new LoadMarkdown(createResourceId('test'), 'http://google.com')).subscribe();
      const req = controller.expectOne('http://google.com');
      req.flush({});
      expect(req.request.url).toBe('http://google.com');
      expect(state.addOne).toHaveBeenCalled();
    });
  });
});
