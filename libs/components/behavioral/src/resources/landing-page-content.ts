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

/** Landing page content */
export const LANDING_PAGE_CONTENT = { introData: getIntroData() };
