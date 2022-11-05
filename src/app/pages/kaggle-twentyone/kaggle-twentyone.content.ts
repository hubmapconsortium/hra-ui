import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { PrizeCard } from "src/app/components/prize-card/prize-card";

export const kaggle2021Header: PageHeaderItems[] = [
    {
        title: 'Kaggle #1: HuBMAP - Hacking the Kidney',
        subtitle: 'Algorithm development challenges that engage teams from around the globe to develop code for HRA construction',
        image: 'assets/images/kaggle.svg'

    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `Our best estimates show there are over 7 billion people on the planet and 300 billion stars in the Milky Way galaxy. By comparison, the adult human body contains 37 trillion cells. To determine the function and relationship among these cells is a monumental undertaking. Many areas of human health would be impacted if we better understand cellular activity. A problem with this much data is a great match for the Kaggle community.
        <br><br> Just as the Human Genome Project mapped the entirety of human DNA, the Human BioMolecular Atlas Program (HuBMAP) is a major endeavor. Sponsored by the National Institutes of Health (NIH), HuBMAP is working to catalyze the development of a framework for mapping the human body at a level of glomeruli functional tissue units for the first time in history. Hoping to become one of the world’s largest collaborative biological projects, HuBMAP aims to be an open map of the human body at the cellular level.
        <br><br>This competition, "Hacking the Kidney," starts by mapping the human kidney at single cell resolution.
        <br><br>The challenge is to detect functional tissue units (FTUs) across different tissue preparation pipelines. An FTU is defined as a “three-dimensional block of cells centered around a capillary, such that each cell in this block is within diffusion distance from any other cell in the same block” (de Bono, 2013). The goal of this competition is the implementation of a successful and robust glomeruli FTU detector.
        <br><br>Advancements in HuBMAP will accelerate the world's understanding of the relationships between cell and tissue organization and function and human health. These datasets and insights can be used by researchers in cell and tissue anatomy, pharmaceutical companies to develop therapies, or even parents to show their children the magnitude of the human body.
        <br><br>Please see <a href="https://www.kaggle.com/c/hubmap-kidney-segmentation" target="_blank">https://www.kaggle.com/c/hubmap-kidney-segmentation</a> for competition details.`
    },
    {
        heading: 'Awards Ceremony',
        descriptions: `On May 21, 2021, Judges announced winning teams at the annual HubMAP All-Hands Meeting and the HuBMAP Awards: Hacking the Kidney on Kaggle ceremony. 
        A <a href="https://www.youtube.com/watch?v=fZebsmQoUEY" target="_blank">recording</a> of the event and competitor presentations will be posted at the 
        <a href="https://www.youtube.com/channel/UCbSvPJ9dXASL14KoDeutMFg" target="_blank">HuBMAP Consortium YouTube channel</a>.`
    }
]

export const acknowledgmentsData: PageDataItems[] = [
    {
        heading: 'Acknowledgments',
        descriptions: `We would like to thank the many individuals that made this competition possible including:
        <br><br><strong>Organizers</strong>: Andrea de Souza (Eli Lilly and Company), Katy Börner (Indiana University), Deepika Vuppalanchi (Precision Value Health), Christine Drury (InnovDigi/Conference Ventures), and Sandeep Allam (STLogics).
        <br><br><strong>Support Team</strong>: Richard Holland, Marcos Novaes, and Addison Howard (Google), Leah Scherschel, Lisel Record, Ellen Quardokus, and Yingnan Ju (Indiana University), Jeffrey Spraggins and Heath Patterson (Vanderbilt University), and Arkan Abadi (Eli Lilly).
        <br><br><strong>Kaggle Sponsors</strong>: Google HCLS, Roche, Deloitte, Deerfield Healthcare, Pistoia Alliance, CAS - American Chemical Society, Maven Wave.
        <br><br><strong>Kaggle Judges</strong>: Zorina Galis (NIH), Thomas Fuchs (Paige.ai, Mount Sinai), Matt Nelson (Deerfield Healthcare), Amy Bernard (Allen Institute), Maigan Brusko (University of Florida), John Marioni (EMBL-EBI, UK), Blue Lake (UC San Diego), David Van Valen (CalTech), and Alex Wolf (Cellarity).
        <br><br><strong>Funders</strong>: This work has been funded in part by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671 and VU HuBMAP under award 1U54DK120058-01.
        `
    }
]

export const accuracyPrizeData: PrizeCard[] = [
    {
        title: '1st Place ($18,000)',
        presentedBy: 'Geri Studebaker',
        matDivider: true,
        winner: [
            {
                winner: 'Tom', kaggleId: '<b>Kaggle ID:</b> tikutiku',
                button: [
                    {
                        label: 'Solution WriteUp',
                        link: "https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238198"
                    }
                ]
            }
        ],
        orgImage: 'assets/images/google.svg',
        userImage: ['assets/images/tikutiku.svg']
    },
    {
        title: '2nd Place ($10,000)',
        presentedBy: 'Aashima Gupta',
        matDivider: true,
        winner: [
            {
                winner: 'Gleb',
                kaggleId: `<b>Kaggle IDs (no order):</b> bakeryproducts, kulyabin, and sherlockkay`,
            }
        ],
        orgImage: 'assets/images/google.svg',
        userImage: ['assets/images/bakeryproducts.svg', 'assets/images/kulyabin.svg', 'assets/images/sherlockkay.svg']
    },
    {
        title: '3rd Place ($3,000)',
        presentedBy: 'Albert Ihochi',
        matDivider: true,
        winner: [{
            winner: 'Whats goin on',
            kaggleId: `<b>Kaggle IDs (no order):</b> shujun717 and rvslight`,
            button: [
                {
                    label: 'Solution Write-up',
                    link: 'https://www.kaggle.com/c/hubmap-kidney-segmentation/discussion/238013'
                }
            ]
        }],
        orgImage: 'assets/images/third_place_org.svg',
    }
]

