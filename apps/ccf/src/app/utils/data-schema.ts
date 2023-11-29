import { z } from 'zod';

// ---------------------------
// Common types
// ---------------------------

/** Name of the column */
const ColumnName = z.string({ description: 'Column name' });

/** Styles for the element */
const Styles = z.record(z.union([z.string(), z.number()]));

/**
 * Object of Version entry. Each entry is defined by a release and version.
 */
const VersionEntry = z.object({
  release: z.string(),
  version: z.string(),
});

/**
 * Default styles for the dataset object
 */
const defaultDatasetsStyles = {
  display: 'flex',
  'flex-flow': 'row wrap',
  'justify-content': 'space-between',
  'padding-bottom': '2.5rem',
};

/**
 * Array of Announcement cards. Each announcement is defined by a message, route with it's label, and
 * emoji.
 */
export const AnnouncementCard = z.object({
  type: z.literal('announcement'),
  announcementCard: z
    .object({
      message: z.string({
        description: 'The message to be displayed on the card',
      }),
      route: z.string({ description: 'Route for another release notes page' }),
      routeText: z.string({
        description: 'Text to be clicked to redirect to different route',
      }),
      emoji: z.string({ description: 'To add emoji if required' }),
    })
    .describe(
      `The announcementCard field has three optional fields:
            - route: Route of the page where user will be redirected to when clicked on it.
            - routeText: Label for the route where we want the user to click.
            - emoji: Paste any emoji in this field if required.`
    )
    .partial({
      route: true,
      routeText: true,
      emoji: true,
    })
    .array(),
});

/**
 * Array of board members. Each board member is defined by a description and
 * image with it's alternate text.
 */
export const BoardMembers = z.object({
  type: z.literal('board-members'),
  boardMembersData: z
    .object({
      image: z.string({ description: 'URL for the image of the board member' }),
      description: z.string({
        description: 'Introduction of the board member',
      }),
      alt: z.string({ description: 'alternate text for image' }),
    })
    .array(),
});

/** Description of the button object */
const buttonDescription = `This object has the following properties as optional.
- url: External link to redirect the page to when button is pressed.
- route: Route Name of the page to redirect to when the button is pressed.
- icon: icon name for the icon to be displayed on the button.
- styles: Additional styling for the button.`;

/**
 * A button is defined by a label, route, URL and icon to be displayed in the button.
 * Can also contain optional common styles for it.
 */
export const Button = z
  .object({
    type: z.literal('button', { description: buttonDescription }),
    text: z.string({ description: 'Text on the button' }),
    url: z.string({ description: 'External URL for the button' }),
    route: z.string({
      description: 'Route for the another page in current project',
    }),
    icon: z.string({ description: 'Icon on the button' }),
    styles: Styles.optional(),
  })
  .partial({
    url: true,
    route: true,
    icon: true,
    styles: true,
  })
  .describe(buttonDescription);

/**
 * Array of carousel slides. Each slide is defined by a title, subtitle,
 * an image with it's alternate text. URL, route and label for the button.
 * It also contains an object of styles to style the carousel container.
 */
export const CarouselSlides = z.object({
  type: z.literal('carousel'),
  carouselContainerStyles: z.object({
    width: z.string().describe('Width of the container for carousel'),
  }),
  carouselInfo: z
    .object({
      title: z.string({ description: 'Title of the slide' }),
      body: z.string({ description: 'Subtitle of the slide' }),
      image: z.string({ description: 'Image of the slide' }),
      url: z.string({ description: 'External URL for the button' }).optional(),
      route: z
        .string({ description: 'Route of the page for the button' })
        .optional(),
      buttonText: z.string({ description: 'Text for the button' }),
      alt: z.string({
        description: 'Alternative text for the carousel image.',
      }),
    })
    .describe(
      `This object has the following optional fields.
    - url: External Link to redirect to when the button is pressed.
    - route: Name of the route of the page to be loaded when button is pressed.
    
    Enter either url or route.`
    )
    .array(),
});

/**
 * Array of contact cards. Each card is defined by a person's name, role,
 * field, email and image with it's alternate text.
 */
export const ContactCard = z.object({
  type: z.literal('contact-card'),
  contactData: z
    .object({
      field: z.string({ description: 'Field of work of the contact' }),
      name: z.string({ description: 'Name of the contact' }),
      role: z.string({ description: 'Role/ Position of the contact' }),
      email: z.string({ description: 'Email ID of the contact' }),
      image: z.string({ description: 'Image of the contact' }),
      alt: z.string({ description: 'Alternate text for image' }),
    })
    .array(),
});

