import { PageDataItems } from 'src/app/components/page-data/page-data';
import { PageHeaderItems } from 'src/app/components/page-header/page-header-items';
import { ExtraHeader, HeaderData } from 'src/app/components/table/header';
import { TableData } from 'src/app/components/table/table';

export const azimuthHeader: PageHeaderItems[] = [
  {
    image: 'assets/images/asctb_azimuth.svg',
    title: 'ASCT+B Cell Types Data from Azimuth Reference Data with Summaries',
    subtitle:
      'Crosswalks from Azimuth cell annotation tool to ASCT+B tables will cell population data',
  },
];

export const overviewAzimuthData: PageDataItems[] = [
  {
    heading: 'Overview',
    descriptions: `<a href="https://hubmapconsortium.github.io/ccf/pages/ccf-anatomical-structures.html" target="_blank">ASCT+B tables</a> represent cell by gene (CxG) relationships that are also captured in the organ-specific HuBMAP <a href="https://azimuth.hubmapconsortium.org/" target="_blank">Azimuth references</a>.
        This site provides cell type typology data from Azimuth that can be visualized in the <a href="https://hubmapconsortium.github.io/ccf-asct-reporter/" target="_blank">ASCT+B Reporter</a>.
        <br><br>
        We also provide easy access to results for comparing CxG in ASCT+B vs. CxG in Azimuth. In Jan 2022, Azimuth supports single-cell RNA-seq data exclusively. As more experimental data becomes available and additional types of data are supported (e.g., proteins, lipids, metabolites), data differences will decrease.
        `,
  },
  {
    heading: 'Azimuth Cell Type Typologies and Counts',
    descriptions: `In Jan 2022, eight molecular reference maps for human are available via Azimuth. For each we provide the cell type typology as a file that can be visualized in the ASCT+B Reporter together with a table that lists the annotation level and the number of cell types
        for each unique cell in the organ-specific Azimuth reference, see Table 1.
        `,
  },
];

export const TermsOfUseData: PageDataItems[] = [
  {
    heading: 'Azimuth CT Counts',
    descriptions: `Data from <a href="https://github.com/satijalab/azimuth_website" target="_blank">https://github.com/satijalab/azimuth_website</a> has been parsed to derive cell type counts:
        <br><br> Code is available on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>`,
  },
  {
    heading: 'Code on Github',
    descriptions:
      'All code is freely available on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>.',
  },
  {
    heading: 'Terms of Use',
    descriptions: `HuBMAP data are supplied with no warranties, expressed or implied, including without limitation, any warranty of merchantability or fitness for a particular purpose or non-infringement.
        No warranty with respect to the HuBMAP infrastructure is provided, including without limitation, any uptime warranty.
        The Parties make no representations that the use of the data will not infringe any patent or proprietary rights of third parties.`,
  },
  {
    heading: 'Acknowledgments',
    descriptions:
      'This code and data was compiled by the HuBMAP MC-IU team in close collaboration with the MC-NYGC team.',
  },
  {
    heading: 'References',
    descriptions: `Börner, Katy, Sarah A Teichmann, Ellen M Quardokus, et al. 2021. "<a href="https://cns.iu.edu/docs/publications/2021-Borner-ASCT+B_of_the_HRA.pdf" target="_blank">Anatomical structures, cell types and biomarkers of the Human Reference Atlas"</a>. Nature Cell Biology 23: 1117-1128. doi: 10.1038/s41556-021-00788-6.
        <br><br>
        Hao Y, Hao S, Andersen-Nissen E, Mauck WM 3rd, Zheng S, Butler A, Lee MJ, Wilk AJ, Darby C, Zager M, Hoffman P, Stoeckius M, Papalexi E, Mimitou EP, Jain J, Srivastava A, Stuart T, Fleming LM, Yeung B, Rogers AJ, McElrath JM, Blish CA, Gottardo R, Smibert P, Satija R. 2021.
        "<a href="https://doi.org/10.1016/j.cell.2021.04.048" target="_blank">Integrated Analysis of multimodal single-cell data</a>." Cell. 184 (13):3573-3587.e29. doi: 10.1016/j.cell.2021.04.048`,
  },
];

