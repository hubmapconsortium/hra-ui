import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Shallow } from 'shallow-render';

import { AppWebComponent } from './app-web-component.component';
import { AppModule } from './app-web-component.module';
import { JsonLd, OrganData } from './models';

describe('AppWebComponent', () => {
  let shallow: Shallow<AppWebComponent>;
  const testOrgan: OrganData = {
    '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle',
    '@type': 'FtuIllustration',
    representation_of: 'UBERON:0001291',
    label: 'thick ascending limb of loop of Henle',
    organ_id: 'UBERON:0002113',
    organ_label: 'Kidney',
    illustration_files: [
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#svg_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        file_format: 'image/svg+xml',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#png_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.png',
        file_format: 'image/png',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#ai_file',
        '@type': 'FtuIllustrationFile',
        file: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.ai',
        file_format: 'application/pdf',
      },
    ],
    mapping: [
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_1',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_1',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_2',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_2',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_3',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_3',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_4',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_4',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_5',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_5',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_6',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_6',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_7',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_7',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_8',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_8',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id': 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Thick_Ascending_Limb_Cell_9',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Thick_Ascending_Limb_Cell_9',
        label: 'kidney loop of Henle thick ascending limb epithelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001106',
      },
      {
        '@id':
          'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle#Endothelium_Peritubular_Capillary',
        '@type': 'FtuIllustrationNode',
        svg_id: 'Endothelium_Peritubular_Capillary',
        label: 'peritubular capillary endothelial cell',
        representation_of: 'http://purl.obolibrary.org/obo/CL_1001033',
      },
    ],
  };
  const testData: JsonLd = {
    '@context': '',
    '@graph': [testOrgan],
  };

  beforeEach(async () => {
    shallow = new Shallow(AppWebComponent, AppModule).replaceModule(HttpClientModule, HttpClientTestingModule);
  });

  it('finds the correct url when input is a string id', async () => {
    const { instance } = await shallow.render({
      bind: { src: 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle' },
    });
    instance.setData().subscribe((data) => expect(data).toEqual(testData));
  });

  it('finds the correct url when input is object with data', async () => {
    const { instance } = await shallow.render({ bind: { src: testOrgan } });
    instance.ngOnInit();
  });
});
