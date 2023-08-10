import { z } from 'zod';

// ---------------------------
// Common types
// ---------------------------

const ColumnName = z.string({ description: 'Column name' });
const Styles = z.record(z.union([z.string(), z.number()]))
const VersionEntry = z.object({
    release: z.string(),
    version: z.string()
});
const defaultDatasetsStyles = {
    "display": "flex",
    "flex-flow": "row wrap",
    "justify-content": "space-between",
    "padding-bottom": "2.5rem",
}

export const AnnouncementCard = z.object({
    type: z.literal('announcement'),
    announcementCard: z.object({
        message: z.string({ description: 'The message to be displayed on the card' }),
        route: z.string({ description: 'Route for another release notes page' }),
        routeText: z.string({ description: 'Text to be clicked to redirect to different route' }),
        emoji: z.string({ description: 'To add emoji if required' })
    })
        .describe(`The announcementCard field has three optional fields:
            - route: Route of the page where user will be redirected to when clicked on it.
            - routeText: Label for the route where we want the user to click.
            - emoji: Paste any emoji in this field if required.`)
        .partial({
            route: true,
            routeText: true,
            emoji: true,
        }).array(),
    styles: Styles.optional()
})

export const BoardMembers = z.object({
    type: z.literal('board-members'),
    boardMembersData: z.object({
        image: z.string({ description: 'URL for the image of the board member' }),
        description: z.string({ description: 'Introduction of the board member' })
    }).array(),
    styles: Styles.optional()
})

const buttonDescription = `This object has the following properties as optional.
- url: External link to redirect the page to when button is pressed.
- route: Route Name of the page to redirect to when the button is pressed.
- icon: icon name for the icon to be displayed on the button.
- styles: Additional styling for the button.`

export const Button = z.object({
    type: z.literal('button', { description: buttonDescription }),
    text: z.string({ description: 'Text on the button' }),
    url: z.string({ description: 'External URL for the button' }),
    route: z.string({ description: 'Route for the another page in current project' }),
    icon: z.string({ description: 'Icon on the button' }),
    styles: Styles.optional()
}).partial({
    url: true,
    route: true,
    icon: true,
    styles: true
}).describe(buttonDescription)

export const CarouselSlides = z.object({
    type: z.literal('carousel'),
    carouselContainerStyles: z.object({
        width: z.string().describe('Width of the container for carousel')
    }),
    carouselInfo: z.object({
        title: z.string({ description: 'Title of the slide' }),
        body: z.string({ description: 'Subtitle of the slide' }),
        image: z.string({ description: 'Image of the slide' }),
        url: z.string({ description: 'External URL for the button' }).optional(),
        route: z.string({ description: 'Route of the page for the button' }).optional(),
        buttonText: z.string({ description: 'Text for the button' }),
        alt: z.string({ description: 'Alternative text for the carousel image.' })
    }).describe(`This object has the following optional fields.
    - url: External Link to redirect to when the button is pressed.
    - route: Name of the route of the page to be loaded when button is pressed.
    
    Enter either url or route.`).array(),
    styles: Styles.optional()
})

export const ContactCard = z.object({
    type: z.literal('contact-card'),
    contactData: z.object({
        field: z.string({ description: 'Field of work of the contact' }),
        name: z.string({ description: 'Name of the contact' }),
        role: z.string({ description: 'Role/ Position of the contact' }),
        email: z.string({ description: 'Email ID of the contact' }),
        image: z.string({ description: 'Image of the contact' }),
    }).array(),
    styles: Styles.optional()
})

export const CountCard = z.object({
    type: z.literal('count-card'),
    countCardInfo: z.object({
        image: z.string({ description: 'Icon for the card' }),
        count: z.number({ description: 'Count of the card' }).or(z.string()),
        text: z.string({ description: 'Title of the card' }),
        alt: z.string({ description: 'Alternative text for the image' })
    }).array(),
    styles: Styles.optional()
})

