import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { UseButton } from "src/app/components/use-button/use-button";

export const headerCardData: PageHeaderItems[] = [
    {
        image: 'assets/images/cell_population_header.png',
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
        descriptions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
]

export const buttonData: UseButton =
{
    text: "Use the Cell Population Graphs",
    url: "https://hubmapconsortium.github.io/tissue-bar-graphs/"
}
