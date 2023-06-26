import { string, z } from 'zod';

export const AnnouncementCard = z.object({
    type: z.literal('announcement'),
    message: z.string(),
    route: z.string(),
    routeText: z.string(),
    emoji: z.string(),
}).partial({
    route: true,
    routeText: true,
    emoji: true,
    pageHeaderCards: true
})

export const BoardMembers = z.object({
    type: z.literal('board-members'),
    image: z.string(),
    description: z.string()
})

export const CarouselSlides = z.object({
    type: z.literal('carousel'),
    title: z.string(),
    body: z.string(),
    image: z.string(),
    url: z.string(),
    route: z.string(),
    buttonText: z.string(),
}).partial({
    url: true,
    route: true,
    buttonText: true
})

export const ContactCard = z.object({
    type: z.literal('contact-card'),
    field: z.string(),
    name: z.string(),
    role: z.string(),
    email: z.string(),
    image: z.string(),
})

export const CountCard = z.object({
    type: z.literal('count-card'),
    image: z.string(),
    count: z.string(),
    text: z.string()
})

export const Links = z.object({
    urls: z.string(),
    href: z.string()
})

export const LongCard = z.object({
    type: z.literal('long-card'),
    icon: z.string(),
    title: z.string(),
    body: z.string(),
    route: z.string(),
    color: z.string(),
    externalLink: z.string()
}).partial({
    route: true,
    externalLink: true,
    color: true
})

export const LongCardWithTitle = z.object({
    type: z.literal('long-card-with-title'),
    heading: z.string(),
    cardData: LongCard.array(),
    'title-size': z.string(),
    id: z.string()
}).partial({
    headerSize: true,
    id: true
})

export const PageData = z.object({
    type: z.literal('page-data'),
    heading: z.string(),
    description: z.string(),
})

export const PageHeaderCard = z.object({
    type: z.literal('page-header'),
    title: z.string(),
    subtitle: z.string(),
    icon: z.string()
})

export const PrizeButton = z.object({
    label: z.string(),
    link: z.string()
})

export const PrizeWinner = z.object({
    winner: z.string(),
    kaggleId: z.string(),
    button: PrizeButton.array()
}).partial({
    button: true
})

export const PrizeCard = z.object({
    type: z.literal('prize-card'),
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
})

export const SectionCard = z.object({
    type: z.literal('section-card'),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    gif: z.string(),
    route: z.string()
})

export const SimpleImage = z.object({
    type: z.literal('simple-image'),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    imageDialog: z.string(),
})

export const SopLinks = z.object({
    type: z.literal('sop-links'),
    title: z.string(),
    href: Links.array()
})

export const YoutubePlayer = z.object({
    type: z.literal('player'),
    height: z.number(),
    width: z.number(),
    title: z.string(),
    videoId: z.string(),
    playerTitle: z.string(),
})

export const PageSpec = z.discriminatedUnion('type', [
    AnnouncementCard,
    BoardMembers,
    CarouselSlides,
    ContactCard,
    CountCard,
    LongCard,
    LongCardWithTitle,
    PageData,
    PageHeaderCard,
    PrizeCard,
    SectionCard,
    SimpleImage,
    SopLinks,
    YoutubePlayer
]).array();