export const Datasets = z.object({
    type: z.literal('datasets'),
    links: z.object({
        class: z.string({ description: 'Class name defined in the css file' }).default('datasets'),
        href: z.string({ description: 'URL of the items' }),
        title: z.string({ description: 'Tooltip title for the item' }),
        data: z.string({ description: 'Label for the item' })
    }).array(),
    styles: Styles.default(defaultDatasetsStyles)
}).required("styles")

export const Divider = z.object({
    type: z.literal('divider'),
    styles: Styles.optional()
})

const downloadFtuDescription = `This object has the following fields as optional.
- displayMetaData: True if you want to display Release Version and Digital Object type. If you set this to true, make sure to add releaseVersion and dot properties in rows object.
- downloadIcon: name of the icon you want to display in download column header
- columnLabels: Object of column definition and column headers for the table
`
export const DownloadFtu = z.object({
    type: z.literal('download-ftu', { description: downloadFtuDescription }),
    versions: VersionEntry.array().describe('Release name and version number.'),
    displayMetadata: z.boolean({ description: 'Flag to display the Release Version and Digital Object type' }).optional(),
    downloadIcon: z.string({ description: 'Icon name to display the icon' }).optional(),
    columnLabels: z.record(z.string(), z.string(), { description: 'Object of column definition and column header label' }).optional().default({
        type: 'Type',
        download: 'Download',
        releaseVersion: 'Release Version',
        digitalObjectType: 'Digital Object Type'
    }),
    versionedData: z.object({
        version: z.string({ description: 'Version Number of the data' }),
        rows: z.object({
            label: z.string({ description: 'Label for the Organ/Type column' }),
            links: z.object({
                label: z.string({ description: 'Label for the link in the download column' }),
                link: z.string({ description: 'URL for the label in the download column' })
            }).array(),
            releaseVersion: z.string({ description: 'Table Data for release version column.' }).optional(),
            dot: z.string().optional().describe("Table data for Digital Object Type column."),
            url: z.string({ description: 'URL for Organ or its type' }).optional()
        }).describe(`Following properties in this object are optional:
        - releaseVersion: Release version of the organ.
        - dot: Digital object type of the organ.
        - url: External link to be embedded in the organ.`).array()
    }).describe(`Add version and rows data for the table`).array()
}).describe(downloadFtuDescription)

export const Drawer = z.object({
    type: z.literal('drawer'),
    navigationItems: z.object({
        menuName: z.string({ description: 'Label of the menu item' }),
        id: z.string({ description: 'ID of the menu item' })
    }).array(),
    drawerStyles: Styles,
    components: z.lazy(() => PageSpec).describe('To add components recursively')
})

const ExtraHeader = z.object({
    columnDef: z.string({ description: 'Definition of the column' }),
    header: ColumnName,
    colspan: z.number().optional().describe('Number of columns to span'),
    rowspan: z.number().optional().describe('Number of rows to span'),
}).describe(`colspan and rowspan are optional fields. Add appropriate number to span the cells accordingly.`)

const HeaderData = z.object({
    header: ColumnName,
    columnDef: z.string({ description: 'Definition of the column' }),
    cell: z.unknown().describe('Code to display the cell data'),
    isTotalRequired: z.boolean({ description: 'True of want the total to be displayed' }),
    sorting: z.boolean({ description: 'True if sorting is required' }),
    alignment: z.string({ description: 'Alignment of the data (start or end)' })
}).partial({
    isTotalRequired: true,
    sorting: true,
    alignment: true
}).array().describe(`The following fields are optional in this object.
- isTotalRequired: True if want to display the sum of column numbers below the table.
- sorting: True if sorting required on the column.
- alignment: Alignment of the data (start or end)`)

export const Image = z.object({
    type: z.literal('image'),
    class: z.string({ description: 'Class name of the class defined in the CSS file' }).optional(),
    imageSource: z.string({ description: 'URL for the image' }),
    alt: z.string({ description: 'Alternative text for the image' }),
    styles: Styles.optional(),
}).describe(`Property 'class' is optional. It is the class name for the image. Define this class in page-element.component.scss`)

