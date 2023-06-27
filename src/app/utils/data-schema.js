import { calculateObjectSize } from 'bson';
import { z } from 'zod';

const Styles = z.record(z.union([z.string(), z.number()]))

export const AnnouncementCard = z.object({
    type: z.literal('announcement'),
    announcementCard: z.object({
        message: z.string(),
        route: z.string(),
        routeText: z.string(),
        emoji: z.string()
    }).partial({
        route: true,
        routeText: true,
        emoji: true,
        pageHeaderCards: true
    }).array(),
    styles: Styles.optional()
})

export const BoardMembers = z.object({
    type: z.literal('board-members'),
    boardMembersData: z.object({
        image: z.string(),
        description: z.string()
    }).array(),
    styles: Styles.optional()
})

export const Button = z.object({
    type: z.literal('button'),
    text: z.string(),
    url: z.string(),
    route: z.string(),
    icon: z.string(),
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
        title: z.string(),
        body: z.string(),
        image: z.string(),
        url: z.string().optional(),
        route: z.string().optional(),
        buttonText: z.string()
    }).array(),
    styles: Styles.optional()
})

export const ContactCard = z.object({
    type: z.literal('contact-card'),
    contactData: z.object({
        field: z.string(),
        name: z.string(),
        role: z.string(),
        email: z.string(),
        image: z.string(),
    }).array(),
    styles: Styles.optional()
})

export const CountCard = z.object({
    type: z.literal('count-card'),
    countCardInfo: z.object({
        image: z.string(),
        count: z.number().or(z.string()),
        text: z.string()
    }).array(),
    styles: Styles.optional()
})

export const Divider = z.object({
    styles: Styles.optional()
})

export const Image = z.object({
    type: z.literal('image'),
    imageSource: z.string(),
    styles: Styles.optional()
})

const LongCardItems = z.object({
    icon: z.string(),
    title: z.string(),
    body: z.string(),
    route: z.string(),
    color: z.string(),
    externalLink: z.string()
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
        heading: z.string(),
        cardData: LongCardItems,
        headerSize: z.string(),
        id: z.string()
    }).partial({
        headerSize: true,
        id: true
    }).array()
})

export const PageData = z.object({
    type: z.literal('page-data'),
    pageData: z.object({
        heading: z.string().optional(),
        descriptions: z.string(),
    }).array(),
    styles: Styles.optional()
});

export const PageHeaderCard = z.object({
    type: z.literal('header'),
    headerCard: z.object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
    }).array(),
    styles: Styles.optional()
})

const PrizeButton = z.object({
    label: z.string(),
    link: z.string()
})
const PrizeWinner = z.object({
    winner: z.string(),
    kaggleId: z.string(),
    button: PrizeButton.array()
}).partial({
    button: true,
    kaggleId: true
})

export const PrizeCard = z.object({
    type: z.literal('prize-card'),
    prizeCard: z.object({
        title: z.string(),
        presentedBy: z.string(),
        orgImage: z.string(),
        winner: PrizeWinner.array(),
        userImage: z.string(),
        matDivider: z.boolean()
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
        title: z.string(),
        description: z.string(),
        image: z.string(),
        gif: z.string(),
        route: z.string()
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
    PageData,
    PageHeaderCard,
    PrizeCard,
    SectionCard,
    ImageInCard,
    SimpleTile,
    SopLinks,
    Title,
    YoutubePlayer
]).array();
