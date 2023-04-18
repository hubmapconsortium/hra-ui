import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MaterialCssVarsModule, MaterialCssVarsService } from 'angular-material-css-vars';
import { mock } from 'jest-mock-extended';
import { Load } from './theming.actions';
import { ThemingContext, ThemingModel } from './theming.model';
import { ThemingState } from './theming.state';

describe('ThemingState', () => {
  const url = 'http://test.url';
  window.open = jest.fn();
  const ctx = mock<ThemingContext>({
    getState: () => {
      return mockState;
    },
  });

  const mockState: ThemingModel = {
    '--palette-primary-100': 'blue',
  };

  let state: ThemingState;
  let controller: HttpTestingController;
  let materialVars: MaterialCssVarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialCssVarsModule.forRoot()],
      providers: [ThemingState],
    });

    state = TestBed.inject(ThemingState);
    controller = TestBed.inject(HttpTestingController);
    materialVars = TestBed.inject(MaterialCssVarsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('load(ctx, action)', () => {
    it('should load the yaml file, and set theming variables', () => {
      jest.spyOn(materialVars, 'setVariable');
      state.load(ctx, new Load(url)).subscribe();
      const req = controller.expectOne(url);
      req.flush({ '--palette-primary-100': 'blue' });
      expect(req.request.url).toBe(url);
      expect(ctx.setState).toHaveBeenCalled();
      expect(materialVars.setVariable).toHaveBeenCalled();
    });
  });
});