export const ImageInCard = z.object({
    type: z.literal('simple-image'),
    imageData: z.object({
        title: z.string({ description: 'Title of the image on the card' }),
        description: z.string({ description: 'Description of the image' }),
        image: z.string({ description: 'URL of the image' }),
        imageDialog: z.string({ description: 'URL of the image to be displayed on the dialog' })
    }).array(),
    styles: Styles.optional()
})

const LongCardItems = z.object({
    icon: z.string({ description: 'Icon of the card' }),
    title: z.string({ description: 'Title of the card' }),
    body: z.string({ description: 'Subtitle of the card' }),
    route: z.string({ description: 'Route for the card to be redirected' }),
    color: z.string({ description: 'Background color for the icon if necessary' }),
    externalLink: z.string({ description: 'External URL to be redirected' })
}).partial({
    route: true,
    externalLink: true,
    color: true,
    body: true
}).describe(`Properties mentioned here are optional. Either use route or externalLink
- route: route for the page to be redirected
- externalLink: URL of the page to be opened when the card is clicked
- color: background color of the image
- body: Subtitle for the card`).array()

export const LongCard = z.object({
    type: z.literal('long-card'),
    longCardItems: LongCardItems,
    styles: Styles.optional()
})

export const LongCardWithTitle = z.object({
    type: z.literal('long-card-with-title'),
    longCardWithTitleData: z.object({
        heading: z.string({ description: 'Title of the Card' }),
        headerSize: Styles.describe('Inline styles for the title of the card'),
        id: z.string({ description: 'Unique ID for the title of the card' }),
        cardData: LongCardItems,
    }).partial({
        headerSize: true,
        id: true
    }).describe(`Properties mentioned here are optional
    - headerSize: Pass inline styles for the header of the card
    - id: Pass id as an attribute to the title of the card`).array()
})

export const Margin = z.object({
    type: z.literal('margin'),
    top: z.string(),
    bottom: z.string(),
    left: z.string(),
    right: z.string()
}, { description: 'To add margin around any component. Add top/ bottom/ left/ right and margin value' }).partial({
    top: true,
    bottom: true,
    left: true,
    right: true,
})

export const MatCard = z.object({
    type: z.literal('mat-card'),
    components: z.lazy(() => PageSpec).describe('To add components recursively'),
    styles: Styles.optional()
})

export const MenuTree = z.object({
    type: z.literal('menu-tree'),
    overlayClass: z.string(),
    positions: z.object({
        originX: z.string(),
        originY: z.string(),
        overlayX: z.string(),
        overlayY: z.string(),
        offsetX: z.number(),
        offsetY: z.number()
    }).array(),
    mobileNavigationItems: z.object({
        menuName: z.string(),
        id: z.string()
    }).array(),
    styles: Styles.optional()
})

const OrganData = z.object({
    name: z.string({ description: 'Name of the organ' }),
    image: z.string({ description: 'Path to the Icon/Image of the organ' }),
    tissueData: z.lazy(() => TissueData.array()).optional()
        .describe(`Tissue data for the above organ.
    Following properties are optional in this object.
    - image: URL of the image of the tissue.
    - expandedImage: URL of the image to be shown in the modal, when it is clicked.
    - threeDimImage: URL of the 3D object (.glb) file.
    - alt: Alternate text for the image.
    - url: URL for the metadata button.
    - svg: URL to download the SVG file of the tissue.
    - ai: URL to download the AI file of the tissue.
    - png: URL to download the PNG file of the tissue.`)
});

const organVersionDescription = `This object has the following fields as optional
- headerInfo: this is the data about column headers and their definition. Add this data if you want to display data table`

