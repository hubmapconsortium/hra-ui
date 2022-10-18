import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { UseButton } from 'src/app/components/use-button/use-button';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/rui.png',
        title: 'CCF Registration User Interface (RUI)',
        subtitle: 'An interactive tool for registering tissue blocks spatially and annotating them semantically using ASCT+B Table terms'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `This Registration User Interface (RUI) supports the registration of three-dimensional (3D) tissue blocks within 3D reference organs. A first beta of the CCF RUI became available in October 2020. The CCF RUI specification is available here, 3D reference organs are freely available on the CCF Portal, the ontology can be found on BioPortal, and the code is availble on GitHub. The registration data is used in current versions of the Common Coordinate Framework (CCF, see CCF Portal for details) and the CCF Exploration User Interface (EUI) developed within HuBMAP.`
    }
]

export const interfacedata: PageDataItems[] = [
    {
        heading: 'How to use the Registration User Interface',
        descriptions: `
        <ul>
            <li>Enter their name to track data provenance.</li>
            <li>Select a reference organ via the organ carousal (kidney, heart, spleen, colon).</li>
            <li>Select a set of common tissue extraction sites.</li>
            <li>Size the tissue block in three dimensions.</li>
            <li>Enter information on tissue section thickness.</li>
            <li>Position and rotate the 3D tissue block so that its placement correctly mirrors the tissue block extraction site.</li>
            <li>Identify anatomical structure tags via collision detection and manual annotation.</li>
            <li>Save all registration information into a file for easy uploading to custom templates in REDCap (or other systems) used to keep track of tissue and tissue registration data. If using the RUI integrated into the HuBMAP Ingestion Portal, registration information is automatically saved with the associated tissue block.</li>
        </ul>
        `
    }
]

export const acknowledgeData: PageDataItems[] = [
    {
        heading: 'Acknowledge',
        descriptions: `The CCF and associated user interfaces are developed by the MC-IU team within the HuBMAP HIVE. The MC-IU team includes Katy Börner, Lisel Record, Bruce Herr II, Leonard Cross, Ellen Quardokus, and Andreas Bueckle, Indiana University, Bloomington, IN and Griffin Weber, Harvard Medical School, Boston, MA. Former members of the team are Paul Macklin, Randy Heiland, and Jim Sluka at Indiana University, Bloomington, IN and Samuel Friedman, Opto-Knowledge Systems, Inc. We acknowledge expert input from Jeffrey Spraggins, Sanjay Jain, and Clive Wasserfall and their teams as well as the overall HuBMAP consortium.
        <br><br>The 3D reference organs were designed by Kristen Browne, U.S. National Library of Medicine using data from the <a href="https://www.nlm.nih.gov/research/visible/visible_human.html" target="_blank"><u>Visible Human Project</u></a>.
        <br><br>The work is funded by NIH Award <a href="https://reporter.nih.gov/project-details/9687220" target="_blank"><u>OT2OD026671</u></a>.`
    }
]

export const useRuiButton: UseButton = {
    text: 'Use the Registration User Interface',
    url: ''
}

export const ruiSopData: SopLinks[] = [
    {
        urls: ' SOP: Using the Registration User Interface',
        href: 'https://docs.google.com/document/d/1PhVDMZDiH-SKAF7LrDhZfv3xjjlAhISmRWSQcfUF-9U/edit'
    }
]