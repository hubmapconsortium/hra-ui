import { HoverContext, HoverDirective } from './hover.directive';
import { Shallow } from 'shallow-render';
import { TemplateRef } from '@angular/core';
import { mockDeep } from 'jest-mock-extended';

describe('HoverDirective', () => {
  const template = `
    <div [hraHover]="content"> Anchor element</div>
    <ng-template #content>Hover content</ng-template>
  `;

  let shallow: Shallow<HoverDirective>;

  beforeEach(() => {
    shallow = new Shallow(HoverDirective);
  });

  it('should create', async () => {
    await expect(shallow.render(template)).resolves.toBeDefined();
  });

  it('should attach overlayRef on mouseover', async () => {
    const { instance } = await shallow.render(template);
    const attachSpy = jest.spyOn(instance.overlayRef, 'attach');
    instance.startHover();
    expect(attachSpy).toHaveBeenCalled();
  });

  it('should detach overlayRef on mouseout', async () => {
    const { instance } = await shallow.render(template);
    const detachSpy = jest.spyOn(instance.overlayRef, 'detach');
    jest.spyOn(instance.overlayRef, 'hasAttached').mockReturnValue(true);
    instance.endHover();
    expect(detachSpy).toHaveBeenCalled();
  });

  it('should update content accordingly', async () => {
    const { instance } = await shallow.render(template);
    const content = mockDeep<TemplateRef<HoverContext<unknown>>>();
    const attachSpy = jest.spyOn(instance.overlayRef, 'attach').mockReturnThis();
    const detachSpy = jest.spyOn(instance.overlayRef, 'detach').mockReturnThis();
    jest.spyOn(instance.overlayRef, 'hasAttached').mockReturnValue(true);

    instance.content = content;
    expect(detachSpy).toHaveBeenCalled();
    expect(attachSpy).toHaveBeenCalledWith(instance.portal);
  });

  it('should update the context', async () => {
    const { instance } = await shallow.render(template);
    instance.data = 'test1';
    expect(instance.portal?.context?.$implicit).toEqual('test1');
  });
});
