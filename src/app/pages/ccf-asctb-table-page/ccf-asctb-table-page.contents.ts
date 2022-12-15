import { HeaderData } from '../../components/table/header';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { TableData } from '../../components/table/table';
import { SopLinks } from '../../components/sop-links/sop-links';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
  {
    image: 'assets/images/asctb_table.svg',
    title: 'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables',
    subtitle: 'Data tables containing hierarchical anatomical structures, cell types and biomarkers from the Cell Ontology'
  }
]

export const overviewData: PageDataItems[] = [
  {
    heading: 'Overview',
    descriptions: 'Anatomical Structures, Cell Types, plus Biomarkers (ASCT+B) tables aim to capture the nested part_of structure of anatomical human body parts, the typology of cells, and biomarkers used to identify cell types (e.g., gene, protein, lipid or metabolic markers). The tables are authored and reviewed by an international team of anatomists, pathologists, physicians, and other experts.'
  }
]
export const existingTablesData: PageDataItems[] = [
  {
    heading: 'Existing Tables',
    descriptions: 'The below table lists for each organ the number of anatomical structures (#AS), the number of cell types (#CT), the number of biomarkers (#B), the number of part_of relationships between AS, the number of located_in links between CT and AS, and the number of CT and B, i.e., which B characterize a CT.'
  }
]

export const versionData: ChooseVersion[] = [
  { release: '4th HRA Release (v1.3), December 2022', file: 'release4.csv', version: '4'},
  { release: '3rd HRA Release (v1.2), June 2022', file: 'release3.csv', version: '3'},
  { release: '2nd HRA Release (v1.1), December 2021', file: 'release2.csv', version: '2' },
  { release: '1st HRA Release (v1.0), March 2021', file: 'release1.csv', version: '1' }

]

export const exploreTablesData: PageDataItems[] = [
  {
    heading: 'Explore Tables Visually',
    descriptions: 'The <a href="https://hubmapconsortium.github.io/ccf-asct-reporter/" target="_blank">CCF ASCT+B Reporter</a> makes it possible to explore tables visually—per organ or across all organs in support of table authoring and review. It combines two different types of Angular visualizations: A partonomy tree of anatomical structures and bimodal networks that link anatomical structures to cell types and cell types to biomarkers.'
  },
  {
    heading: 'Tables Under Development',
    descriptions: `The initial release of ASCT+B table (v1.0) included 11 organs. In the 2nd release, 14 additional tables were published bringing the total to 25. In the 3rd release, several tables were updated and placenta was added resulting in 26 tables.
    If you are interested in contributing to this effort, please complete this <a href="https://iu.co1.qualtrics.com/jfe/form/SV_bpaBhIr8XfdiNRH" target="_blank">online form</a> to receive relevant information and meeting invites. For questions, email infoccf@indiana.edu.`
  },
  {
    heading: 'Acknowledgments',
    descriptions: 'The very first ASCT+B table was published for the kidney by the Kidney Precision Medicine Project (KPMP) in "<a href="https://biorxiv.org/cgi/content/short/828665v1" target="_blank">A Multimodal and Integrated Approach to Interrogate Human Kidney Biopsies with Rigor and Reproducibility: The Kidney Precision Medicine Project</a>". Katy Börner (HuBMAP, KPMP), Peter Hunter (SPARC), and James Gee (BICCN) organized a CCF session at the 2020 Joint NIH-HCA Meeting that brought together experts from multiple consortia to develop ASCT+B tables in an effort to create a Human Reference Atlas. Mark Musen, Chris Mungall, and David Osumi-Sutherland provided expert guidance on linking ASCT+B tables to existing ontologies.'
  }
]

export const sopLinksData: SopLinks[] = [
  {
    urls: 'SOP: Authoring ASCT+B Tables',
    href: 'https://doi.org/10.5281/zenodo.5944386',

  },
  {
    urls: 'SOP: ASCT+B Table Communications',
    href: 'https://doi.org/10.5281/zenodo.5639623'
  }
]

export const headerInfo: HeaderData[] = [
  {
    columnDef: 'Organ',
    header: 'Organ',
    cell: (element: TableData) => `<a class="cell-link" href="${element['url'] || 'TODO:Please add a url column to this .csv!'}">${element['Organ']}</a>`,
    isTotalRequired: true
  },
  {
    columnDef: 'AS',
    header: '#AS',
    cell: (element: TableData) => `${element['AS']}`
  },
  {
    columnDef: 'CT',
    header: '#CT',
    cell: (element: TableData) => `${element['CT']}`
  },
  {
    columnDef: 'B_Total',
    header: '#B Total',
    cell: (element: TableData) => `${element['B_Total']}`
  },
  {
    columnDef: 'BG',
    header: '#BG',
    cell: (element: TableData) => `${element['BG']}`
  },
  {
    columnDef: 'BP',
    header: '#BP',
    cell: (element: TableData) => `${element['BP']}`
  },
  {
    columnDef: 'BM',
    header: '#BM',
    cell: (element: TableData) => `${element['BM']}`
  },
  {
    columnDef: 'BF',
    header: '#BF',
    cell: (element: TableData) => `${element['BF']}`
  },
  {
    columnDef: 'BL',
    header: '#BL',
    cell: (element: TableData) => `${element['BL']}`
  },
  {
    columnDef: 'ASWithNoLink',
    header: '#AS With NoLink',
    cell: (element: TableData) => `${element['ASWithNoLink']}`
  },
  {
    columnDef: 'CTWithNoLink',
    header: '#CT With NoLink',
    cell: (element: TableData) => `${element['CTWithNoLink']}`
  },
  {
    columnDef: 'BWithNoLink',
    header: '#B With NoLink',
    cell: (element: TableData) => `${element['BWithNoLink']}`
  },
  {
    columnDef: 'ASWithNoCT',
    header: '#AS With NoCT',
    cell: (element: TableData) => `${element['ASWithNoCT']}`
  },
  {
    columnDef: 'CTWithNoB',
    header: '#CT With NoB',
    cell: (element: TableData) => `${element['CTWithNoB']}`
  },
  {
    columnDef: 'AS_AS',
    header: '#AS-AS',
    cell: (element: TableData) => `${element['AS_AS']}`
  },
  {
    columnDef: 'AS_CT',
    header: '#AS-CT',
    cell: (element: TableData) => `${element['AS_CT']}`
  },
  {
    columnDef: 'CT_BM',
    header: '#CT-BM',
    cell: (element: TableData) => `${element['CT_BM']}`,
  }
];

export const displayedColumnsData = headerInfo.map(h => h.columnDef);

