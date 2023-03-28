import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { Add, AddFromYaml, AddMany, LoadFromYaml, Navigate } from './link-registry.actions';
import { createLinkId, LinkRegistryContext, LinkRegistryModel, LinkType } from './link-registry.model';
import { LinkRegistryState } from './link-registry.state';

describe('LinkRegistryState', () => {
  const url = 'http://test.url';
  window.open = jest.fn();
  const ctx = mock<LinkRegistryContext>({
    getState: () => {
      return mockState;
    },
  });
  const TestId = createLinkId('Test');
  const mockState: LinkRegistryModel = {
    [TestId]: { type: LinkType.External, url },
    [createLinkId('')]: { type: LinkType.Internal, commands: [''] },
  };
  let state: LinkRegistryState;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LinkRegistryState],
    });

    state = TestBed.inject(LinkRegistryState);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('addOne(ctx, action)', () => {
    it('should add one entry', () => {
      state.addOne(
        ctx,
        new Add(TestId, {
          type: LinkType.Internal,
          commands: [''],
        })
      );
      expect(ctx.patchState).toHaveBeenLastCalledWith({
        [TestId]: {
          type: LinkType.Internal,
          commands: [''],
        },
      });
    });
  });

  describe('addMany(ctx, action)', () => {
    it('should add many entries', () => {
      const entries: LinkRegistryModel = {
        [createLinkId('test1')]: {
          type: LinkType.Internal,
          commands: [''],
        },
        [createLinkId('test1')]: {
          type: LinkType.External,
          url: url,
        },
      };

      state.addMany(ctx, new AddMany(entries));
      expect(ctx.patchState).toHaveBeenCalledWith(entries);
    });
  });

  describe('addYaml(ctx, action)', () => {
    const yaml = `
    Test:
      type: external
      url: foobar
    `;

    it('should add all entries from a yaml string', () => {
      state.addYaml(ctx, new AddFromYaml(yaml));
      expect(ctx.patchState).toHaveBeenCalledWith({
        [TestId]: {
          type: LinkType.External,
          url: 'foobar',
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

  describe('navigate(ctx, action)', () => {
    it('should navigate to an internal url based on type', async () => {
      jest.spyOn(state['router'], 'navigate');
      await state.navigate(ctx, new Navigate(createLinkId('')));
      expect(state['router'].navigate).toHaveBeenCalledWith([''], undefined);
    });

    it('should navigate to an external url based on type', async () => {
      jest.spyOn(window, 'open');
      await state.navigate(ctx, new Navigate(TestId));
      expect(window.open).toHaveBeenCalledWith(url, undefined, undefined);
    });

    it('should throw error if link not present', async () => {
      try {
        await state.navigate(ctx, new Navigate(createLinkId('foo')));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        expect(e.message).toBe("Cannot navigate to non-existing link 'LinkId:'foo''");
      }
    });
  });
});
