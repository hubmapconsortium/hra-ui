import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { Add, AddFromYaml, AddMany, LoadFromYaml, LoadMarkdown } from './resource-registry.actions';
import { BuiltinResourceType, createResourceId, ResourceRegistryContext } from './resource-registry.model';
import { ResourceRegistryState } from './resource-registry.state';

describe('ResourceRegistryState', () => {
  const url = 'http://test.url';
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
          type: BuiltinResourceType.Markdown,
          markdown: 'foobar',
        })
      );
      expect(ctx.patchState).toHaveBeenLastCalledWith({
        [createResourceId('test')]: {
          type: BuiltinResourceType.Markdown,
          markdown: 'foobar',
        },
      });
    });
  });

  describe('addMany(ctx, action)', () => {
    it('should add many entries', () => {
      const entries = {
        [createResourceId('test1')]: {
          type: BuiltinResourceType.Markdown,
          markdown: 'foobar',
        },
        [createResourceId('test2')]: {
          type: BuiltinResourceType.Url,
          url: url,
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
          type: BuiltinResourceType.Markdown,
          markdown: 'foobar',
        },
      });
    });
  });

  describe('loadYaml(ctx, action)', () => {
    it('should load yaml file and call addYaml', () => {
      jest.spyOn(state, 'addYaml');
      state.loadYaml(ctx, new LoadFromYaml(url)).subscribe();
      const req = controller.expectOne(url);
      req.flush({});
      expect(req.request.url).toBe(url);
      expect(state.addYaml).toHaveBeenCalled();
    });
  });

  describe('loadMarkdown(ctx, action', () => {
    it('should load markdown and call addOne', () => {
      jest.spyOn(state, 'addOne');
      state.loadMarkdown(ctx, new LoadMarkdown(createResourceId('test'), url)).subscribe();
      const req = controller.expectOne(url);
      req.flush({});
      expect(req.request.url).toBe(url);
      expect(state.addOne).toHaveBeenCalled();
    });
  });
});
