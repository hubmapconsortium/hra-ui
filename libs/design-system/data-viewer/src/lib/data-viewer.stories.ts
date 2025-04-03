import { Meta, StoryObj } from '@storybook/angular';

import { DataViewerComponent, OrganData, OrganVersionData } from './data-viewer.component';

const testOrganData1: OrganData[] = [
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

const testOrganData2: OrganData[] = [
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

const testOrganVersionData: OrganVersionData[] = [
  {
    releaseName: '8th Release (v2.2)',
    releaseDate: 'December 2024',
    version: '2.2',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/2d-ftu/asct-b-2d-models-crosswalk/v1.4/assets/asct-b-2d-models-crosswalk.csv',
    organData: testOrganData1,
  },
  {
    releaseName: '7th Release (v2.1)',
    releaseDate: 'June 2024',
    version: '2.1',
    crosswalk:
      'https://cdn.humanatlas.io/digital-objects/2d-ftu/asct-b-2d-models-crosswalk/v1.3/assets/asct-b-2d-models-crosswalk.csv',
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
    allFtuCsvUrl: 'https://humanatlas.io/assets/table-data/ftu-cell-count-7th-release.csv',
    githubIconsUrl: 'https://github.com/cns-iu/md-icons/tree/main/other-icons/organs',
  },
};
export default meta;
type Story = StoryObj<DataViewerComponent>;

export const FtuDataViewer: Story = {
  args: {
    organVersionData: testOrganVersionData,
    variant: 'ftu',
  },
};
