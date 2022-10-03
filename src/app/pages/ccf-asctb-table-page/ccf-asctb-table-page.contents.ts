import { HeaderData } from '../../components/table/header';
import { ChooseVersion } from '../../components/choose-version/choose-version';
import { TableData } from '../../components/table/table';
import { SopLinks } from '../../components/sop-links/sop-links';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';
import { CellPopulationGraphsComponent } from '../cell-population-graphs/cell-population-graphs.component';

export const headerCardDetails: PageHeaderItems[] = [
  {
    image: 'assets/images/asctb_table.png',
    title: 'CCF Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables',
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
  { release: '1st Release, March 2021', file: 'release1.csv', version: '1' },
  { release: '2nd Release, December 2021', file: 'release2.csv', version: '2' },
]

export const exploreTablesData: PageDataItems[] = [
  {
    heading: 'Explore Tables Visually',
    descriptions: 'The CCF ASCT+B Reporter makes it possible to explore tables visually—per organ or across all organs in support of table authoring and review. It combines two different types of Angular visualizations: A partonomy tree of anatomical structures and bimodal networks that link anatomical structures to cell types and cell types to biomarkers.'
  },
  {
    heading: 'Tables Under Development',
    descriptions: `The initial release of ASCT+B table (v1.0) included 11 organs. As part of the next phase, we plan to publish another 14 tables by the end of 2021 bringing the total to 25. 
    If you are interested in contributing to this effort, please complete this online form to receive relevant information and meeting invites. For questions, email infoccf@indiana.edu.`
  },
  {
    heading: 'Acknowledgments',
    descriptions: 'The very first ASCT+B table was published for the kidney by the Kidney Precision Medicine Project (KPMP) in "A Multimodal and Integrated Approach to Interrogate Human Kidney Biopsies with Rigor and Reproducibility: The Kidney Precision Medicine Project".Katy Börner (HuBMAP, KPMP), Peter Hunter (SPARC), and James Gee (BICCN) organized a CCF session at the 2020 Joint NIH-HCA Meeting that brought together experts from multiple consortia to develop ASCT+B tables in an effort to create a Human Reference Atlas. Mark Musen, Chris Mungall, and David Osumi-Sutherland provided expert guidance on linking ASCT+B tables to existing ontologies.'
  }
]

export const sopLinksData: SopLinks[] = [
  {
    urls: 'SOP: Authoring ASCT+B Tables',
    href: 'www.google.com',

  },
  {
    urls: 'SOP: ASCT+B Table Communications',
    href: 'www.google.com'
  }
]

export const headerInfo: HeaderData[] = [
  {
    columnDef: 'organ',
    header: 'Organ',
    cell: (element: TableData) => `<a href="${element['url'] || 'TODO:Please add a url column to this .csv!'}">${element['organ']}</a>`
  },
  {
    columnDef: 'as',
    header: '#AS',
    cell: (element: TableData) => `${element['as']}`
  },
  {
    columnDef: 'ct',
    header: '#CT',
    cell: (element: TableData) => `${element['ct']}`
  },
  {
    columnDef: 'bTotal',
    header: '#B Total',
    cell: (element: TableData) => `${element['bTotal']}`
  },
  {
    columnDef: 'bg',
    header: '#BG',
    cell: (element: TableData) => `${element['bg']}`
  },
  {
    columnDef: 'bp',
    header: '#BP',
    cell: (element: TableData) => `${element['bp']}`
  },
  {
    columnDef: 'asas',
    header: '#AS-AS',
    cell: (element: TableData) => `${element['asas']}`
  },
  {
    columnDef: 'asct',
    header: 'AS-CT',
    cell: (element: TableData) => `${element['asct']}`
  },
  {
    columnDef: 'ctb',
    header: '#CT-B',
    cell: (element: TableData) => `${element['ctb']}`,
  }
];

export const displayedColumnsData = headerInfo.map(h => h.columnDef);

