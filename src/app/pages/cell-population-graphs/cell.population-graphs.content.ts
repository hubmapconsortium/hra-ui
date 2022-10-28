import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { UseButton } from "src/app/components/use-button/use-button";

export const headerCardData: PageHeaderItems[] = [
    {
        image: 'assets/images/cell_population_header.svg',
        title: 'CCF Cell Population Graphs',
        subtitle: 'An interactive tool for exploring and comparing cell populations'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `Visualization tool for comparing cell type distributions from single cell RNA sequencing datasets from HuBMAP and other public data portals. 
        The number of cells per cell type in a dataset (e.g., derived from a tissue block, tissue section, or biopsy) is visualized as count or percentage in a bar graph. 
        Datasets can be sorted by total cell count or tissue block location (for blocks that were registered into a 3D reference organ model) and they can be grouped by dataset-specific properties (e.g., age, ethnicity, sex, or UV exposure).`
    }
]

export const acknowledgmentsData: PageDataItems[] = [
    {
        heading: "Acknowledgments",
        descriptions: `The CCF work is under active development by the Indiana University Mapping Component as part of the HuBMAP HIVE effort with expert input by the HuBMAP team. 
        Data was provided by the HuBMAP Tissue Mapping Centers. This research is funded by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award 
        <a href="https://reporter.nih.gov/project-details/9687220" target="_blank">OT2OD026671</a>, by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, 
        and the NIH National Institute of Allergy and Infectious Diseases (NIAID), Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002.`
    }
]

export const buttonData: UseButton =
{
    text: "Use the Cell Population Graphs",
    url: "https://hubmapconsortium.github.io/tissue-bar-graphs/"
}
