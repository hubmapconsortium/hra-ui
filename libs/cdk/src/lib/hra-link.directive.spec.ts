import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { createLinkId, LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { Shallow } from 'shallow-render';
import { LinkDirective } from './hra-link.directive';

jest.mock('@hra-ui/cdk/injectors');

describe('LinkDirective', () => {
  const buttonTemplate = `
    <button [hraLink]="linkId"></button>
  `;

  const anchorTemplate = `
  <a [hraLink]="linkId"></a>
   `;
  let shallow: Shallow<LinkDirective>;
  const internalLinkEntry = {
    type: LinkType.Internal,
    commands: [''],
  };
  const externalLinkEntry = {
    type: LinkType.External,
    url: 'http://test.com',
  };
  beforeEach(() => {
    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
    jest.mocked(dispatch).mockReturnValue(jest.fn());
    shallow = new Shallow(LinkDirective).replaceModule(
      RouterModule,
      RouterTestingModule.withRoutes([{ path: '' }], {
        initialNavigation: 'enabledBlocking',
      })
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should create an instance', async () => {
    await expect(shallow.render(buttonTemplate)).resolves.toBeDefined();
  });

  describe('onClick()', () => {
    it('should trigger onClick when hraLink is clicked and return true if no link', async () => {
      const { instance, fixture } = await shallow.render(buttonTemplate);
      const button = fixture.debugElement.nativeElement.querySelector('button');
      jest.spyOn(instance, 'onClick');
      button.click();
      expect(instance.onClick).toHaveBeenCalled();
      expect(instance.onClick(new MouseEvent('click'))).toBeTruthy();
    });

    it('should trigger navigate event on click of internal link', async () => {
      jest.mocked(selectQuerySnapshot).mockReturnValue(() => internalLinkEntry);
      jest.mocked(dispatch).mockReturnValue((id) => new LinkRegistryActions.Navigate(id));
      const { fixture } = await shallow.render(buttonTemplate, {
        bind: {
          linkId: createLinkId('test'),
        },
      });
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
    });

    describe('isAnchorElement', () => {
      it('should return true if external link', async () => {
        jest.mocked(selectQuerySnapshot).mockReturnValue(() => externalLinkEntry);
        const { instance, fixture } = await shallow.render(anchorTemplate);
        const a = fixture.debugElement.nativeElement.querySelector('a');
        a.click();
        expect(instance.onClick(new MouseEvent('click'))).toBeTruthy();
      });

      it('should return true if it is ctrlKey, shiftKey, altKey, metaKey', async () => {
        jest.mocked(selectQuerySnapshot).mockReturnValue(() => internalLinkEntry);
        const { instance, fixture, find } = await shallow.render(anchorTemplate);
        const a = fixture.debugElement.nativeElement.querySelector('a');
        // a.click({keyCode: 16})
      });
    });
  });
});
