import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/network.png',
        title: 'CCF Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Reporter',
        subtitle: 'A visualization tool for human organ experts to explore and compare Anatomical Structures, Cell Types and Biomarkers (ASCT+B)  Tables'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `Anatomical structures, cell types, plus biomarkers (ASCT+B) tables aim to capture the nested part_of structure of human organ systems from gross anatomical structure scale to subcellular biomarker scale. Functional tissue units (FTUs) for an organ system are identified as well as the typology of cells and biomarkers used to uniquely identify cell types within that organ system (e.g., gene, protein, proteoforms, lipid or metabolic markers). Ontology terms and unique identifiers are matched to AS, CT, and B wherever possible for semantic search capability within MC-IU products: Registration User Interface (RUI), Exploration User Interface (EUI), and ASCT+B Reporter. The tables, which are used to develop a common coordinate framework (CCF) of the healthy human body (see HuBMAP Consortium website), are authored and reviewed by an international team of anatomists, pathologists, physicians, and other experts.
        <br><br>
        The CCF ASCT+B Reporter is a visualization tool for inspecting and exploring the tables. It includes a partonomy tree that presents relationships between various anatomical structures and substructures, that are linked to their respective cell types and biomarkers via bimodal networks. The Reporter also presents an indented list view of the partonomy tree. An addition to the network visualizations, the Reporter lists statistics for various metadata (e.g., counts of ASCT table entity types and relationship types) which are downloadable. The debug logger lists any issues related to the data provided in the table. The Reporter has a backend server, the ASCT+B API, to retrieve the data from Google Sheets and convert it to a machine-readable format.`
    }
]

export const acknowledgeData: PageDataItems[] = [
    {
        heading: 'Acknowledge',
        descriptions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
]

export const tutorialData: PageDataItems[] = [
    {
        heading: 'Tutorial',
        descriptions: ''
    }
]