export const OrganVersion = z.object({
    type: z.literal('organ-version', { description: organVersionDescription }),
    isMultiRow: z.boolean({ description: 'True if want to display organs one below other. False if want to display organs beside one another' }),
    tableRequired: z.boolean({ description: 'True of want to display data table' }),
    versionData: z.lazy(() => VersionSelector.array()).describe(`Release name, source csv file and version number
    Property 'file' is optional. If required, add property 'file' ans pass the path to the CSV file. It is only required if tableRequired is True.`),
    headerInfo: HeaderData.optional()
        .describe(`Names of columns and their definitions
        There are three optional values in this object:
        - isTotalRequired: To display total at the end of the table
        - sorting: To enable sorting in the table
        - alignment: start or end to align data left or right`),
    organInfo: z.lazy(() => VersionOrgans.array()).describe(organVersionDescription)
})

export const PageData = z.object({
    type: z.literal('page-data'),
    pageData: z.object({
        heading: z.string({ description: 'Title of the data' }),
        descriptions: z.string({ description: 'Description of the data' }),
    }).array(),
    styles: Styles.optional()
});

export const PageHeaderCard = z.object({
    type: z.literal('header'),
    headerCard: z.object({
        title: z.string({ description: 'Title of the card' }),
        subtitle: z.string({ description: 'Subtitle of the card' }),
        image: z.string({ description: 'Icon of the card' }),
    }).array(),
    styles: Styles.optional()
})

const PrizeButton = z.object({
    label: z.string({ description: 'Text on the button' }),
    link: z.string({ description: 'URL for the button' })
})

const PrizeWinner = z.object({
    winner: z.string({ description: 'Name of the winner' }),
    kaggleId: z.string({ description: 'Kaggle ID of the winner' }),
    button: PrizeButton.array()
}).partial({
    button: true,
    kaggleId: true
})

export const PrizeCard = z.object({
    type: z.literal('prize-card'),
    prizeCard: z.object({
        title: z.string({ description: 'Title of the card (eg. Position in the competition)' }),
        presentedBy: z.string({ description: 'Name of the person who presented' }),
        orgImage: z.string({ description: 'Logo/Image of the organization' }),
        winner: PrizeWinner
            .describe(`
                The following properties are optional in this object:
                - button: Data of buttons to show on the Prize Card.
                - kaggleId: kaggle id's of the winners.`).array(),
        userImage: z.string({ description: 'Images of all the participants' }).array(),
        matDivider: z.boolean({ description: 'True if divider is needed' })
    }).partial({
        presentedBy: true,
        orgImage: true,
        userImage: true
    }).describe(`
        The following properties are optional in this object:
        - presentedBy: Name of the presenter.
        - orgImage: URL to the image of the organization.
        - userImage: URL(s) to the image of the participants.`).array(),
    styles: Styles.optional()
});

export const SectionCard = z.object({
    type: z.literal('section-card'),
    cardsInfo: z.object({
        title: z.string({ description: 'Title of the card' }),
        description: z.string({ description: 'Subtitle of the card' }),
        image: z.string({ description: 'URL of the Image of the card' }),
        gif: z.string({ description: 'URL for the GIF on the card' }),
        route: z.string({ description: 'Route to redirect the card' })
    }).array(),
    styles: Styles.optional()
})

export const SimpleTile = z.object({
    type: z.literal('simple-tile'),
    description: z.object({
        title: z.string({ description: 'Message to be displayed inside the tile' })
    }).array()
})

export const SopLinks = z.object({
    type: z.literal('sop-links'),
    sopData: z.object({
        sopTitle: z.string({ description: 'Title of the links' }),
        href: z.object({
            title: z.string({ description: 'Label for the link' }),
            href: z.string({ description: 'URL for the link' })
        }).array()
    })
})

const styledGroup = `This object has the following properties as optional:
- id: Label for the id attribute for the component
- class: Class name defined in the css file for this component.`
const StyledGroup = z.object({
    type: z.literal('styled-group', { description: styledGroup }),
    components: z.lazy(() => PageSpec).describe('To add components recursively'),
    id: z.string({ description: 'ID of the page element' }).optional(),
    class: z.string({ description: 'Class name defined in the css file' }).optional(),
    styles: Styles.optional()
}).describe(styledGroup);

