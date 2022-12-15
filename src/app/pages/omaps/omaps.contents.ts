import { PageDataItems } from '../../components/page-data/page-data';
import { HeaderData } from '../../components/table/header';
import { TableData } from '../../components/table/table';


export const goalsForOmaps: PageDataItems[] = [
    {
        heading: 'Goals for OMAPs',
        descriptions: `<ul>
        <li>Offset the considerable time (6-8 months) and cost (~$30-60,000 in 2022 USD) associated with creating such resources de novo</li>
        <li>Standardize data acquisition for multiplexed tissue imaging studies</li>
        <li>Empower construction of atlases from healthy and diseased human tissues</li>
        <li>Support the spatial biology community by aggregating highly cited antibody clones</li>
        <li>Identify essential markers for anatomical structures and cell types in diverse human organs</li>
        </ul>`
    }
]

export const columnHeaders: HeaderData[] = [
    {
        columnDef: 'omapId',
        header: 'OMAP ID',
        cell: (element: TableData) => `${element['omapId']}`,
        alignment: "left"
    },
    {
        columnDef: 'organ',
        header: 'Organ',
        cell: (element: TableData) => `<a class="cell-link" href="${element['url'] || 'TODO:Please add a url column to this .csv!'}">${element['organ']}</a>`,
        alignment: "start"
    },
    {
        columnDef: 'tissuePreservationMethod',
        header: 'Tissue Preservation Method',
        cell: (element: TableData) => `${element['tissuePreservationMethod']}`,
        alignment: "start"
    },
    {
        columnDef: 'imagingMethod',
        header: 'Multiplexed antibody-based imaging method',
        cell: (element: TableData) => `${element['imagingMethod']}`,
        alignment: "start"
    },
    {
        columnDef: 'csv',
        header: `Download`,
        cell: (element: TableData) => `<a class="cell-link" href="${element['csv'] || 'TODO:Please add a url column to this .csv!'}">CSV</a> | <a class="cell-link" href="${element['xlsx'] || 'TODO:Please add a url column to this .csv!'}">XLSX</a>`,
        sorting: false,
        isTotalRequired: true
    },
    {
        columnDef: 'as',
        header: '#AS',
        cell: (element: TableData) => `${element['as']}`,
        alignment: "end"
    },
    {
        columnDef: 'ct',
        header: '#CT',
        cell: (element: TableData) => `${element['ct']}`,
        alignment: "end"
    },
    {
        columnDef: 'bp',
        header: '#BP',
        cell: (element: TableData) => `${element['bp']}`,
        alignment: "end"
    },
];

export const displayedColumnsData = columnHeaders.map(h => h.columnDef);