/**
 * Array of clipboard data. Each object is defined by a url for the card,
 * icon name and label for the plain button and url and label for the
 * dynamic button
 */
export const CopyClipboard = z.object({
  type: z.literal('copy-clipboard'),
  clipboardData: z
    .object({
      url: z.string({
        description: 'URL/Text to be displayed inside the card',
      }),
      borderColor: z
        .string({
          description: 'Border color of card according to the request type',
        })
        .optional(),
      plainButton: z.object({
        icon: z.string({ description: 'Icon name for the button' }),
        label: z.string({ description: 'Text for the button' }),
      }),
      dynamicButton: z.object({
        label: z.string({ description: 'Text for the button' }),
        url: z.string({ description: 'External URL for the button' }),
      }),
    })
    .array(),
});

/**
 * Array of metric cards. Each card is defined by a metric's label, count,
 * and image with it's alternate text.
 */
export const CountCard = z.object({
  type: z.literal('count-card'),
  countCardInfo: z
    .object({
      image: z.string({ description: 'Icon for the card' }),
      count: z.number({ description: 'Count of the card' }).or(z.string()),
      text: z.string({ description: 'Title of the card' }),
      alt: z.string({ description: 'Alternative text for the image' }),
    })
    .array(),
});

/**
 * Array of dataset links. Each link is defined by label,
 * href and class name for the link.
 * Can also contain optional common styles for the container.
 */
export const Datasets = z
  .object({
    type: z.literal('datasets'),
    links: z
      .object({
        class: z
          .string({ description: 'Class name defined in the css file' })
          .default('datasets'),
        href: z.string({ description: 'URL of the items' }),
        title: z.string({ description: 'Tooltip title for the item' }),
        data: z.string({ description: 'Label for the item' }),
      })
      .array(),
    styles: Styles.default(defaultDatasetsStyles),
  })
  .required({ styles: true });

/**
 * A divider. It contains optional common styles for the divider.
 */
export const Divider = z.object({
  type: z.literal('divider'),
  styles: Styles.optional(),
});

/** Description of the DownloadFtu Object */
const downloadFtuDescription = `This object has the following fields as optional.
- displayMetaData: True if you want to display Release Version and Digital Object type. If you set this to true, make sure to add releaseVersion and dot properties in rows object.
- downloadIcon: name of the icon you want to display in download column header
- columnLabels: Object of column definition and column headers for the table
`;

/**
 * Contains an array of version information and version data.
 * It also containes an object of column labels, a displayMetaData and download icon
 * flag to show/hide additional columns and download icon.
 */
export const DownloadFtu = z
  .object({
    type: z.literal('download-ftu', { description: downloadFtuDescription }),
    versions: VersionEntry.array().describe('Release name and version number.'),
    displayMetadata: z
      .boolean({
        description:
          'Flag to display the Release Version and Digital Object type',
      })
      .optional(),
    downloadIcon: z
      .string({ description: 'Icon name to display the icon' })
      .optional(),
    columnLabels: z
      .record(z.string(), z.string(), {
        description: 'Object of column definition and column header label',
      })
      .optional()
      .default({
        type: 'Type',
        download: 'Download',
        releaseVersion: 'Release Version',
        digitalObjectType: 'Digital Object Type',
      }),
    versionedData: z
      .object({
        version: z.string({ description: 'Version Number of the data' }),
        rows: z
          .object({
            label: z.string({ description: 'Label for the Organ/Type column' }),
            links: z
              .object({
                label: z.string({
                  description: 'Label for the link in the download column',
                }),
                link: z.string({
                  description: 'URL for the label in the download column',
                }),
              })
              .array(),
            releaseVersion: z
              .string({ description: 'Table Data for release version column.' })
              .optional(),
            dot: z
              .string()
              .optional()
              .describe('Table data for Digital Object Type column.'),
            url: z
              .string({ description: 'URL for Organ or its type' })
              .optional(),
          })
          .describe(
            `Following properties in this object are optional:
        - releaseVersion: Release version of the organ.
        - dot: Digital object type of the organ.
        - url: External link to be embedded in the organ.`
          )
          .array(),
      })
      .describe(`Add version and rows data for the table`)
      .array(),
  })
  .describe(downloadFtuDescription);

