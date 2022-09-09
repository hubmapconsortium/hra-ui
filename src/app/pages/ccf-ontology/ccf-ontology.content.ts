import { LongCard } from "src/app/components/card-button-long/long-card";
import { PageDataItems } from "src/app/components/page-data/page-data";
import { ImageData } from "src/app/components/simple-image/simple-image";

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `The CCF Ontology comprises a Clinical Ontology, Semantic Ontology, and Spatial Ontology, 
        see <b>Figure 1</b>. Collectively, the three ontologies make up the CCF Ontology (also called union ontology) 
        that supports spatially and semantically explicit search, filter, and browsing in the HuBMAP Portal.`
    }
]

export const ccfKnowledgeData: ImageData[] = [
    {
        title: 'Common Coordinate Framework Knowledge Architecture',
        description: '<b>Figure 1.</b> Tissue samples and datasets are annotated using the CCF Clinical, CCF Semantic, and CCF Spatial Ontologies.',
        image: 'assets/images/ontology.png'
    }
]

export const spatialOntologyData: ImageData[] = [
    {
        title: 'Spatial Ontology',
        description: `<b>Figure 2.</b> Spatial placement of anatomical structures in relation to the HuBMAP Atlas reference system. 
        Note that spatial entities can use different coordinate systems that are “mapped” into the common reference system.`,
        image: 'assets/images/spatial_ontology.png'
    }
]

export const relatedToolsData: LongCard[] = [
    {
        icon: 'assets/images/related_tools.png',
        title: 'Human Reference Atlas Application Programming Interfaces',
        body: 'Query and interact with the HRA using Python, JavaScript, SPARQL, REST, and more'
    }
]

export const ontologyWebData: LongCard[] = [
    {
        icon: 'assets/images/ontology_lookup_service.png',
        title: 'Ontology Lookup Service (OLS)',
        body: 'Repository for biomedical ontologies that aims to provide a single point of access to the latest ontology versions',
        externalLink: "www/google.com"
    },
    {
        icon: 'assets/images/bio_portal.png',
        title: 'BioPortal',
        body: `The world's most comprehensive repository of biomedical ontologies`,
        externalLink: "www/google.com"
    }
]

export const referencesData: PageDataItems[] = [
    {
        heading: "References",
        descriptions: `Herr II, Bruce W., Ellen M. Quardokus, Leonard E. Cross, Elizabeth G. Record, 
        Griffin M. Weber, and Katy Börner. 2020. HuBMAP CCF Ontology v1.0.0 (OWL format).
        <br><br>Herr II, Bruce W., Ellen M. Quardokus, Leonard E. Cross, Elizabeth G. Record, 
        Griffin M. Weber, and Katy Börner. 2020. HuBMAP CCF Ontology Source Code Repository.
        <br><br>Börner Katy, Ellen M. Quardokus, Bruce W. Herr II, Leonard E. Cross, Elizabeth G. Record, Yingnan Ju, Andreas D. Bueckle, 
        James P. Sluka, Jonathan C. Silverstein, Kristen M. Browne, Sanjay Jain, Clive H. Wasserfall, Marda L. Jorgensen, Jeffrey M. Spraggins, 
        Nathan H. Patterson, Mark A. Musen, and Griffin M. Weber. 2020. "Construction and Usage of a Human Body Common Coordinate 
        Framework Comprising Clinical, Semantic, and Spatial Ontologies." arXiv:2007.14474v1.`
    }
]

export const markdownData: string[] = [

    `<b>Clinical Ontology.</b> Captures CCF relevant clinical and other metadata such as donor sex, age, tissue
    sample author, and technology used.It does not capture all metadata associated with HuBMAP data.`,
    `<b>Semantic Ontology.</b> Mirrors the ASCT+B tables and includes the CCF Anatomical Structures Partonomy of anatomical structures and the 
    CCF Cell Types Ontology. Sources of ontology terms are UBERON, FMA, and Cell Ontology (CL).`,
    `<b>Spatial Ontology.</b> Defines the position, rotation, and size of anatomical structures—at the macro, micro, and 
    single-cell level—in correspondence to the HuBMAP Atlas reference system, shown below in <b>Figure 2. </b>
    Note that all anatomical structures are semantically annotated using terms from the Semantic Ontology.`

]