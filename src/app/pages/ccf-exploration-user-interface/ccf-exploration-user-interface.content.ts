import { UseButton } from 'src/app/components/use-button/use-button';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/eui.svg',
        title: 'CCF Exploration User Interface (EUI)',
        subtitle: 'An interactive tool for exploring and validating spatially registered tissue blocks and cell type populations'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `The CCF Exploration User Interface (EUI) represents data across multiple scales, supporting navigation by multiple coordinate systems, including spatial, physiologic, and organ-based browsing. The first proof-of-concept user interface for the CCF v1.0.0 became available in June 2020. The EUI continues to evolve as more data becomes available. The CCF EUI code is available on <a href = "https://github.com/hubmapconsortium/ccf-ui" target="__blank">GitHub</a>.`
    }
]

export const interfacedata: PageDataItems[] = [
    {
        heading: 'How to use the Exploration User Interface',
        descriptions: `
        <ul>
            <li>Select Organ: One can navigate available organs by selecting them from the carousel above the stage or using the ontology on the left.</li>
            <li>Filter: Above the Search is the Filter icon which opens a flyout with many options (e.g. Sex, Assay Types, etc) for refining what tissue data is presented.</li>
            <li>Registered Blocks: It is possible to select a block of tissue samples either using the bodies on stage or the cards in the right column.Color coding helps to identify  different selections.</li>
            <li>Data: Using the cards in the right column, click on items to dig deeper into the data.</li>
        </ul>
        `
    }
]

export const acknowledgeData: PageDataItems[] = [
    {
        heading: 'Acknowledgments',
        descriptions: `The CCF work is under active development by the Indiana University Mapping Component as part of the HuBMAP HIVE effort with expert input by the HuBMAP team. Data was provided by the HuBMAP Tissue Mapping Centers. This research is funded by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award <a class="link" href = "https://reporter.nih.gov/project-details/9687220" target="_blank">OT2OD026671</a>, by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, and the NIH National Institute of Allergy and Infectious Diseases (NIAID), Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002.`
    }
]

export const tutorialData: PageDataItems[] = [
    {
        heading: 'Tutorial',
        descriptions: ''
    }
]

export const useEuiButton: UseButton = {
    text: 'Use the Exploration User Interface',
    url: 'https://portal.hubmapconsortium.org/ccf-eui'
}