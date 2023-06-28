import { calculateObjectSize } from 'bson';
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

export const Divider = z.object({
    styles: Styles.optional()
})

const ExtraHeader = z.object({
    columnDef: z.string(),
    header: z.string(),
    colspan: z.number().optional(),
    rowspan: z.number().optional(),
})

const HeaderData = z.object({
    header: z.string(),
    columnDef: z.string(),
    cell: z.unknown(),
    isTotalRequired: z.boolean(),
    sorting: z.boolean(),
    alignment: z.string(),
    justifyContent: z.string(),
}).partial({
    isTotalRequired: true,
    sorting: true,
    alignment: true,
    justifyContent: true
}).array()

export const Image = z.object({
    type: z.literal('image'),
    class: z.string({ description: 'Class name of the class defined in the CSS file' }).optional(),
    imageSource: z.string({ description: 'URL for the image' }),
    styles: Styles.optional(),
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
        userImage: z.string({ description: 'Images of all the participants' }),
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

export const ImageInCard = z.object({
    type: z.literal('simple-image'),
    imageData: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        imageDialog: z.string()
    }).array(),
    styles: Styles.optional()
})

export const Margin = z.object({
    type: z.literal('margin'),
    top: z.string(),
    bottom: z.string(),
    left: z.string(),
    right: z.string()
}).partial({
    top: true,
    bottom: true,
    left: true,
    right: true,
})

//// VERSION ORGANS START
const TissueData = z.object({
    name: z.string(),
    image: z.string().optional(),
    expandedImage: z.string().optional(),
    threeDimImage: z.string().optional(),
    alt: z.string().optional(),
    url: z.string(),
    svg: z.string().optional(),
    ai: z.string().optional(),
    png: z.string().optional(),
});

const OrganData = z.object({
    name: z.string(),
    image: z.string(),
    tissueData: z.lazy(() => TissueData.array()).optional()
});

const VersionOrgans = z.object({
    version: z.string(),
    organData: OrganData.array().optional()
});

export const OrganVersion = z.object({
    type: z.literal('organ-version'),
    isMultiRow: z.boolean(),
    tableRequired: z.boolean(),
    versionData: z.lazy(() => VersionSelector.array()),
    headerInfo: HeaderData.optional(),
    organInfo: VersionOrgans.array()
})

///VERSION ORGANS END

///table version start

export const TableVersion = z.object({
    type: z.literal('tableVersion'),
    isTotal: z.boolean(),
    isDownload: z.boolean(),
    versionChooserDisabled: z.boolean(),
    headerInfo: HeaderData,
    versionData: z.lazy(() => VersionSelector.array()),
    additionalHeaders: ExtraHeader.array().optional(),
    cellHeaders: ExtraHeader.array().optional()
})

export const SimpleTile = z.object({
    type: z.literal('simple-tile'),
    description: z.object({
        title: z.string()
    }).array()
})

export const SopLinks = z.object({
    type: z.literal('sop-links'),
    sopData: z.object({
        sopTitle: z.string(),
        href: z.object({
            title: z.string(),
            href: z.string()
        }).array()
    })
})

export const Title = z.object({
    type: z.literal('title'),
    class: z.string().optional(),
    styles: Styles.optional(),
    title: z.string()
})

const VersionSelector = z.object({
    release: z.string(),
    version: z.number().or(z.string()),
    file: z.string().optional()
})

export const YoutubePlayer = z.object({
    type: z.literal('player'),
    youtubePlayer: z.object({
        height: z.number(),
        width: z.number(),
        title: z.string(),
        videoId: z.string(),
        playerTitle: z.string()
    }),
    styles: Styles.optional()
})

const StyledGroup = z.object({
    type: z.literal('styled-group'),
    class: z.string().optional(),
    styles: Styles.optional(),
    components: z.lazy(() => PageSpec)
});

export const PageSpec = z.discriminatedUnion('type', [
    AnnouncementCard,
    BoardMembers,
    Button,
    CarouselSlides,
    ContactCard,
    CountCard,
    Image,
    LongCard,
    LongCardWithTitle,
    Margin,
    OrganVersion,
    PageData,
    PageHeaderCard,
    PrizeCard,
    SectionCard,
    ImageInCard,
    SimpleTile,
    SopLinks,
    StyledGroup,
    TableVersion,
    Title,
    YoutubePlayer
]).array();