export const TableVersion = z.object({
    type: z.literal('table-version'),
    isTotal: z.boolean({ description: 'True if want to display total below the table in the last row' }),
    isDownload: z.boolean({ description: 'True if want to download the table data csv file' }),
    versionChooserDisabled: z.boolean({ description: 'To show/hide the version select input' }),
    headerInfo: HeaderData.describe(`The following fields are optional in this object.
    - isTotalRequired: True if want to display the sum of column numbers below the table.
    - sorting: True if sorting required on the column.
    - alignment: Alignment of the data (start or end)`),
    versionData: z.lazy(() => VersionSelector.array()).describe('Release name, source csv file and version number'),
    additionalHeaders: ExtraHeader.array().optional().describe('Additional column names and definitions if any'),
    cellHeaders: ExtraHeader.array().optional().describe('Additional column names and definitions if any')
}).describe(`This object has the following properties as optional:
- additionalHeaders: Add details here to display additional table header for the table.
- cellHeaders: Add details here to display cell headers for the table.`)

const TissueData = z.object({
    name: z.string({ description: 'Name of the Tissue' }),
    image: z.string({ description: 'URL of the image of the Tissue' }),
    expandedImage: z.string({ description: 'URL of the image of the Tissue when dialog is open' }),
    threeDimImage: z.string({ description: 'URL of the 3D model file (.glb)' }),
    alt: z.string({ description: 'Alternate text for the image' }),
    url: z.string({ description: 'URL for the metadata button' }),
    svg: z.string({ description: 'URL to download the SVG file of the tissue' }),
    ai: z.string({ description: 'URL to download the AI file of the tissue' }),
    png: z.string({ description: 'URL to download the PNG file of the tissue' }),
}).partial({
    image: true,
    expandedImage: true,
    threeDimImage: true,
    alt: true,
    svg: true,
    ai: true,
    png: true
});

const titleDescription = `Properties 'class' and 'styles' are optional. Add styling in styles to apply styles to the title.`
export const Title = z.object({
    type: z.literal('title', { description: titleDescription }),
    title: z.string('Title/Text to be displayed'),
    class: z.string().optional().describe('Class name defined in the css file'),
    styles: Styles.optional()
}).describe(titleDescription)

const VersionOrgans = z.object({
    version: z.string({ description: 'HRA Release version (1.3/1.4/etc)' }),
    organData: OrganData.array().optional()
        .describe(`Organ data for the version.
        Property tissueData in this object is optional. Add tissue data to display details about tissues for each organ.`)
});

const VersionSelector = z.object({
    release: z.string({ description: 'Label for release and release date,year' }),
    version: z.number().or(z.string()).describe('Version Number of the release'),
    file: z.string().optional().describe('Name of the csv file')
})

export const YoutubePlayer = z.object({
    type: z.literal('player'),
    youtubePlayer: z.object({
        height: z.number({ description: 'Height of the youtube player' }).default(584),
        width: z.number({ description: 'Width of the youtube player' }).default(1232),
        videoId: z.string({ description: 'ID of the youtube video' }),
        playerTitle: z.string({ description: 'Title of the player' })
    }),
    styles: Styles.optional()
})

export const PageSpec = z.discriminatedUnion('type', [
    AnnouncementCard,
    BoardMembers,
    Button,
    CarouselSlides,
    ContactCard,
    CountCard,
    Datasets,
    Divider,
    DownloadFtu,
    Drawer,
    Image,
    ImageInCard,
    LongCard,
    LongCardWithTitle,
    Margin,
    MatCard,
    MenuTree,
    OrganVersion,
    PageData,
    PageHeaderCard,
    PrizeCard,
    SectionCard,
    SimpleTile,
    SopLinks,
    StyledGroup,
    TableVersion,
    Title,
    YoutubePlayer
]).array();
