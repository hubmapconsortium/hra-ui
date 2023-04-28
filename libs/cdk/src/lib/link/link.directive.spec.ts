import { SecurityContext } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { createLinkId, LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { Shallow } from 'shallow-render';
import { LinkDirective } from './link.directive';

jest.mock('@hra-ui/cdk/injectors');

describe('LinkDirective', () => {
  const buttonTemplate = `
    <button [hraLink]="linkId"></button>
  `;

  const anchorTemplate = `
  <a target="_blank" [hraLink]="linkId"></a>
   `;

  const linkTemplate = `
  <link [hraLink]="linkId"/>
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
    await expect(
      shallow.render(buttonTemplate, {
        bind: {
          linkId: createLinkId(''),
        },
      })
    ).resolves.toBeDefined();
  });

  it('should be a resource url if tagName contains base or link', async () => {
    const { instance } = await shallow.render(linkTemplate);
    expect(instance['isResourceUrl']).toEqual(true);
  });

  describe('onClick()', () => {
    it('should trigger onClick when hraLink is clicked and return true if no link', async () => {
      const { element, instance } = await shallow.render(buttonTemplate);
      jest.spyOn(instance, 'onClick');
      element.triggerEventHandler('click');
      expect(instance.onClick).toHaveBeenCalled();
      expect(instance.onClick(new MouseEvent('click'))).toBeTruthy();
    });

    it('should trigger dispatch event on click of internal link', async () => {
      jest.mocked(selectQuerySnapshot).mockReturnValue(() => internalLinkEntry as never);
      jest.mocked(dispatch).mockReturnValue((id) => new LinkRegistryActions.Navigate(id));
      const { element } = await shallow.render(buttonTemplate, {
        bind: {
          linkId: createLinkId('test'),
        },
      });
      element.triggerEventHandler('click');
      expect(dispatch).toHaveBeenCalledWith(LinkRegistryActions.Navigate);
    });

    describe('isAnchorElement', () => {
      it('should return true if external link', async () => {
        jest.mocked(selectQuerySnapshot).mockReturnValue(() => externalLinkEntry as never);
        const { element, instance } = await shallow.render(anchorTemplate);
        element.triggerEventHandler('click', { button: 0 });
        expect(instance.onClick(new MouseEvent('click'))).toBeTruthy();
      });

      it('should return true if it is ctrlKey, shiftKey, altKey, metaKey', async () => {
        jest.mocked(selectQuerySnapshot).mockReturnValue(() => internalLinkEntry as never);
        const { element, instance } = await shallow.render(anchorTemplate);

        const getMouseEvent = (prop: string) =>
          new MouseEvent('click', {
            [prop]: true,
          });
        const ctrlKey = getMouseEvent('ctrlKey');
        const shiftKey = getMouseEvent('shiftKey');
        const altKey = getMouseEvent('altKey');
        const metaKey = getMouseEvent('metaKey');
        jest.spyOn(instance, 'onClick');
        element.triggerEventHandler('click', ctrlKey);
        expect(instance.onClick(ctrlKey)).toBeTruthy();
        element.triggerEventHandler('click', shiftKey);
        expect(instance.onClick(shiftKey)).toBeTruthy();
        element.triggerEventHandler('click', altKey);
        expect(instance.onClick(altKey)).toBeTruthy();
        element.triggerEventHandler('click', metaKey);
        expect(instance.onClick(metaKey)).toBeTruthy();
      });
    });
  });
});
