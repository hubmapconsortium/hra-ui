import { SopLinks } from 'src/app/components/sop-links/sop-links';
import { HeaderData } from 'src/app/components/table/header';
import { TableData } from 'src/app/components/table/table';
import { PageDataItems } from '../../components/page-data/page-data';
import { PageHeaderItems } from '../../components/page-header/page-header-items';

export const headerCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/hra_milletome.png',
        title: 'Human Reference Atlas Millitome',
        subtitle: 'A unique 3D printed tool and standard operating procedure for the uniform sectioning of organs'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `A millitome is a device designed to hold a freshly procured organ and facilitate cutting it into many small tissue blocks for usage in single cell analysis. A millitome has discrete equally placed cutting grooves in both the x and y directions to guide a carbon steel cutting knife to produce standard size slices or cubes of tissue material. Millitomes are used to create uniformly sized tissue blocks that match the shape and size of organs from the CCF 3D Reference Object Library.
        <br>
        <br>
        This page allows you to download complete millitome sets for 3D-printing.
        <br>
        <br>
        Specific download packages are accessed by selecting the organ (i.e. VH_F_Kidney_L = female kidney, left). Each organ folder contains three compressed download packages, distinguished by block size (i.e. VH_F_Kidney_L_20 = female kidney, left, 20mm block size).
        <br>
        <br>
        Each package contains three 3D-printable .STL files, one each for “small”, “medium” and “large” organ sizes to cover a wide range of variations (i.e. VH_F_Kidney_L_20_Medium = female kidney, left, 20mm block size, medium size). Also included in each package is a .CSV file to record data about the sample blocks taken from the organ.
        <br>
        <br>`
    }
]

export const sopLinksData: SopLinks[] = [
    {
      urls: 'SOP: Millitome SOP 1',
      href: 'www.google.com',
  
    },
    {
      urls: 'SOP: Millitome SOP 2',
      href: 'www.google.com'
    }
  ]


export const standardOperatingProcedure: PageDataItems[] = [
    {
        heading: `Standard Operating Procedure (SOP)`,
        descriptions:`<ul><li><a href="#">SOP: Millitome SOP 1</a></li><li><a href="#">SOP: Millitome SOP 2</a></li></ul>`
    }
]

export const headerInfo: HeaderData[] = [
    {
      columnDef: 'organ',
      header: 'Organ',
      cell: (element: TableData) => `<a class="cell-link" href="${element['url'] || 'TODO:Please add a url column to this .csv!'}">${element['organ']}</a>`,
    },
    {
      columnDef: 'sex',
      header: 'Sex',
      cell: (element: TableData) => `${element['sex']}`
    },
    {
      columnDef: 'left/right',
      header: 'Left/Right',
      cell: (element: TableData) => `${element['left/right']}`
    }
  ];

export const tableName: PageDataItems[] = [
    {
        heading: `Millitome Catalog`,
        descriptions: ``
    }
]

export const displayedColumnsData = headerInfo.map(h => h.columnDef);