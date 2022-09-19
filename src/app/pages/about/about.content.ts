import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

export const pageHeaderData: PageHeaderItems[] = [
    {
        title: "About",
        subtitle: "Learn about the HuBMAP Infrastructure, Visualization, & Engagement (HIVE) Mapping Component Indiana University (MC-IU) Team",
        image: 'assets/images/about.png'
    }
]

export const pageData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `The ultimate goal of the HIVE Mapping effort is to develop a common coordinate framework (CCF) for the healthy human body. 
        This framework will support cataloging different types of individual cells, understanding the functions of and relationships between those cell types, and modeling their individual and collective function.`
    },
    {
        heading: 'History',
        descriptions: `During the initial four years of HuBMAP, the MC-IU team has built many elements of the CCF. We co-organized the construction of ASCT+B Tables and implemented a CCF Ontology. 
        We collaborated with NIAID at NIH on the design of a 3D Reference Object Library. Lastly, we developed three interactive user interfaces. The CCF ASCT+B Reporter supports the authoring and interactive review of ASCT+B Tables. 
        The CCF Registration User Interface (RUI) supports uniform tissue data registration across organs and labs. The CCF Exploration User Interface (EUI) supports exploration of semantically and spatially explicit data—from the whole body to the single cell level. 
        For an introduction to HuBMAP goals, data, and code visit the Visible Human MOOC (VHMOOC).`
    },
    {
        heading: 'References',
        descriptions: `Börner, Katy, Andreas D. Bueckle, and Michael Ginda. 2019."<a href="https://cns.iu.edu/docs/publications/2019-borner-pnas.pdf" target="_blank">
        Data Visualization Literacy: Definitions, Conceptual Frameworks, Exercises, and Assessments.</a>" PNAS116 (6): 1857-1864. doi:10.1073/pnas.1807180116.
        <br><br>Börner, Katy, Ellen M. Quardokus, Bruce W. Herr II, Leonard E. Cross, Elizabeth G. Record, Yingnan Ju, Andreas D. Bueckle, James P. Sluka, Jonathan C. Silverstein, Kristen M. Browne, Sanjay Jain, Clive H. Wasserfall, Marda L. Jorgensen, Jeffrey M. Spraggins, Nathan H. Patterson, Mark A. Musen, and Griffin M. Weber. 2020. 
        "<a href="https://arxiv.org/abs/2007.14474" target="_blank">Construction and Usage of a Human Body Common Coordinate Framework Comprising Clinical, Semantic, and Spatial Ontologies.</a>" arXiv:2007.14474v1.
        <br><br>Börner, Katy, Sarah A Teichmann, Ellen M Quardokus, James Gee, Kristen Browne, David Osumi-Sutherland, Bruce W Herr II, Andreas Bueckle, Hrishikesh Paul, Muzlifah A Haniffa, Laura Jardine, Amy Bernard, Song-Lin Ding, Jeremy A Miller, Shin Lin, Marc Halushka, Avinash Boppana, Teri A Longacre, John Hickey, Yiing Lin, M Todd Valerius, Yongqun He, Gloria Pryhuber, Xin Sun, Marda Jorgensen, Andrea J Radtke, Clive Wasserfall, Fiona Ginty, Jonhan Ho, Joel Sunshine, Rebecca T Beuschel, Maigan Brusko, Sujin Lee, Rajeev Malhotra, Sanjay Jain, and Griffin Weber. 2021. 
        "<a href="https://cns.iu.edu/docs/publications/2021-Borner-ASCT+B_of_the_HRA.pdf" target="_blank">Anatomical structures, cell types and biomarkers of the Human Reference Atlas.</a>" Nature Cell Biology 23: 1117-1128. doi: 10.1038/s41556-021-00788-6.
        <br><br>Börner, Katy, William Rouse, Paul Trunfio, and H. Eugene Stanley. 2018. "<a href="https://cns.iu.edu/docs/publications/2018-borner-forecasting-innovations.pdf">Forecasting Innovations in Science, Technology, and Education.</a>" PNAS 115 (50): 12573-12581. doi:10.1073/pnas.1818750115.
        <br><br>Ginda, Michael, Michael C. Richey, Mark Cousino, and Katy Börner. 2019. "<a href="https://cns.iu.edu/docs/publications/2019-journal.pone.0215964.pdf" target="_blank">Visualizing Learner Engagement, Performance, and Trajectories to Evaluate and Optimize Online Course Design.<a>" PLOS One 14 (5): e0215964. doi:10.1371/journal.pone.0215964.
        <br><br>Snyder, Michael P., Shin Lin, Amanda Posgai, Mark Atkinson, Aviv Regev, Jennifer Rood, Orit Rozenblatt-Rosen, Leslie Gaffney, Anna Hupalowska, Rahul Satija, Nils Gehlenborg, Jay Shendure, Julia Laskin, Pehr Harbury, Nicholas A. Nystrom, Jonathan C. Silverstein, Ziv Bar-Joseph, Kun Zhang, Katy Börner, Yiing Lin, Richard Conroy, Dena Procaccini, Ananda L. Roy, Ajay Pillai, Marishka Brown, and Zorina S. Galis. 2019. 
        "<a href="https://cns.iu.edu/docs/publications/2019-Snyder-HuBMAP.pdf" target="_blank">The Human Body at Cellular Resolution: The NIH Human Biomolecular Atlas Program.</a>" Nature 574: 187-192. doi:10.1038/s41586-019-1629-x.
        <br><br>Weber, Griffin M, Yingnan Ju, and Katy Börner. 2020. "<a href="https://cns.iu.edu/docs/publications/2020-Weber-Considerations.pdf" target="_blank">Considerations for Using the Vasculature as a Coordinate System to Map All the Cells in the Human Body.</a>" Frontiers in Cardiovascular Medicine 7 (29). doi:10.3389/fcvm.2020.00029.
        <br><br>Bueckle, Andreas, Kilian Buehling, Patrick C. Shih, and Katy Börner. 2022. “<a href="https://www.frontiersin.org/articles/10.3389/frvir.2021.727344/full" target="_blank">Optimizing Performance and Satisfaction in Matching and Movement Tasks in Virtual Reality with Interventions Using the Data Visualization Literacy Framework.</a>” Frontiers in Virtual Reality, vol. 2. doi: 10.3389/frvir.2021.727344.
        <br><br>Bueckle, Andreas, Kristen M. Browne, Bruce W. Herr II, Katy Börner. 2022. “<a href="https://osf.io/z9gm3/" target="_blank">The CCF Organ VR Gallery.</a>” OSF preprint. doi: 10.31219/osf.io/z9gm3.
        <br><br>Börner, Katy, Andreas Bueckle, Bruce W. Herr II, Leonard E. Cross, Ellen M. Quardokus, Elizabeth G. Record, Yingnan Ju, Jonathan C. Silverstein, Kristen M. Browne, Sanjay Jain, Clive H. Wasserfall, Marda L. Jorgensen, Jeffrey M. Spraggins, Nathan H. Patterson, Griffin M. Weber. 2021. 
        “<a href="https://www.figma.com/exit?url=https%3A%2F%2Fwww.biorxiv.org%2Fcontent%2F10.1101%2F2021.12.30.474265v1" target="_blank">Tissue Registration and Exploration User Interfaces in support of a Human Reference Atlas.</a>” biorXiv preprint bioRxiv:2021.12.30.474265. doi: 10.1101/2021.12.30.474265.
        <br><br>Bueckle, Andreas, Kilian Buehling, Patrick C. Shih, and Katy Börner. 2021. “<a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0258103" target="_blank">3D Virtual Reality vs. 2D Desktop Registration User Interface Comparison.</a>” PLOS One, vol. 16, no. 10. doi: 10.1371/journal.pone.0258103.`
    },
    {
        heading: 'Presentations',
        descriptions: `November 18, 2020: <a href="https://hubmapconsortium.github.io/ccf/dld/2020.11.18-CZI-Borner.pdf" target="_blank"><i>Human Reference Atlas: Anatomical Structures, Cell Types & Biomarkers</i></a> at 
        <a href="https://chanzuckerberg.com/science/programs-resources/single-cell-biology/seednetworks/" target="_blank">Chan Zuckerberg Initiative (CZI) Seed Networks 2020 Annual Meeting</a>, Virtual Event.
        <br><br>May 19, 2020: <a href="https://hubmapconsortium.github.io/ccf/dld/2020.05.19-Borner-HuBMAPposter.pdf" target="_blank"><i>The Human Body Atlas: High-Resolution, Functional Mapping of Voxel, Vector, and Meta Datasets</i></a> at HuBMAP Virtual Annual Meeting, Washington, DC.
        <br><br>March 17, 2020: <a href="https://hubmapconsortium.github.io/ccf/dld/2020.03.17-MC-IU.KPMP-Talk.pdf" target="_blank"><i>Harmonizing KPMP/HuBMAP Data: Developing Novel Common Coordinate Framework User Interfaces</i></a> at KPMP Virtual Meeting, Washington, DC.`
    },
    {
        heading: 'Acknowledgments',
        descriptions: `We deeply value close collaborations with the HuBMAP TMCs and other HIVE teams. This research has been funded in part by the NIH Common Fund OTA 20-005 under award OT2 OD030545 and through the Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671, 
        by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, and the NIH NIAID, Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002. 
        The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the official policies, either expressed or implied, of the NIH. `
    }
]