export const judgesPrizeData: PrizeCard[] = [
    {
        title: 'Scientific Prize ($15,000)',
        presentedBy: 'Ryan Copping',
        matDivider: true,
        winner: [{
            winner: 'DeepLive.exe',
            kaggleId: `<b>Kaggle IDs (no order):</b> optimo, theoviel, and iafoss`,
            button: [
                {
                    label: 'Notebook',
                    link: 'https://www.kaggle.com/code/theoviel/hubmap-final-methodology-submission/notebook'
                },
                {
                    label: 'Presentation',
                    link: 'https://www.youtube.com/watch?v=uqyFPMnOB2g&list=PLuJUUASr8daMaDBweSiSbPXgzwUX_xoX_&index=3'
                }
            ]
        }],
        orgImage: 'assets/images/roche.svg',
        userImage: ['assets/images/optimo.svg', 'assets/images/theoviel.svg', 'assets/images/iafoss.svg']
    },
    {
        title: 'Innovation Prize ($10,000)',
        presentedBy: 'Matt Nelson',
        matDivider: true,
        winner: [{
            winner: 'deepflash2',
            kaggleId: `<b>Kaggle IDs (no order):</b> matjes, theudas, maddonix`,
            button: [
                {
                    label: 'Notebook',
                    link: 'https://www.kaggle.com/matjes/hubmap-deepflash2-judge-price'
                },
                {
                    label: 'Presentation',
                    link: 'https://www.youtube.com/watch?v=w6LpUDkXL0Q&list=PLuJUUASr8daMaDBweSiSbPXgzwUX_xoX_&index=2'
                }
            ]
        }],
        orgImage: 'assets/images/innovation_prize.svg',
        userImage: ['assets/images/matjes.svg', 'assets/images/theudas.svg', 'assets/images/maddonix.svg'],
    },
    {
        title: 'Diversity Prize ($3,000)',
        presentedBy: 'Rahcyne Omatete',
        matDivider: true,
        winner: [{
            winner: '404!',
            kaggleId: `<b>Kaggle IDs (no order):</b> Gavi_sr, Sophie, tpmeli, and dskswu`,
            button: [
                {
                    label: 'Notebook',
                    link: 'https://www.kaggle.com/dskswu/team-404-hubmap-presentation-v1-1'
                },
                {
                    label: 'Presentation',
                    link: 'https://www.youtube.com/watch?v=pZTjzaP12Sc&list=PLuJUUASr8daMaDBweSiSbPXgzwUX_xoX_&index=5'
                }
            ]
        }],
        orgImage: 'assets/images/diversity_prize.svg',
        userImage: ['assets/images/Gavi_sr.svg', 'assets/images/Sophie.svg', 'assets/images/tpmeli.svg', 'assets/images/dskswu.svg'],
    }
]

export const kudosData: PrizeCard[] = [
    {
        title: 'Team Players!',
        matDivider: false,
        winner: [{
            winner: 'Efforless Neuron',
            kaggleId: `<b>Kaggle IDs (no order):</b> chienhsianghung, ulrich07, raphaelensae, faisalalsrheed, and salimkhazem`,
            button: [
                {
                    label: 'Presentation',
                    link: 'https://www.youtube.com/watch?v=DnX7vU4Caqg&list=PLuJUUASr8daMaDBweSiSbPXgzwUX_xoX_&index=6'
                }
            ]
        }],
        userImage: ['assets/images/chienhsianghung.svg', 'assets/images/ulrich07.svg', 'assets/images/raphaelensae.svg', 'assets/images/faisalalsrheed.svg', 'assets/images/salimkhazem.svg'],
    },
    {
        title: 'Community Hero',
        matDivider: false,
        winner: [{
            winner: 'Wojtek Rosa',
            kaggleId: `<b>Kaggle ID:</b> wrrosa`
        }],
        userImage: ['assets/images/wrrosa.svg'],
    },
    {
        title: 'Most Entertaining',
        matDivider: false,
        winner: [{
            winner: 'deepflash2',
            kaggleId: `<b>Kaggle IDs (no order):</b> matjes, theudas, maddonix`,
            button: [
                {
                    label: 'Notebook',
                    link: 'https://www.kaggle.com/matjes/hubmap-deepflash2-judge-price'
                },
                {
                    label: 'Presentation',
                    link: 'https://www.youtube.com/watch?v=w6LpUDkXL0Q&list=PLuJUUASr8daMaDBweSiSbPXgzwUX_xoX_&index=2'
                }
            ]
        }],
        userImage: ['assets/images/matjes.svg', 'assets/images/theudas.svg', 'assets/images/maddonix.svg'],
    }
]

export const datasetsData: PageDataItems[] = [
    {
        heading: 'Datasets',
        descriptions: `All datasets have been published as a HuBMAP 
        <a href="https://portal.hubmapconsortium.org/browse/collection/4964d24bbc6668a72c4cbb5e0393a6bc" target="_blank">collection</a>. 
        Here is the link to the <a href="https://hubmapconsortium.github.io/ccf/dld/kaggle-metadata.csv" target="_blank">metadata file</a> and below are the direct links to all 30 datasets:`
    }
]