/** An array of navigation items inside a drawer.
 * Each item contains a label and the id.
 * It contains drawerStyles to style the drawer and
 * components to add components inside the drawer.
 */
export const Drawer = z.object({
  type: z.literal('drawer'),
  navigationItems: z
    .object({
      menuName: z.string({ description: 'Label of the menu item' }),
      id: z.string({ description: 'ID of the menu item' }),
    })
    .array(),
  drawerStyles: Styles,
  components: z.lazy(() => PageSpec).describe('To add components recursively'),
});

/**
 * Object of extra header. Each header is defined by a column definition,
 * header, and optional rowspan and a colspan.
 */
const ExtraHeader = z
  .object({
    columnDef: z.string({ description: 'Definition of the column' }),
    header: ColumnName,
    colspan: z.number().optional().describe('Number of columns to span'),
    rowspan: z.number().optional().describe('Number of rows to span'),
  })
  .describe(
    `colspan and rowspan are optional fields. Add appropriate number to span the cells accordingly.`
  );

/**
 * Array of header data. Each header object is defined by a column definition,
 * header, cell, and a optional isTotalRequired and a sorting flag, an alignment property.
 */
const HeaderData = z
  .object({
    header: ColumnName,
    columnDef: z.string({ description: 'Definition of the column' }),
    cell: z.unknown().describe('Code to display the cell data'),
    isTotalRequired: z.boolean({
      description: 'True of want the total to be displayed',
    }),
    sorting: z.boolean({ description: 'True if sorting is required' }),
    alignment: z.string({
      description: 'Alignment of the data (start or end)',
    }),
  })
  .partial({
    isTotalRequired: true,
    sorting: true,
    alignment: true,
  })
  .array().describe(`The following fields are optional in this object.
- isTotalRequired: True if want to display the sum of column numbers below the table.
- sorting: True if sorting required on the column.
- alignment: Alignment of the data (start or end)`);

/**
 * Object of image. Each object is defined by a class name
 * image url and it's alternate text. Can also contain optional common styles for it.
 */
export const Image = z
  .object({
    type: z.literal('image'),
    class: z
      .string({
        description: 'Class name of the class defined in the CSS file',
      })
      .optional(),
    imageSource: z.string({ description: 'URL for the image' }),
    alt: z.string({ description: 'Alternative text for the image' }),
    styles: Styles.optional(),
  })
  .describe(
    `Property 'class' is optional. It is the class name for the image. Define this class in page-element.component.scss`
  );

/**
 * Array of image data. Each image data object is defined by a title,
 * description, url of image, modal image along with their alternate text.
 * image url and it's alternate text.
 */
export const ImageInCard = z.object({
  type: z.literal('simple-image'),
  imageData: z
    .object({
      title: z.string({ description: 'Title of the image on the card' }),
      description: z.string({ description: 'Description of the image' }),
      image: z.string({ description: 'URL of the image' }),
      imageDialog: z.string({
        description: 'URL of the image to be displayed on the dialog',
      }),
      alt: z.string({ description: 'Alternate text for image' }),
    })
    .array(),
});

/**
 * Object of card items. Each card object is defined by a title,
 * description, url or route of the card,
 * card's image along with its background color and alternate text.
 */
const LongCardItems = z
  .object({
    icon: z.string({ description: 'Icon of the card' }),
    title: z.string({ description: 'Title of the card' }),
    body: z.string({ description: 'Subtitle of the card' }),
    route: z.string({ description: 'Route for the card to be redirected' }),
    color: z.string({
      description: 'Background color for the icon if necessary',
    }),
    externalLink: z.string({ description: 'External URL to be redirected' }),
    alt: z.string({ description: 'alternate text for card icon' }),
  })
  .partial({
    route: true,
    externalLink: true,
    color: true,
    body: true,
  })
  .describe(
    `Properties mentioned here are optional. Either use route or externalLink
- route: route for the page to be redirected
- externalLink: URL of the page to be opened when the card is clicked
- color: background color of the image
- body: Subtitle for the card`
  )
  .array();

/**
 * Object of card items. Each card object is defined by a title,
 * description, url or route of the card,
 * card's image along with its background color and alternate text.
 */
export const LongCard = z.object({
  type: z.literal('long-card'),
  longCardItems: LongCardItems,
});

/**
 * Array of card items with tile. Each object is defined by a
 * LongCardItems object, title, along with it's optional
 * font size and element id.
 */
