import { ContactCard } from '../../components/contact-card/contact-card';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { UseButton } from '../../components/use-button/use-button';

export const headerData: PageHeaderItems[] = [
    {
        image: 'assets/images/4th_release.svg',
        title: '4th Release Notes',
        subtitle: `See what's new in the 4th Release (v1.3) of the Human Reference Atlas`
    }
]

export const fourthReleaseIntro: PageDataItems[] = [
    {
        heading: '',
        descriptions: `
        <b>Intro</b>
        <br><br>
        HuBMAP's Indiana University Mapping Component (MC-IU) has published the 4th Release of the Human Reference Atlas (v1.3), a digital atlas of the human body that lets users query & explore key anatomical structures, cell types, and biomarkers down to the cellular level.
        <br>
        
        `
    }
]

export const fourthReleaseStats: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>Stats</b>
        <br><br>
        The Human Reference Atlas now includes 57 reference organs with 1,588 anatomical structures.
        `
    }
]

export const hraHourEvent: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>HRA 24 Hour Event</b>
        <br><br>
        Check out the videos from our 24 hour live HRA Event that happened on December 9-10, 2022. There is plenty of great content about atlasing.
        `
    }
]

export const hourEventUseButton: UseButton =
{
    text: 'HRA 24 Hour Event Videos',
    url: 'https://humanatlas.io/events/2022-24h/'
}

export const asctbTables: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>ASCT+B Tables</b>
        <br><br>
        What is an ASCT+B table? 26 tables describe human anatomy, connect Anatomical Structures to Cell Types to Biomarkers.
        `
    }
]

export const asctbTablesButton: UseButton =
{
    text: 'Use the ASCT+B Tables',
    url: 'https://humanatlas.io/asctb-tables'
}

export const asctbReporter: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>ASCT+B Reporter</b>
        <br><br>
        Want to visualize ASCT+B Tables? Check out ASCT+B Reporter to see the interconnectedness.
        `
    }
]

export const asctbReporterButton: UseButton =
{
    text: 'Use the ASCT+B Reporter',
    url: 'https://hubmapconsortium.github.io/ccf-asct-reporter/'
}

export const ontologyValidations: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>ASCT+B Ontology Validations</b>
        <br><br>
        How are ASCT+B Tables validated? We use Ubergraph to check all relationships experts have asserted in the tables against established ontologies (namely Uberon and Cell Ontology). 
        Check out the results in GitHub.
        `
    }
]

export const ontologyValidationsButton: UseButton =
{
    text: 'Validation Tools GitHub Repository',
    url: 'https://github.com/hubmapconsortium/ccf-validation-tools/tree/v2022-11-30/logs'
}

export const threeDimRefObjects: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>3D Reference Objects</b>
        <br><br>
        3D Reference Objects are models representing human organs registered with real data (tissue blocks) attached to them.
        `
    }
]

export const threeDimRefObjectsButton: UseButton =
{
    text: '4th Release 3D Reference Objects',
    url: 'https://humanatlas.io/3d-reference-library'
}

export const eui: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>Exploration User Interface</b>
        <br><br>
        Check out the Exploration User Interface (EUI) to see our 3D Reference Objects in action.
        `
    }
]

export const euiButton: UseButton =
{
    text: 'Use the Exploration User Interface',
    url: 'https://portal.hubmapconsortium.org/ccf-eui'
}

export const rui: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>Registration User Interface</b>
        <br><br>
        Use the RUI to spatially place your tissue block data.
        `
    }
]

export const ruiButton: UseButton =
{
    text: 'Use the Registration User Interface',
    url: 'https://hubmapconsortium.github.io/ccf-ui/rui/'
}

export const vrOrganGallary: PageDataItems[] = [
    {
        heading: '',
        descriptions: `<b>VR Organ Gallery</b>
        <br><br>
        Want to explore 3D organs in virtual reality?! Check out the VR Organ Gallery.
        `
    }
]

export const vrOrganGallaryButton: UseButton =
{
    text: 'VR Organ Gallery',
    url: 'https://humanatlas.io/vr-organ-gallery'
}

export const previewButton1: UseButton =
{
    text: 'Preview: CCF Tissue Block Annotation: Mesh-Level Collision Detection',
    url: 'https://hubmapconsortium.github.io/hra-previews/pilots/pilot7.html'
}

export const previewButton2: UseButton =
{
    text: '<Title> Demo Page',
    url: 'https://www.google.com/'
}

export const contactCardData: ContactCard[] = [
    {
        image: 'assets/images/katy_borner.svg',
        name: 'Katy Börner',
        field: 'Research',
        role: 'MC-IU PI, CNS Director',
        email: 'katy@indiana.edu'
    },
    {
        image: 'assets/images/bruce_herr.svg',
        name: 'Bruce Herr II ',
        field: 'Development',
        role: 'Sr. Systems Architect, PM',
        email: 'bherr@indiana.edu'
    },
    {
        image: 'assets/images/andreas_buckle.svg',
        name: 'Andreas Bueckle ',
        field: 'Research',
        role: 'Research Scientist',
        email: 'abueckle@iu.edu'
    }
]