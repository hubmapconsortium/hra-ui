import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { UseButton } from "src/app/components/use-button/use-button";

export const pageHeaderData: PageHeaderItems[] = [
    {
        title: 'Human Reference Atlas Application Programming Interfaces',
        subtitle: 'Query and interact with the HRA using Python, JavaScript, SPARQL, REST, and more',
        image: 'assets/images/related_tools.svg'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: 'This API provides programmatic access to data registered to the Common Coordinate Framework. A listing of API endpoints and database schema descriptions with examples are provided.'
    }
]

export const acknowledgmentsData: PageDataItems[] = [
    {
        heading: 'Acknowledgments',
        descriptions: `The CCF work is under active development by the Indiana University Mapping Component as part of the HuBMAP HIVE effort with expert input by the HuBMAP team. 
        Data was provided by the HuBMAP Tissue Mapping Centers. This research is funded by the NIH Common Fund through the Office of Strategic Coordination/Office of the 
        NIH Director under award <a href="https://reporter.nih.gov/project-details/9687220" target="_blank">OT2OD026671</a>, by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, 
        and the NIH National Institute of Allergy and Infectious Diseases (NIAID), Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002.`
    }
]

export const useButtonData: UseButton =
{
    text: 'Use the Human Reference Atlas APIs',
    url: 'https://ccf-api.hubmapconsortium.org/#/operations/reference-organs'
}
