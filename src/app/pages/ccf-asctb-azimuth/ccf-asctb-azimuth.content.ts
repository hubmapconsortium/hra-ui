import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

export const azimuthHeader:PageHeaderItems[] = [
    {
        image: 'assets/images/azimuth.png',
        title: 'ASCT+B Cell Types Data from Azimuth Reference Data with Summaries',
        subtitle: 'Crosswalks from Azimuth cell annotation tool to ASCT+B tables will cell population data'
    }
]

export const overviewAzimuthData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `Among others, <a href="https://hubmapconsortium.github.io/ccf/pages/ccf-anatomical-structures.html" target="_blank">ASCT+B tables</a> represent cell by gene (CxG) relationships that are also captured in the organ-specific HuBMAP <a href="https://azimuth.hubmapconsortium.org/" target="_blank">Azimuth references</a>. 
        This site provides (1) cell type typology data from Azimuth that can be visualized in the <a href="https://hubmapconsortium.github.io/ccf-asct-reporter/" target="_blank">ASCT+B Reporter</a>; (2) results for comparing CxG in ASCT+B vs. CxG in Azimuth at the organ level; 
        (3) ASCT+B to Azimuth crosswalks.
        In May 2022, Azimuth supports single-cell RNA-seq data exclusively [1]. 
        However, we look forward to add other biomarker types in the future (e.g., using multi-omit 'bridge' datasets that map ATAC-seq, methylation, CUT&Tag or CyTOF profiles onto scRNA-seq references [2]).
        `
    },
    {
        heading: 'Azimuth Cell Type Typologies and Cell Populations',
        descriptions: `In May 2022, nine scRNA-seq reference maps for human are available via Azimuth. 
        For each, we parsed the data available at <a href="https://github.com/satijalab/azimuth_website" target="_blank">https://github.com/satijalab/azimuth_website</a> to compute a cell type typology in a format that can be visualized in the <a href="https://hubmapconsortium.github.io/ccf-asct-reporter/" target="_blank">ASCT+B Reporter</a> together. 
        In addition, we compiled a table that lists the annotation level and the number of cell types for each unique cell for display in the <a href="https://hubmapconsortium.github.io/tissue-bar-graphs/" target="_blank">HRA Cell Populations</a> bar graph visualization 
        in the organ-specific Azimuth reference. Both datasets are given in Table 1. Code is available on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>.`
    }
]

export const TermsOfUseData: PageDataItems[] = [
    {
        heading: 'Crosswalk',
        descriptions: '<b>Text to be inserted</b>'
    },
    {
        heading: 'Code on Github',
        descriptions: 'All code is freely available on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>.'
    },
    {
        heading: 'Terms of Use',
        descriptions: `HuBMAP data are supplied with no warranties, expressed or implied, including without limitation, any warranty of merchantability or fitness for a particular purpose or non-infringement. 
        No warranty with respect to the HuBMAP infrastructure is provided, including without limitation, any uptime warranty. 
        The Parties make no representations that the use of the data will not infringe any patent or proprietary rights of third parties.`
    },
    {
        heading: 'License',
        descriptions: 'All CCF 3D reference objects are released under <a href="" target="_blank">Attribution 4.0 International (CC BY 4.0)</a>.'
    },
    {
        heading: 'Citation',
        descriptions: 'If you use the data files v1.0 release, please cite this effort as follows:'
    },
    {
        heading: 'Acknowledgements',
        descriptions: 'This code and data was compiled by the HuBMAP MC-IU team in close collaboration with the MC-NYGC team. This research has been funded in part by the NIH Director under award OT2OD026671 and 1OT2OD026673.'
    },
    {
        heading: 'References',
        descriptions: `<a href="https://cns.iu.edu/current_team/bio/katy_borner.html" target="_blank">Börner, Katy</a>, Sarah A Teichmann, <a href="https://cns.iu.edu/current_team/bio/ellen-quardokus.html" target="_blank">Ellen M Quardokus</a>, et al. 2021. "<a href="https://cns.iu.edu/docs/publications/2021-Borner-ASCT+B_of_the_HRA.pdf" target="_blank">
        Anatomical structures, cell types and biomarkers of the Human Reference Atlas"</a>. Nature Cell Biology 23: 1117-1128. doi: 10.1038/s41556-021-00788-6.
        <br><br>
        Hao, Yuhan, Stephanie Hao, Erica Andersen-Nissen, et al. 2021. “<a href="https://doi.org/10.1016/j.cell.2021.04.048" target="_blank">Integrated Analysis of Multimodal Single-Cell Data</a>.” Cell 184 (13): 3573-3587.e29.`
    }
]

export const comparisonAsctbVsAzimuth: PageDataItems[] = [
    {
        heading: 'Comparison of CxG in ASCT+B vs. Azimuth',
        descriptions: `Aligning (or cross-walking) the CxG matrices in ASCT+B tables to relevant organ-specific CxG matrices in Azimuth is non-trivial. 
        The ASCT+B tables capture expert identified cell types that are critically important for the function of an organ plus biomarkers commonly used to characterize these cell types with a focus on entities available in major ontologies (Uberon/FMA and Cell Ontology respectively). 
        Azimuth covers experimentally derived data at rather different levels of resolution; it provides Cell Ontology IDs in a separate file here <b>need link here</b> and uses labels for genes that match the labels in HGNC. 
        Note that not all Azimuth cell types have CL IDs; in these cases, matching is done based on cell type names.
        <br><br>
        An automatically generated, up-to-date comparison with the most recent release of the ASCT+B tables is available as an XLS file <a href="https://hubmapconsortium.github.io/asctb-azimuth-data-comparison/Azimuth_vs_ASCTB.summaries.xlsx" download>here</a> and shown in <b>Table 2</b>. 
        The XLS file also contains separate sheets with lists of cell types and biomarkers that are not (yet) covered in the ASCT+B tables so table authors can be alerted and encouraged to add these to the ASCT+B tables--increasing matching scores in future releases. 
        Details on how the comparison is calculated are on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>.`
    }
]