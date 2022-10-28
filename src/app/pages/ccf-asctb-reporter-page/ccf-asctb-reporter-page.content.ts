import { UseButton } from 'src/app/components/use-button/use-button';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/asctb_reporter.svg',
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
        heading: 'Acknowledgments',
        descriptions: `The CCF work is under active development by the Indiana University Mapping Component as part of the HuBMAP HIVE effort with expert input by the HuBMAP team. 
        Data was provided by the HuBMAP Tissue Mapping Centers. This research is funded by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award 
        <a href="https://reporter.nih.gov/project-details/9687220" target="_blank">OT2OD026671</a>, 
        by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, and the NIH National Institute of Allergy and Infectious Diseases (NIAID), Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002.`
    }
]

export const useButtonData: UseButton = {
    text: 'Use the ASCT+B Table Reporter',
    url: 'https://hubmapconsortium.github.io/ccf-asct-reporter/'
}
