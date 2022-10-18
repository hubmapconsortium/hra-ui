import { LongCard } from "src/app/components/card-button-long/long-card";

export const longButtonItems: LongCard[] = [
    {
        icon: 'assets/images/asctb_reporter.png',
        title: 'CCF Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Reporter',
        body: 'A visualization tool for human organ experts to explore and compare ASCT+B Tables',
        route: 'ccf-asctb-reporter'
    },
    {
        icon: 'assets/images/cell_graphs.png',
        title: 'CCF Cell Population Graphs',
        body: 'An interactive tool for exploring and comparing cell populations',
        route: 'ccf-cell-population-graphs'
    },
    {
        icon: 'assets/images/rui.png',
        title: 'CCF Registration User Interface (RUI)',
        body: 'An interactive tool for registering tissue blocks spatially and annotating them semantically using ASCT+B table terms',
        route: 'ccf-registration-user-interface'
    },
    {
        icon: 'assets/images/eui.png',
        title: 'CCF Exploration User Interface (EUI)',
        body: 'An interactive tool for exploring and validating spatially registered tissue blocks and cell type populations',
        route: 'ccf-exploration-user-interface'
    },
    {
        icon: 'assets/images/hra_milletome.png',
        title: 'Human Reference Atlas Millitome',
        body: 'A unique 3D printed tool and standard operating procedure for the uniform sectioning of organs',
        route: 'ccf-hra-millitome'
    },
    {
        icon: 'assets/images/hra_api.png',
        title: 'Human Reference Atlas Application Programming Interfaces',
        body: 'Query and interact with the HRA using Python, JavaScript, SPARQL, REST, and more',
        route: 'ccf-hra-api'
    },
    {
        icon: 'assets/images/hra_usage.png',
        title: 'Human Reference Atlas Usage Metrics',
        body: 'Data and statistics on which tools and consortia are using the Human Reference Atlas',
        route: ''
    }
]