export const LongCardWithTitle = z.object({
  type: z.literal('long-card-with-title'),
  longCardWithTitleData: z
    .object({
      heading: z.string({ description: 'Title of the Card' }),
      headerSize: Styles.describe('Inline styles for the title of the card'),
      id: z.string({ description: 'Unique ID for the title of the card' }),
      cardData: LongCardItems,
    })
    .partial({
      headerSize: true,
      id: true,
    })
    .describe(
      `Properties mentioned here are optional
    - headerSize: Pass inline styles for the header of the card
    - id: Pass id as an attribute to the title of the card`
    )
    .array(),
});

/**
 * A Margin object. It contains optional
 * margin properties like top, bottom, left. right
 */
export const Margin = z
  .object(
    {
      type: z.literal('margin'),
      top: z.string(),
      bottom: z.string(),
      left: z.string(),
      right: z.string(),
    },
    {
      description:
        'To add margin around any component. Add top/ bottom/ left/ right and margin value',
    }
  )
  .partial({
    top: true,
    bottom: true,
    left: true,
    right: true,
  });

/**
 * A MatCard object. Each card contains an array of components.
 * Can also contain optional common styles for it.
 */
export const MatCard = z.object({
  type: z.literal('mat-card'),
  components: z.lazy(() => PageSpec).describe('To add components recursively'),
  styles: Styles.optional(),
});

/**
 * Object of menu tree. Each object is defined by a
 * a overlay class name, a position object and an array
 * of navigation items object. Can also contain optional common styles for it.
 */
export const MenuTree = z.object({
  type: z.literal('menu-tree'),
  overlayClass: z.string(),
  positions: z
    .object({
      originX: z.string(),
      originY: z.string(),
      overlayX: z.string(),
      overlayY: z.string(),
      offsetX: z.number(),
      offsetY: z.number(),
    })
    .array(),
  mobileNavigationItems: z
    .object({
      menuName: z.string(),
      id: z.string(),
    })
    .array(),
  styles: Styles.optional(),
});

/**
 * Object of organ data. Each object is defined by a
 * name, image with it's alternate text, and an array of tissue data object
 */
const OrganData = z.object({
  name: z.string({ description: 'Name of the organ' }),
  image: z.string({ description: 'Path to the Icon/Image of the organ' }),
  alt: z.string({ description: 'Alternate text for icon' }),
  tissueData: z
    .lazy(() => TissueData)
    .array()
    .optional().describe(`Tissue data for the above organ.
    Following properties are optional in this object.
    - image: URL of the image of the tissue.
    - expandedImage: URL of the image to be shown in the modal, when it is clicked.
    - threeDimImage: URL of the 3D object (.glb) file.
    - alt: Alternate text for the image.
    - url: URL for the metadata button.
    - svg: URL to download the SVG file of the tissue.
    - ai: URL to download the AI file of the tissue.
    - png: URL to download the PNG file of the tissue.`),
});

/** Description of OrganVersion object */
const organVersionDescription = `This object has the following fields as optional
- headerInfo: this is the data about column headers and their definition. Add this data if you want to display data table`;

/**
 * Object of organ version. Each object is defined by an
 * array of version data, header information and organ information,
 * isMultiRow and isTableRequired flag.
 */
export const OrganVersion = z.object({
  type: z.literal('organ-version', { description: organVersionDescription }),
  isMultiRow: z.boolean({
    description:
      'True if want to display organs one below other. False if want to display organs beside one another',
  }),
  tableRequired: z.boolean({
    description: 'True of want to display data table',
  }),
  versionData: z.lazy(() => VersionSelector).array()
    .describe(`Release name, source csv file and version number
    Property 'file' is optional. If required, add property 'file' ans pass the path to the CSV file. It is only required if tableRequired is True.`),
  headerInfo: HeaderData.optional()
    .describe(`Names of columns and their definitions
        There are three optional values in this object:
        - isTotalRequired: To display total at the end of the table
        - sorting: To enable sorting in the table
        - alignment: start or end to align data left or right`),
  organInfo: z
    .lazy(() => VersionOrgans)
    .array()
    .describe(organVersionDescription),
});

/**
 * An array of page data. Each object is defined by a
 * heading and description. It may also contain optional styles.
 */
export const PageData = z.object({
  type: z.literal('page-data'),
  pageData: z
    .object({
      heading: z.string({ description: 'Title of the data' }),
      descriptions: z.string({ description: 'Description of the data' }),
    })
    .array(),
  styles: Styles.optional(),
});

