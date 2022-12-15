import { LongCard } from "src/app/components/card-button-long/long-card";

export const longButtonItems: LongCard[] = [
    {
        icon: 'assets/images/asctb_reporter.svg',
        title: 'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Reporter',
        body: 'A visualization tool for human organ experts to explore and compare ASCT+B Tables',
        route: 'asctb-reporter'
    },
    {
        icon: 'assets/images/cell_graphs.svg',
        title: 'Cell Population Graphs',
        body: 'An interactive tool for exploring and comparing cell populations',
        route: 'cell-population-graphs'
    },
    {
        icon: 'assets/images/rui.svg',
        title: 'Registration User Interface (RUI)',
        body: 'An interactive tool for registering tissue blocks spatially and annotating them semantically using ASCT+B table terms',
        route: 'registration-user-interface'
    },
    {
        icon: 'assets/images/eui.svg',
        title: 'Exploration User Interface (EUI)',
        body: 'An interactive tool for exploring and validating spatially registered tissue blocks and cell type populations',
        route: 'exploration-user-interface'
    },
    {
        icon: 'assets/images/vr_gallery.svg',
        title: 'CCF Organ VR Gallery',
        body: 'An immersive application that allows users to explore 3D reference organs, anatomical structures, and cell types in virtual reality',
        route: 'vr-organ-gallery'
    },
    {
        icon: 'assets/images/hra_milletome.svg',
        title: 'Human Reference Atlas Millitome',
        body: 'A unique 3D printed tool and standard operating procedure for the uniform sectioning of organs',
        route: 'hra-millitome'
    },
    {
        icon: 'assets/images/hra_api.svg',
        title: 'Human Reference Atlas Application Programming Interfaces',
        body: 'Query and interact with the HRA using Python, JavaScript, SPARQL, REST, and more',
        route: 'ccf-hra-api'
    },
    {
        icon: 'assets/images/hra_usage.svg',
        title: 'Human Reference Atlas Usage Metrics',
        body: 'Data and statistics on which tools and consortia are using the Human Reference Atlas',
        route: 'usage-metrics'
    }
]
