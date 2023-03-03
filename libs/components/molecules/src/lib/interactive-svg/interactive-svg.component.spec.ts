import { Shallow } from 'shallow-render';

import { InteractiveSvgComponent } from './interactive-svg.component';

describe('InteractiveSvgComponent', () => {
  let shallow: Shallow<InteractiveSvgComponent>;

  beforeEach(async () => {
    shallow = new Shallow(InteractiveSvgComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('sets svg element', async () => {
    const { instance } = await shallow.render({
      bind: { url: 'assets/2d-ftu-kidney-descending-thin-loop-of-henle.svg' },
    });
    const parent = document.createElement('div') as unknown as SVGElement;
    const target = document.createElement('div') as unknown as SVGElement;
    target.id = 'Crosswalk';
    parent.appendChild(target);
    instance.setSvgElement(parent);
    expect(instance).toBeDefined();
  });

  // it('emits matching target id', async () => {
  //   const { instance, outputs } = await shallow.render({
  //     bind: { url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg' },
  //   });
  //   const target = document.createElement('div') as unknown as SVGElement;
  //   target.id = 'Type_x5F_I_x5F_Pneumocyte_x5F_2';
  //   instance.findHoverMatch(target);
  //   expect(outputs.nodeHover.emit).toHaveBeenCalledWith('Type_I_Pneumocyte_2');
  // });

  // it('emits matching parent id if no target id', async () => {
  //   const { instance, outputs } = await shallow.render({
  //     bind: { url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg' },
  //   });
  //   const parent = document.createElement('div');
  //   parent.id = 'Type_x5F_I_x5F_Pneumocyte';
  //   const target = document.createElement('div') as unknown as SVGElement;
  //   parent.appendChild(target);
  //   instance.findHoverMatch(target);
  //   expect(outputs.nodeHover.emit).toHaveBeenCalledWith('Type_I_Pneumocyte_1');
  // });
});
