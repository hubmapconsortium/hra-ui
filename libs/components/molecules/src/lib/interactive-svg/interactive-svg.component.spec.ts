import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { InteractiveSvgComponent } from './interactive-svg.component';

describe('InteractiveSvgComponent', () => {
  let shallow: Shallow<InteractiveSvgComponent>;

  const testMapData = {
    'Inset #': '',
    OntologyID: 'CL:0002062',
    'REF/1': '',
    'REF/1/DOI': '',
    'REF/1/NOTES': '',
    anatomical_structure_of: '#FTUAlveoli',
    exist_asctb: '1',
    label: 'type I pneumocyte',
    node_name: 'Type_I_Pneumocyte_2',
    organ: '#Lung',
    organ_ID: 'UBERON:0002048',
    representation_of: 'http://purl.obolibrary.org/obo/CL_0002062',
    source_spatial_entity: '#2DRefObjects',
    'svg file of single 2DFTU': 'alveoli',
    type: 'CT',
  };

  const testMapData2 = {
    'Inset #': '',
    OntologyID: 'CL:0002062',
    'REF/1': '',
    'REF/1/DOI': '',
    'REF/1/NOTES': '',
    anatomical_structure_of: '#FTUAlveoli',
    exist_asctb: '1',
    label: 'type I pneumocyte',
    node_name: 'Type_I_Pneumocyte_1',
    organ: '#Lung',
    organ_ID: 'UBERON:0002048',
    representation_of: 'http://purl.obolibrary.org/obo/CL_0002062',
    source_spatial_entity: '#2DRefObjects',
    'svg file of single 2DFTU': 'alveoli',
    type: 'CT',
  };

  beforeEach(async () => {
    shallow = new Shallow(InteractiveSvgComponent).mock(HttpClient, { get: () => of({}) });
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('emits matching target id', async () => {
    const { instance, outputs } = await shallow.render({ bind: { fileName: 'alveoli' } });
    const target = document.createElement('div');
    target.id = 'Type_x5F_I_x5F_Pneumocyte_x5F_2';
    const event = { target } as unknown as MouseEvent;
    instance.findHoverMatch(event);
    expect(outputs.nodeData.emit).toHaveBeenCalledWith(testMapData);
  });

  it('emits matching parent id if no target id', async () => {
    const { instance, outputs } = await shallow.render({ bind: { fileName: 'alveoli' } });
    const parent = document.createElement('div');
    parent.id = 'Type_x5F_I_x5F_Pneumocyte';
    const target = document.createElement('div');
    parent.appendChild(target);
    const event = { target } as unknown as MouseEvent;
    instance.findHoverMatch(event);
    expect(outputs.nodeData.emit).toHaveBeenCalledWith(testMapData2);
  });
});
