/** Function to return landing page intro data */
const getIntroData = (hubMap = '', cellxGene = '', neMo = '', gTex = '', partners = ['', '']) => {
  return {
    title: 'Welcome to the Functional Tissue Unit Explorer',

    description: `A functional tissue unit (FTU) is the smallest tissue organization that performs a unique physiologic function and
    is replicated multiple times in a whole organ. Explore medical illustrations of FTUs to view cell type populations
    by gene, protein, and lipid biomarkers. The FTU Explorer features experimental datasets from
    <a href='${hubMap}' target='_blank'>HuBMAP</a>, <a href='${cellxGene}' target='_blank'>CellxGene</a>,
    <a href='${neMo}' target='_blank'>NeMO</a>, and <a href='${gTex}' target='_blank'>GTEx</a>.`,

    partners: `A special thanks to our partners: The FTU Explorer was designed in close collaboration with
    <a href='${partners[0]}' target='_blank'>Kidney Precision Medicine Project</a> and <a href='${partners[1]}'>European Bioinformatics Institute.</a>`,

    moreText: 'Explore FTUs',

    img: 'assets/welcome.svg',
  };
};
const metrics = () => {
  return {
    logo: '/assets/logo.svg',
    title: 'Metrics of the Human Reference Atlas',
    metrics: [
      { icon: '/assets/diversity.svg', value: '17', description: 'consortia' },
      { icon: '/assets/publications.svg', value: '1,000+', description: 'publications' },
      { icon: '/assets/experts.svg', value: '250+', description: 'experts' },
      { icon: '/assets/structures.svg', value: '2,665', description: 'anatomical structures' },
      { icon: '/assets/celltypes.svg', value: '953', description: 'cell types' },
      { icon: '/assets/biomarkers.svg', value: '2,842', description: 'biomarkers' },
    ],
  };
};

const landingPageDepth = () => {
  return {
    title: 'Explore Medical Illustrations of the Human Reference Atlas',
    img: 'assets/2d-ftu-pancreas-islets-langerhans.svg',
    moreText: 'Read more about this effort',
    description: `
    The 2D Functional Tissue Unit Library provides anatomically correct illustrations of functional tissue units (FTUs).
    The illustrations are developed by a specialist in 2D medical illustration and approved by organ experts.
    Illustrations are created using terms from the Anatomical Structures, Cell Types, and Biomarker (ASCT+B) table for each organ.
    Subject matter experts collaborate on a list of anatomical structures and/or cell types to be included in each FTU
    `,
  };
};
/** Landing page content */
export const LANDING_PAGE_CONTENT = {
  introData: getIntroData(),
  metrics: metrics(),
  landingPageDepth: landingPageDepth(),
};
