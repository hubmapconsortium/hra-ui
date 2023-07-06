import { z } from 'zod';

const Styles = z.record(z.union([z.string(), z.number()]))

export const AnnouncementCard = z.object({
    type: z.literal('announcement'),
    announcementCard: z.object({
        message: z.string({ description: 'The message to be displayed on the card' }),
        route: z.string({ description: 'Route for another release notes page' }),
        routeText: z.string({ description: 'Text to be clicked to redirect to different route' }),
        emoji: z.string({ description: 'To add emoji if required' })
    }).partial({
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

export const Button = z.object({
    type: z.literal('button'),
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
})

export const CarouselSlides = z.object({
    type: z.literal('carousel'),
    carouselContainerStyles: z.object({
        width: z.string()
    }),
    carouselInfo: z.object({
        title: z.string({ description: 'Title of the slide' }),
        body: z.string({ description: 'Subtitle of the slide' }),
        image: z.string({ description: 'Image of the slide' }),
        url: z.string({ description: 'External URL for the button' }).optional(),
        route: z.string({ description: 'Route of the page for the button' }).optional(),
        buttonText: z.string({ description: 'Text for the button' })
    }).array(),
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
        text: z.string({ description: 'Title of the card' })
    }).array(),
    styles: Styles.optional()
})

export const Datasets = z.object({
    type: z.literal('datasets'),
    links: z.object({
        class: z.string({ description: 'Class name defined in the css file' }),
        href: z.string({ description: 'URL of the item' }),
        title: z.string({ description: 'Tooltip title for the item' }),
        data: z.string({ description: 'Label for the item' })
    }).array(),
    styles: Styles.optional()
})

export const Divider = z.object({
    type: z.literal('divider'),
    styles: Styles.optional()
})

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
    header: z.string({ description: 'Column name' }),
    colspan: z.number().optional().describe('Number of columns to span'),
    rowspan: z.number().optional().describe('Number of rows to span'),
})

const HeaderData = z.object({
    header: z.string({ description: 'Column name' }),
    columnDef: z.string({ description: 'Definition of the column' }),
    cell: z.unknown().describe('Code to display the cell data'),
    isTotalRequired: z.boolean({ description: 'True of want the total to be displayed' }),
    sorting: z.boolean({ description: 'True if sorting is required' }),
    alignment: z.string({ description: 'Alignment of the data (start or end)' })
}).partial({
    isTotalRequired: true,
    sorting: true,
    alignment: true
}).array()

export const Image = z.object({
    type: z.literal('image'),
    class: z.string({ description: 'Class name of the class defined in the CSS file' }).optional(),
    imageSource: z.string({ description: 'URL for the image' }),
    styles: Styles.optional(),
})

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
}).array()

export const LongCard = z.object({
    type: z.literal('long-card'),
    longCardItems: LongCardItems,
    styles: Styles.optional()
})

export const LongCardWithTitle = z.object({
    type: z.literal('long-card-with-title'),
    longCardWithTitleData: z.object({
        heading: z.string({ description: 'Title of the Card' }),
        headerSize: z.string({ description: 'Size of the title of the card' }),
        cardData: LongCardItems,
        id: z.string({ description: 'Unique ID for the title of the card' })
    }).partial({
        headerSize: true,
        id: true
    }).array()
})

export const Margin = z.object({
    type: z.literal('margin'),
    top: z.string(),
    bottom: z.string(),
    left: z.string(),
    right: z.string()
}, { description: 'To add margin around any component.' }).partial({
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
    image: z.string({ description: 'Icon/Image of the organ' }),
    tissueData: z.lazy(() => TissueData.array()).optional().describe('Tissue data for the above organ')
});

export const OrganVersion = z.object({
    type: z.literal('organ-version'),
    isMultiRow: z.boolean({ description: 'True if want to display organs one below other. False if want to display organs beside one another' }),
    tableRequired: z.boolean({ description: 'True of want to display data table' }),
    versionData: z.lazy(() => VersionSelector.array()).describe('Release name, source csv file and version number'),
    headerInfo: HeaderData.optional().describe('Names of columns and their definitions'),
    organInfo: z.lazy(() => VersionOrgans.array()).describe('Version Number and Organ data for the same version')
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
        winner: PrizeWinner.array(),
        userImage: z.string({ description: 'Images of all the participants' }).array(),
        matDivider: z.boolean({ description: 'True if divider is needed' })
    }).partial({
        presentedBy: true,
        orgImage: true,
        userImage: true
    }).array(),
    styles: Styles.optional()
})

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

const StyledGroup = z.object({
    type: z.literal('styled-group'),
    components: z.lazy(() => PageSpec).describe('To add components recursively'),
    id: z.string({ description: 'ID of the page element' }).optional(),
    class: z.string({ description: 'Class name defined in the css file' }).optional(),
    styles: Styles.optional()
});

export const TableVersion = z.object({
    type: z.literal('table-version'),
    isTotal: z.boolean({ description: 'True if want to display total below the table in the last row' }),
    isDownload: z.boolean({ description: 'True if want to download the table data csv file' }),
    versionChooserDisabled: z.boolean({ description: 'To show/hide the version select input' }),
    headerInfo: HeaderData.describe('Names of columns and their definitions'),
    versionData: z.lazy(() => VersionSelector.array()).describe('Release name, source csv file and version number'),
    additionalHeaders: ExtraHeader.array().optional().describe('Additional column names and definitions if any'),
    cellHeaders: ExtraHeader.array().optional().describe('Additional column names and definitions if any')
})

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

export const Title = z.object({
    type: z.literal('title'),
    title: z.string('Title/Text to be displayed'),
    class: z.string().optional().describe('Class name defined in the css file'),
    styles: Styles.optional()
})

const VersionOrgans = z.object({
    version: z.string({ description: 'HRA Release version (1.3/1.4/etc)' }),
    organData: OrganData.array().optional().describe('Organ data for the version')
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
