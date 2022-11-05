import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

export const hraUsageHeading: PageHeaderItems[] = [
    {
        image: 'assets/images/hra_usage.svg',
        title: 'Human Reference Atlas Usage Metrics',
        subtitle: 'Data and statistics on which tools and consortia are using the Human Reference Atlas'
    }
]

export const hubmapGteMetricsData: PageDataItems[] = [
    {
        heading: 'HuBMAP Metrics',
        descriptions: `The RUI is deployed in the HuBMAP Ingest Portal and used to add standardized spatial and biological structure (ASCT+B aligned) annotations. 
        The EUI is available via Data Portal. ASCT+B terms are used by Vitessce to assign ontology-aligned cell type annotations for Azimuth cell by gene annotations and soon CODEX cell type annotations.`
    },
    {
        heading: 'GTEx Metrics',
        descriptions: `<b>Monthly users, if applicable (based on one or more of the following: monthly downloads
            from websites, monthly downloads from package managers, monthly unique requests for updates, etc.)</b>
            There are about 4,400 papers citing “gtex portal” in Google Scholar. There are 28,000 results
            in Google Scholar citing “gtex”.
            We have an average of 20,000 users and 160,000 pageviews per month, based on Google
            Analytics data. It is difficult for us to track the number of monthly downloads, as our files are stored in Google Cloud Storage (GCS) and it is difficult for us to track
            downloads from GCS. Our downloads page has approximately 6,500 pageviews per month. Some of those pageviews may result in 0 file downloads while others may result in multiple file downloads.
            <br><br>
            <b>Software Projects that depend on the project</b><br>
            API is public and allows for anonymous access, so it is hard for us to know which software
            projects depend on the GTEx Portal. We do know that the NIH Common Fund Data Ecosystem Portal will be using our gene expression API to display gene expression data. 
            The Human BioMolecular Atlas Program (HuBMAP) uses our API to retrieve summary data about our samples. Several pharmaceutical and biotechnology companies have developed internal applications that depend upon our API, including Novo Nordisk. 
            Our top referrals are from <a href="https://genecards.org" target="_blank">https://genecards.org</a>, which displays GTEx gene expression data and provides links back to the GTEx Portal.<br><br>
            <b>Monthly visitors to project's website, discussion forum (e.g., Stack Overflow)</b><br>
            The number of monthly visitors to the web site is 20,000, based on Google Analytics data.`
    },
    {
        heading: 'Software',
        descriptions: `<h2>CCF UI (RUI + EUI + WCs) Requests for May</h2> HuBMAP ID Generator is in the ingest portal. Those numbers are artificially high because the google analytics for the RUI actually starts when they go to the site 
        May 2022:<br>`
    }
]

export const trainingMaterials: PageDataItems[] = [
    {
        heading: 'Training Materials',
        descriptions: `Videos, including the main video have been accessed xx times. In June 2022, the Visible Human MOOC has welcomed more than 160 students.
        <br>Here are current view numbers for select videos via YouTube (<a href="https://www.youtube.com/playlist?list=PLuJUUASr8daNUIGpZRgp1bVC12kODL6pv" target="_blank">https://www.youtube.com/playlist?list=PLuJUUASr8daNUIGpZRgp1bVC12kODL6pv</a>):
        <br>HuBMAP Overview: 3,624
        <br>Intro Ontologies: 406
        <br>ASCT+B for Collision Detection in RUI and Semantic Search in EUI by Bruce W. Herr II: 10
        <br>The HuBMAP Common Coordinate Framework (CCF): 157
        <br>HuBMAP Portal Design and Usage: Data and Code in 1st Portal Release: 91
        <br>Jeff Spraggins Presents TMC-VU: 75
        <br>Introduction to Data Harmonization with Seurat (feat. Rahul Satija): 741
        <br>Introduction to Anatomical Structures and Cell Types plus Biomarkers (ASCT+B) Tables: 103
        <br>CODEX Data on HuBMAP Portal: 88
        <br>Vitessce and Data Portal (2021): 21
        <br><br>The playlist itself has been visited 164 times.`
    },
    {
        heading: 'Licenses',
        descriptions: `<b>ASCT+B Working Group</b>: All meeting <a href="https://drive.google.com/drive/u/1/folders/1dwXw8oSvBIIIygHwMHNiYVPWB9adyUW_" target="_blank">slides</a> are freely available and meeting video recordings are on this <a href="https://www.youtube.com/playlist?list=PL-CUnYVIy7DNJc1FhqPsFPzDmd-bQD1jf" target="_blank">YouTube channel</a>. Anyone is welcome to join this effort-please register <a href="https://iu.co1.qualtrics.com/jfe/form/SV_bpaBhIr8XfdiNRH" target="_blank">here</a> to receive meeting invites and updates.
        <br><br><b>Data</b>: All Creative Commons Attribution 4.0 International (CC BY 4.0).
        3D Brain has a different license and we are in the process of identifying an alternative 3D reference.
        <br><br><b>Code</b>: MIT License (no restrictions on commercial use) for all CCF user interfaces (UI), e.g., ASCT+B Reporter, Registration UI, Exploration UI, Cell Type Population bar graphs.
        <br><br><b>Training Materials</b>: The Visible Human MOOC is freely available to anyone. All publications are freely available on arxiv or bioarxiv.`
    }
]