import { Meta, StoryObj } from '@storybook/angular';

import { DataViewerComponent, OrganData, OrganVersionData } from './data-viewer.component';

const testFtuData1: OrganData[] = [
  {
    name: 'Kidneys',
    image: 'organ:kidneys',
    tissueData: [
      {
        name: 'Ascending Thin Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Cortical Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Descending Thin Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Inner Medullary Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Nephron',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-nephron/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Outer Medullary Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Renal Corpuscle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Thick Ascending Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
    ],
  },
  {
    name: 'Large Intestine',
    image: 'organ:large_intestine',
    tissueData: [
      {
        name: 'Crypt of Lieberkuhn',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
      },
    ],
  },
  {
    name: 'Liver',
    image: 'organ:liver',
    tissueData: [
      {
        name: 'Liver Lobule',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/liver-liver-lobule/v1.3',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/crosswalk.csv',
      },
    ],
  },
  {
    name: 'Lung',
    image: 'organ:lung',
    tissueData: [
      {
        name: 'Bronchial Submucosal Gland',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/lung-bronchial-submucosal-gland/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/crosswalk.csv',
      },
      {
        name: 'Pulmonary Alveolus',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/lung-pulmonary-alveolus/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/crosswalk.csv',
      },
    ],
  },
];

const testFtuData2: OrganData[] = [
  {
    name: 'Kidneys',
    image: 'organ:kidneys',
    tissueData: [
      {
        name: 'Ascending Thin Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Cortical Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Descending Thin Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Inner Medullary Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Nephron',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-nephron/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Outer Medullary Collecting Duct',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Renal Corpuscle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/crosswalk.csv',
      },
      {
        name: 'Thick Ascending Limb of Loop of Henle',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/crosswalk.csv',
      },
    ],
  },
  {
    name: 'Large Intestine',
    image: 'organ:large_intestine',
    tissueData: [
      {
        name: 'Crypt of Lieberkuhn',
        metadataUrl: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
        csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
      },
    ],
  },
];

const testFtuVersionData: OrganVersionData[] = [
  {
    releaseName: '8th Release (v2.2)',
    releaseDate: 'December 2024',
    version: '2.2',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/2d-ftu/asct-b-2d-models-crosswalk/v1.4/assets/asct-b-2d-models-crosswalk.csv',
    organData: testFtuData1,
  },
  {
    releaseName: '7th Release (v2.1)',
    releaseDate: 'June 2024',
    version: '2.1',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/2d-ftu/asct-b-2d-models-crosswalk/v1.3/assets/asct-b-2d-models-crosswalk.csv',
    organData: testFtuData2,
  },
];

const testOrganData1: OrganData[] = [
  {
    name: 'All Organs',
    image: 'organ:all_organs',
    tissueData: [
      {
        name: 'Female',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/united-female/v1.7',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
      },
      {
        name: 'Male',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/united-male/v1.7',
        threeDimImage: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-male/v1.7/assets/3d-vh-m-united.glb',
      },
    ],
  },
  {
    name: 'Brain',
    image: 'organ:brain',
    tissueData: [
      {
        name: 'Female',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/brain-female/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-female/v1.4/assets/3d-allen-f-brain.glb',
      },
      {
        name: 'Male',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/brain-male/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-male/v1.4/assets/3d-allen-m-brain.glb',
      },
    ],
  },
  {
    name: 'Eye',
    image: 'organ:eye',
    tissueData: [
      {
        name: 'Female, L',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/eye-female-left/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-female-left/v1.3/assets/3d-vh-f-eye-l.glb',
      },
      {
        name: 'Female, R',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/eye-female-right/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-female-right/v1.3/assets/3d-vh-f-eye-r.glb',
      },
      {
        name: 'Male, L',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/eye-male-left/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-male-left/v1.3/assets/3d-vh-m-eye-l.glb',
      },
      {
        name: 'Male, R',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/eye-male-right/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-male-right/v1.3/assets/3d-vh-m-eye-r.glb',
      },
    ],
  },
  {
    name: 'Fallopian Tube',
    image: 'organ:fallopian_tube_left',
    tissueData: [
      {
        name: 'Female, L',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/fallopian-tube-female-left/v1.2',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-left/v1.2/assets/3d-vh-f-fallopian-tube-l.glb',
      },
      {
        name: 'Female, R',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/fallopian-tube-female-right/v1.2',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-right/v1.2/assets/3d-vh-f-fallopian-tube-r.glb',
      },
    ],
  },
];

const testOrganData2: OrganData[] = [
  {
    name: 'All Organs',
    image: 'organ:all_organs',
    tissueData: [
      {
        name: 'Female',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/united-female/v1.7',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
      },
      {
        name: 'Male',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/united-male/v1.7',
        threeDimImage: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-male/v1.7/assets/3d-vh-m-united.glb',
      },
    ],
  },
  {
    name: 'Brain',
    image: 'organ:brain',
    tissueData: [
      {
        name: 'Female',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/brain-female/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-female/v1.4/assets/3d-allen-f-brain.glb',
      },
      {
        name: 'Male',
        metadataUrl: 'https://purl.humanatlas.io/ref-organ/brain-male/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-male/v1.4/assets/3d-allen-m-brain.glb',
      },
    ],
  },
];

const testOrganVersionData: OrganVersionData[] = [
  {
    releaseName: '8th Release (v2.2)',
    releaseDate: 'December 2024',
    version: '2.2',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/ref-organ/asct-b-3d-models-crosswalk/v1.7/assets/asct-b-3d-models-crosswalk.csv',
    extractionCsvUrl: 'https://lod.humanatlas.io/landmark/',
    referenceCsvUrl: 'https://lod.humanatlas.io/ref-organ/',
    organData: testOrganData1,
  },
  {
    releaseName: '7th Release (v2.1)',
    releaseDate: 'June 2024',
    version: '2.1',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/ref-organ/asct-b-3d-models-crosswalk/v1.6/assets/asct-b-3d-models-crosswalk.csv',
    extractionCsvUrl: 'https://lod.humanatlas.io/landmark/',
    referenceCsvUrl: 'https://lod.humanatlas.io/ref-organ/',
    organData: testOrganData2,
  },
];

const meta: Meta<DataViewerComponent> = {
  component: DataViewerComponent,
  title: 'Design System / Data Viewer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2579-13698',
    },
  },
  args: {
    githubIconsUrl: 'https://github.com/cns-iu/md-icons/tree/main/other-icons/organs',
  },
};
export default meta;
type Story = StoryObj<DataViewerComponent>;

export const FtuDataViewer: Story = {
  args: {
    organVersionData: testFtuVersionData,
    variant: 'ftu',
    allFtuCsvUrl: 'https://humanatlas.io/assets/table-data/ftu-cell-count-7th-release.csv',
  },
};

export const OrganModelViewer: Story = {
  args: {
    organVersionData: testOrganVersionData,
    variant: '3d-organ',
    allOrgansCsvUrl: 'https://humanatlas.io/assets/table-data/as-per-organ.csv',
  },
};