/**
 * An array of page header card. Each card object is defined by a
 * title, subtitle and image along with it's alternate text.
 * It may also contain optional styles.
 */
export const PageHeaderCard = z.object({
  type: z.literal('header'),
  headerCard: z
    .object({
      title: z.string({ description: 'Title of the card' }),
      subtitle: z.string({ description: 'Subtitle of the card' }),
      image: z.string({ description: 'Icon of the card' }),
      alt: z.string({ description: 'Text Alternative for card image' }),
    })
    .array(),
  styles: Styles.optional(),
});

/**
 * An object of prize button. Each button is defined by a
 * label and URL.
 */
const PrizeButton = z.object({
  label: z.string({ description: 'Text on the button' }),
  link: z.string({ description: 'URL for the button' }),
});

/**
 * An object of prize winner. Each object is defined by a
 * winner name, their kaggle id and an array of PrizeButton object.
 */
const PrizeWinner = z
  .object({
    winner: z.string({ description: 'Name of the winner' }),
    kaggleId: z.string({ description: 'Kaggle ID of the winner' }),
    button: PrizeButton.array(),
  })
  .partial({
    button: true,
    kaggleId: true,
  });

/**
 * An array of prize card. Each card object is defined by a
 * title, presentedBy, organization image along with it's alternate text,
 * an array of prize winner object and user image object and matDivider.
 * It may also contain optional styles.
 */
export const PrizeCard = z.object({
  type: z.literal('prize-card'),
  prizeCard: z
    .object({
      title: z.string({
        description: 'Title of the card (eg. Position in the competition)',
      }),
      presentedBy: z.string({
        description: 'Name of the person who presented',
      }),
      orgImage: z.string({ description: 'Logo/Image of the organization' }),
      winner: PrizeWinner.describe(
        `
                The following properties are optional in this object:
                - button: Data of buttons to show on the Prize Card.
                - kaggleId: kaggle id's of the winners.`
      ).array(),
      userImage: z
        .object({
          image: z.string({ description: 'Images of all the participants' }),
          alt: z.string({ description: 'Alternate text for user image' }),
        })
        .array(),
      matDivider: z.boolean({ description: 'True if divider is needed' }),
      alt: z.string({ description: 'Alternate text for the org image' }),
    })
    .partial({
      presentedBy: true,
      orgImage: true,
      userImage: true,
      alt: true,
    })
    .describe(
      `
        The following properties are optional in this object:
        - presentedBy: Name of the presenter.
        - orgImage: URL to the image of the organization.
        - userImage: URL(s) to the image of the participants.`
    )
    .array(),
  styles: Styles.optional(),
});

/**
 * An array of section card. Each card object is defined by a
 * title, description, image, gif and route.
 */
export const SectionCard = z.object({
  type: z.literal('section-card'),
  cardsInfo: z
    .object({
      title: z.string({ description: 'Title of the card' }),
      description: z.string({ description: 'Subtitle of the card' }),
      image: z.string({ description: 'URL of the Image of the card' }),
      gif: z.string({ description: 'URL for the GIF on the card' }),
      route: z.string({ description: 'Route to redirect the card' }),
    })
    .array(),
});

/**
 * An array of simple tile. Each tile object is defined by a
 * title
 */
export const SimpleTile = z.object({
  type: z.literal('simple-tile'),
  description: z
    .object({
      title: z.string({
        description: 'Message to be displayed inside the tile',
      }),
    })
    .array(),
});

/**
 * An object of sop data. Each object is defined by a
 * title and an array of href objects that contain title and url for the link.
 */
export const SopLinks = z.object({
  type: z.literal('sop-links'),
  sopData: z.object({
    sopTitle: z.string({ description: 'Title of the links' }),
    href: z
      .object({
        title: z.string({ description: 'Label for the link' }),
        href: z.string({ description: 'URL for the link' }),
      })
      .array(),
  }),
});

/** Description for styled group object */
const styledGroup = `This object has the following properties as optional:
- id: Label for the id attribute for the component
- class: Class name defined in the css file for this component.`;

/**
 * An object of styled group. Each object is defined by a
 * components, and optional properties like id, class and styles.
 */
const StyledGroup = z
  .object({
    type: z.literal('styled-group', { description: styledGroup }),
    components: z
      .lazy(() => PageSpec)
      .describe('To add components recursively'),
    id: z.string({ description: 'ID of the page element' }).optional(),
    class: z
      .string({ description: 'Class name defined in the css file' })
      .optional(),
    styles: Styles.optional(),
  })
  .describe(styledGroup);

