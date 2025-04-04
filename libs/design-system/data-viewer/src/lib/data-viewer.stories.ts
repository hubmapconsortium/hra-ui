import { Meta, StoryObj } from '@storybook/angular';

import { DataViewerComponent, OrganData, OrganVersionData } from './data-viewer.component';

const testFtuData1: OrganData[] = [
  {
    name: 'Kidneys',
    icon: 'organ:kidneys',
    viewerCardData: [
      {
        name: 'Ascending Thin Limb of Loop of Henle',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
        alt: 'Image of Ascending Thin Limb of Loop of Henle',
      },
      {
        name: 'Cortical Collecting Duct',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/2d-ftu-kidney-cortical-collecting-duct.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.2/assets/crosswalk.csv',
        alt: 'Image of Cortical Collecting Duct',
      },
      {
        name: 'Descending Thin Limb of Loop of Henle',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-descending-thin-loop-of-henle/v1.1/assets/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
        alt: 'Image of Descending Thin Limb of Loop of Henle',
      },
      {
        name: 'Inner Medullary Collecting Duct',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-inner-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
        alt: 'Image of Inner Medullary Collecting Duct',
      },
      {
        name: 'Nephron',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-nephron/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/2d-ftu-kidney-nephron.svg',
        crosswalk: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-nephron/v1.2/assets/crosswalk.csv',
        alt: 'Image of Nephron',
      },
      {
        name: 'Outer Medullary Collecting Duct',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/crosswalk.csv',
        alt: 'Image of Outer Medullary Collecting Duct',
      },
      {
        name: 'Renal Corpuscle',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/2d-ftu-kidney-renal-corpuscle.svg',
        crosswalk: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-renal-corpuscle/v1.2/assets/crosswalk.csv',
        alt: 'Image of Renal Corpuscle',
      },
      {
        name: 'Thick Ascending Limb of Loop of Henle',
        metadata: 'https://purl.humanatlas.io/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-thick-ascending-loop-of-henle/v1.2/assets/crosswalk.csv',
        alt: 'Image of Thick Ascending Limb of Loop of Henle',
      },
    ],
  },
  {
    name: 'Large Intestine',
    icon: 'organ:large_intestine',
    viewerCardData: [
      {
        name: 'Crypt of Lieberkuhn',
        metadata: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
        alt: 'Image of Crypt of Lieberkuhn',
      },
    ],
  },
  {
    name: 'Liver',
    icon: 'organ:liver',
    viewerCardData: [
      {
        name: 'Liver Lobule',
        metadata: 'https://purl.humanatlas.io/2d-ftu/liver-liver-lobule/v1.3',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/2d-ftu-liver-liver-lobule.svg',
        crosswalk: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/liver-liver-lobule/v1.3/assets/crosswalk.csv',
        alt: 'Image of Liver Lobule',
      },
    ],
  },
  {
    name: 'Lung',
    icon: 'organ:lungs',
    viewerCardData: [
      {
        name: 'Bronchial Submucosal Gland',
        metadata: 'https://purl.humanatlas.io/2d-ftu/lung-bronchial-submucosal-gland/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/2d-ftu-lung-bronchial-submucosal-gland.svg',
        crosswalk:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-bronchial-submucosal-gland/v1.1/assets/crosswalk.csv',
        alt: 'Image of Bronchial Submucosal Gland',
      },
      {
        name: 'Pulmonary Alveolus',
        metadata: 'https://purl.humanatlas.io/2d-ftu/lung-pulmonary-alveolus/v1.1',
        ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.ai',
        png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.png',
        svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/2d-ftu-lung-pulmonary-alveolus.svg',
        crosswalk: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/lung-pulmonary-alveolus/v1.1/assets/crosswalk.csv',
        alt: 'Image of Pulmonary Alveolus',
      },
    ],
  },
];

const testFtuData2: OrganData[] = testFtuData1.slice(0, 2);

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
    icon: 'organ:all_organs',
    viewerCardData: [
      {
        name: 'Female',
        metadata: 'https://purl.humanatlas.io/ref-organ/united-female/v1.7',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
      },
      {
        name: 'Male',
        metadata: 'https://purl.humanatlas.io/ref-organ/united-male/v1.7',
        threeDimImage: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-male/v1.7/assets/3d-vh-m-united.glb',
      },
    ],
  },
  {
    name: 'Brain',
    icon: 'organ:brain',
    viewerCardData: [
      {
        name: 'Female',
        metadata: 'https://purl.humanatlas.io/ref-organ/brain-female/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-female/v1.4/assets/3d-allen-f-brain.glb',
      },
      {
        name: 'Male',
        metadata: 'https://purl.humanatlas.io/ref-organ/brain-male/v1.4',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/brain-male/v1.4/assets/3d-allen-m-brain.glb',
      },
    ],
  },
  {
    name: 'Eye',
    icon: 'organ:eye',
    viewerCardData: [
      {
        name: 'Female, L',
        metadata: 'https://purl.humanatlas.io/ref-organ/eye-female-left/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-female-left/v1.3/assets/3d-vh-f-eye-l.glb',
      },
      {
        name: 'Female, R',
        metadata: 'https://purl.humanatlas.io/ref-organ/eye-female-right/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-female-right/v1.3/assets/3d-vh-f-eye-r.glb',
      },
      {
        name: 'Male, L',
        metadata: 'https://purl.humanatlas.io/ref-organ/eye-male-left/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-male-left/v1.3/assets/3d-vh-m-eye-l.glb',
      },
      {
        name: 'Male, R',
        metadata: 'https://purl.humanatlas.io/ref-organ/eye-male-right/v1.3',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/eye-male-right/v1.3/assets/3d-vh-m-eye-r.glb',
      },
    ],
  },
  {
    name: 'Fallopian Tube',
    icon: 'organ:fallopian_tube_left',
    viewerCardData: [
      {
        name: 'Female, L',
        metadata: 'https://purl.humanatlas.io/ref-organ/fallopian-tube-female-left/v1.2',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-left/v1.2/assets/3d-vh-f-fallopian-tube-l.glb',
      },
      {
        name: 'Female, R',
        metadata: 'https://purl.humanatlas.io/ref-organ/fallopian-tube-female-right/v1.2',
        threeDimImage:
          'https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-right/v1.2/assets/3d-vh-f-fallopian-tube-r.glb',
      },
    ],
  },
];

const testOrganData2: OrganData[] = testOrganData1.slice(0, 2);

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
  },
};

export const OrganModelViewer: Story = {
  args: {
    organVersionData: testOrganVersionData,
    variant: '3d-organ',
  },
};
