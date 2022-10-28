import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

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
        <br><br>Organizers: Andrea de Souza (Eli Lilly and Company), Katy Börner (Indiana University), Deepika Vuppalanchi (Precision Value Health), Christine Drury (InnovDigi/Conference Ventures), and Sandeep Allam (STLogics).
        <br><br>Support Team: Richard Holland, Marcos Novaes, and Addison Howard (Google), Leah Scherschel, Lisel Record, Ellen Quardokus, and Yingnan Ju (Indiana University), Jeffrey Spraggins and Heath Patterson (Vanderbilt University), and Arkan Abadi (Eli Lilly).
        <br><br>Kaggle Sponsors: Google HCLS, Roche, Deloitte, Deerfield Healthcare, Pistoia Alliance, CAS - American Chemical Society, Maven Wave.
        <br><br>Kaggle Judges: Zorina Galis (NIH), Thomas Fuchs (Paige.ai, Mount Sinai), Matt Nelson (Deerfield Healthcare), Amy Bernard (Allen Institute), Maigan Brusko (University of Florida), John Marioni (EMBL-EBI, UK), Blue Lake (UC San Diego), David Van Valen (CalTech), and Alex Wolf (Cellarity).
        <br><br>Funders: This work has been funded in part by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671 and VU HuBMAP under award 1U54DK120058-01.
        `
    }
]