/**
 * An object of table version. Each object is defined by a
 * flags of isTotal, isDownload, versionChooserDisabled,
 * an object of headerInfo, an array of versionData object,
 * an array of ExtraHeader object.
 */
export const TableVersion = z.object({
  type: z.literal('table-version'),
  isTotal: z.boolean({
    description:
      'True if want to display total below the table in the last row',
  }),
  isDownload: z.boolean({
    description: 'True if want to download the table data csv file',
  }),
  versionChooserDisabled: z.boolean({
    description: 'To show/hide the version select input',
  }),
  headerInfo:
    HeaderData.describe(`The following fields are optional in this object.
    - isTotalRequired: True if want to display the sum of column numbers below the table.
    - sorting: True if sorting required on the column.
    - alignment: Alignment of the data (start or end)`),
  versionData: z
    .lazy(() => VersionSelector.array())
    .describe('Release name, source csv file and version number'),
  additionalHeaders: ExtraHeader.array()
    .optional()
    .describe('Additional column names and definitions if any'),
  cellHeaders: ExtraHeader.array()
    .optional()
    .describe('Additional column names and definitions if any'),
}).describe(`This object has the following properties as optional:
- additionalHeaders: Add details here to display additional table header for the table.
- cellHeaders: Add details here to display cell headers for the table.`);

/**
 * An object of tissueData. Each object is defined by a
 * name, image with it's alternate text, links for url,
 * ai, png, svg and threeDimImage.
 */
const TissueData = z
  .object({
    name: z.string({ description: 'Name of the Tissue' }),
    image: z.string({ description: 'URL of the image of the Tissue' }),
    expandedImage: z.string({
      description: 'URL of the image of the Tissue when dialog is open',
    }),
    threeDimImage: z.string({ description: 'URL of the 3D model file (.glb)' }),
    alt: z.string({ description: 'Alternate text for the image' }),
    url: z.string({ description: 'URL for the metadata button' }),
    svg: z.string({
      description: 'URL to download the SVG file of the tissue',
    }),
    ai: z.string({ description: 'URL to download the AI file of the tissue' }),
    png: z.string({
      description: 'URL to download the PNG file of the tissue',
    }),
  })
  .partial({
    image: true,
    expandedImage: true,
    threeDimImage: true,
    alt: true,
    svg: true,
    ai: true,
    png: true,
  });

/** Description of Title object */
const titleDescription = `Properties 'class' and 'styles' are optional. Add styling in styles to apply styles to the title.`;

/**
 * An object of title. Object is defined by a
 * title, class and may contain optional styles.
 */
export const Title = z
  .object({
    type: z.literal('title', { description: titleDescription }),
    title: z.string({ description: 'Title/Text to be displayed' }),
    class: z.string().optional().describe('Class name defined in the css file'),
    styles: Styles.optional(),
  })
  .describe(titleDescription);

/**
 * An object of version organs. Each object is defined by a
 * version and an array of OrganData object.
 */
const VersionOrgans = z.object({
  version: z.string({ description: 'HRA Release version (1.3/1.4/etc)' }),
  organData: OrganData.array().optional().describe(`Organ data for the version.
        Property tissueData in this object is optional. Add tissue data to display details about tissues for each organ.`),
});

/**
 * An object of version selector. Each object is defined by a
 * release and version and a file name.
 */
const VersionSelector = z.object({
  release: z.string({ description: 'Label for release and release date,year' }),
  version: z.number().or(z.string()).describe('Version Number of the release'),
  file: z.string().optional().describe('Name of the csv file'),
});

/**
 * An object of youtube player. Each object is defined by a
 * height, width, videoId and playerTitle.
 */
export const YoutubePlayer = z.object({
  type: z.literal('player'),
  youtubePlayer: z.object({
    height: z
      .number({ description: 'Height of the youtube player' })
      .default(584),
    width: z
      .number({ description: 'Width of the youtube player' })
      .default(1232),
    videoId: z.string({ description: 'ID of the youtube video' }),
    playerTitle: z.string({ description: 'Title of the player' }),
  }),
});

/**
 * An array of discriminated union of the objects of all components
 */
export const PageSpec: any = z
  .discriminatedUnion('type', [
    AnnouncementCard,
    BoardMembers,
    Button,
    CarouselSlides,
    ContactCard,
    CopyClipboard,
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
    YoutubePlayer,
  ])
  .array();