export const comparisonAsctbVsAzimuth: PageDataItems[] = [
  {
    heading: 'Comparison of CxG in ASCT+B vs. Azimuth',
    descriptions: `Table 3 shows the comparison of the CxG matrix in ASCT+B tables vs. CxG matrix in Azimuth for each organ in Jan 2022. An automatically generated, up-to-date comparison is available
        <a href="https://hubmapconsortium.github.io/asctb-azimuth-data-comparison/Azimuth_vs_ASCTB.summaries.xlsx" target="_blank">here</a>; this xls also contains separate sheets with cell
        types that are not (yet) covered in the ASCT+B tables. Details on how the comparison is calculated are on <a href="https://github.com/hubmapconsortium/asctb-azimuth-data-comparison" target="_blank">GitHub</a>. Note that not all Azimuth cell types have CL IDs;
        in these cases, matching is done based on cell type names.
        <br><br>
        Data from <a href="https://github.com/satijalab/azimuth_website" target="_blank">https://github.com/satijalab/azimuth_website</a> has been parsed to derive cell type typologies:`,
  },
];

export const headerInfo: HeaderData[] = [
  {
    columnDef: 'organ',
    header: 'Organ',
    cell: (element: TableData) =>
      `<a class="cell-link" href="${
        element['url'] || 'TODO:Please add a url column to this .csv!'
      }">${element['organ']}</a>`,
    isTotalRequired: true,
  },
  {
    columnDef: 'uniqueName',
    header: 'Unique Names',
    cell: (element: TableData) => `${element['uniqueName']}`,
    sorting: false
  },
  {
    columnDef: 'uniqueId',
    header: 'Unique IDs',
    cell: (element: TableData) => `${element['uniqueId']}`,
    sorting: false
  },
  {
    columnDef: 'uName',
    header: 'Unique Names',
    cell: (element: TableData) => `${element['uName']}`,
    sorting: false
  },
  {
    columnDef: 'uId',
    header: 'Unique \nIDs',
    cell: (element: TableData) => `${element['uId']}`,
    sorting: false
  },
  {
    columnDef: 'usingId',
    header: 'Using IDs',
    cell: (element: TableData) => `${element['usingId']}`,
    sorting: false
  },
  {
    columnDef: 'usingLabels',
    header: 'Using Labels',
    cell: (element: TableData) => `${element['usingLabels']}`,
    sorting: false
  },
  {
    columnDef: 'dummyAnnotationLevels',
    header: '',
    cell: (element: TableData) => `${element['a']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyTotalCellCount',
    header: '',
    cell: (element: TableData) => `${element['b']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyAzimuthB',
    header: '',
    cell: (element: TableData) => `${element['c']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyAsctbB',
    header: '',
    cell: (element: TableData) => `${element['d']}`,
    sorting: false,
  },
  {
    columnDef: 'dummyMatchesB',
    header: '',
    cell: (element: TableData) => `${element['e']}`,
    sorting: false
  },
];

export const displayedColumnsData = headerInfo.map((h) => h.columnDef);

export const additionalHeaders: ExtraHeader[] = [
  {
    header: 'Azimuth',
    columnDef: 'azimuthCT',
    colspan: 3,
  },
  {
    header: 'ASCT+B v1.0',
    columnDef: 'asctbVersionCT',
    colspan: 1,
  },
  {
    header: 'Matches',
    columnDef: 'matchesCT',
    colspan: 3,
  },
  {
    header: 'Azimuth',
    columnDef: 'azimuthB',
  },
  {
    header: 'ASCT+B',
    columnDef: 'asctbVersionB',
  },
  {
    header: 'Matches',
    columnDef: 'matchesB',
  },
];

export const additionalColumnsData = additionalHeaders.map((h) => h.columnDef);

export const cellData: ExtraHeader[] = [
  {
    columnDef: 'cellTypes',
    header: 'Cell Types',
    colspan: 7,
  },
  {
    columnDef: 'annotationLevels',
    header: 'Annotation Levels in Azimuth Reference',
    rowspan: 3,
  },
  {
    columnDef: 'totalCellCount',
    header: 'Total Cell Count in Aziumuth Reference',
    rowspan: 3,
  },
  {
    columnDef: 'biomarkers',
    header: 'Biomarkers',
    colspan: 3,
  },
];

export const cellHeaders = cellData.map((h) => h.columnDef);
