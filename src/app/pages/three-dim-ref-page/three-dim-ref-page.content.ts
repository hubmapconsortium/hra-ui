import { ChooseVersion } from "src/app/components/choose-version/choose-version";
import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { SopLinks } from "src/app/components/sop-links/sop-links";
import { VersionOrgans } from "src/app/components/two-dim-image/two-dim-image";

export const headerData: PageHeaderItems[] = [
    {
        image: 'assets/images/three_dim_library.png',
        title: 'CCF 3D Reference Object Library',
        subtitle: 'Open source 3D organs crosswalked to ASCT+B tables used for tissue registration and exploration'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: "Overview",
        descriptions: `The CCF 3D Reference Object Library provides anatomically correct reference organs. The organs are developed by a specialist in 3D medical illustration and approved by organ experts.
        <br><br>Initially, reference objects are created using data from the Visible Human male and female datasets provided by the National Library of Medicine. The male dataset comprises 1,871 cross-sections at 1mm intervals for both CT and anatomical images at a resolution of 4,096 pixels by 2,700 pixels. The female data set has the same characteristics as the Visible Human Male but axial anatomical images were obtained at 0.33 mm intervals resulting in 5,189 cross-section anatomical images. The male was white, 180.3 cm (71 inch) tall, 199-pound and was 38 years old. The female was white, 171.2 cm (67.4 inch) tall, obese, and 59 years old.
        <br><br>On March 12, 2021, a total of 11 reference organs became available in GLB format. Each organ can be viewed and explored using free web browsers such as Babylon.js. Screenshots and major properties of the nested reference organ objects are given in the table below.
        <br><br>For selected organs, 3D extraction site objects are provided. Some extraction sites resemble geometric objects (e.g., cuboids for heart) while others take the shape of one or more whole or partial anatomical structures (e.g., in spleen). The 3D extraction sites do not restrict registration to specific regions, instead they provide “expert defined landmarks” to help guide tissue registration. The extraction site objects are also used for automatic semantic annotation of tissue samples via collision detection during registration.`
    }
]

export const versionData: ChooseVersion[] = [
    { release: '1st HRA Release (v1.0), March 2021', version: '1' },
    { release: '2nd HRA Release (v1.1), December 2021', version: '2' },
    { release: '3nd HRA Release (v1.2), June 2022', version: '3' },
]

export const sopData: SopLinks[] = [
    {
        urls: 'SOP: 3D Reference Object Approval',
        href: 'https://doi.org/10.5281/zenodo.5944196',
    },
    {
        urls: 'SOP: Using 3D Reference Objects',
        href: 'https://doi.org/10.5281/zenodo.5639651'
    },
    {
        urls: 'SOP: Using the CCF Registration User Interface',
        href: 'https://doi.org/10.5281/zenodo.5575776',
    },
    {
        urls: 'SOP: Assigning RUI Data to Multiple Tissue Blocks',
        href: 'https://doi.org/10.5281/zenodo.5746143'
    }
]
export const termsOfUseData: PageDataItems[] = [
    {
        heading: 'Terms of Use',
        descriptions: `HuBMAP data are supplied with no warranties, expressed or implied, including without limitation, any warranty of merchantability or fitness for a particular purpose or non-infringement. 
        No warranty with respect to the HuBMAP infrastructure is provided, including without limitation, any uptime warranty. 
        The Parties make no representations that the use of the data will not infringe any patent or proprietary rights of third parties.`
    },
    {
        heading: 'License',
        descriptions: `All CCF 3D reference objects are released under 
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Attribution 4.0 International (CC BY 4.0)</a>.`
    },
    {
        heading: 'Citation',
        descriptions: `If you use the data files v1.0 release, please cite this effort as follows:
        Browne, K., Cross, L. E., Herr II, B. W., Record, L, Quardokus, E, Bueckle, A., Börner, K. (2021). HuBMAP CCF 3D Reference Object Library. https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html. Accessed on March 12, 2021.
        <br><br>
        If you use the data files v1.1 release, please cite this effort as follows:
        Browne, K., Cross, L. E., Herr II, B. W., Record, L, Quardokus, E, Bueckle, A., Börner, K. (2021). HuBMAP CCF 3D Reference Object Library. https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html. Accessed on December 1, 2021.
        <br><br>
        If you use the data files v1.2 release, please cite this effort as follows:
        Browne,K., Schlehlein, H., Herr II, B. W., Quardokus, E, Bueckle, A., Börner, K. (2022). HuBMAP CCF 3D Reference Object Library. https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html. Accessed on May 06, 2022. ce Object Library.`
    },
    {
        heading: 'Reference Organs',
        descriptions: `<a href="https://github.com/hubmapconsortium/ccf-releases/tree/main/v1.2/models" target="_blank">Download v1.2 organs</a> in GLB format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-releases/tree/main/v1.1/models" target="_blank">Download v1.1 organs</a> in GLB format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-releases/tree/main/v1.0/models" target="_blank">Download v1.0 organs</a> in GLB format.
        <br><br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Female/V1.2/Extraction%20Sites" target="_blank">Download v1.2 extraction sites for female</a> in GLB and FBX format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Female/V1.1/Extraction%20Sites" target="_blank">Download v1.1 extraction sites for female</a> in GLB and FBX format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Female/V1.0/Extraction%20Sites" target="_blank">Download v1.0 extraction sites for female</a> in GLB and FBX format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Male/V1.2/Extraction%20Sites" target="_blank">Download v1.2 extraction sites for male</a> in GLB and FBX format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Male/V1.1/Extraction%20Sites" target="_blank">Download v1.1 extraction sites for male</a> in GLB and FBX format.<br>
        <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library/tree/master/VH_Male/V1/Extraction%20Sites" target="_blank">Download v1.0 extraction sites for male</a> in GLB and FBX format.<br><br>
        <a href="https://doi.org/10.48539/HBM858.DNFV.736" target="_blank">ASCT-B 3D models mapping v1.2</a> in CSV format.<br>
        <a href="https://doi.org/10.48539/HBM858.DNFV.736" target="_blank">ASCT-B 3D models mapping v1.1</a> in CSV format.<br>
        <a href="https://doi.org/10.48539/HBM263.FWKR.367" target="_blank">ASCT-B 3D models mapping v1.0</a> in CSV format.<br>
        `
    },
    {
        heading: 'Acknowledgements',
        descriptions: `The 3D Models were created by Kristen Browne for the 3D Printing and Biovisualization program operated by OCICB, NIAID.
        This research has been funded in part by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671, by the NIDDK Kidney Precision Medicine Project grant U2CDK114886, and NIAID under BCBB Support Services Contract HHSN316201300006W/HHSN27200002 to MSC, Inc; U.S.<br><br>
        The male colon is from a white 55-year-old and was provided by Arie Kaufman, Stony Brook University.<br><br> The brain is from a 34-year-old female donor and was published by the Allen Human Reference Atlas–3D, 2020. Jim Gee, University of Pennsylvania converted the NII file into GLB. Amy Bernard, Allen Institute assisted in mapping the 141 anatomical structures to the brain ASCT+B table.`
    },
    {
        heading: 'References',
        descriptions: `Börner, Katy, Sarah A. Teichmann, Ellen M. Quardokus, James C. Gee, Kristen Browne, David Osumi-Sutherland, Bruce W. Herr, et al. 2021. “<a href="https://doi.org/10.1038/s41556-021-00788-6" target="_blank">Anatomical Structures, Cell Types and Biomarkers of the Human Reference Atlas.</a>” Nature Cell Biology 23 (11): 1117-28.<br><br>
        Ding, Song-Lin, Joshua J. Royall, Susan M. Sunkin, Lydia Ng, Benjamin A. C. Facer, Phil Lesnar, Angie Guillozet-Bongaarts, Bergen McMurray, Aaron Szafer, Tim A. Dolbeare, Allison Stevens, Lee Tirrell, Thomas Benner, Shiella Caldejon, Rachel A. Dalley, Nick Dee, Christopher Lau, Julie Nyhus, Melissa Reding, Zackery L. Riley, David Sandman, Elaine Shen, Andre van der Kouwe, Ani Varjabedian, Michelle Wright, Lilla Zöllei, Chinh Dang, James A. Knowles, Christof Koch, John W. Phillips, Nenad Sestan, Paul Wohnoutka, H. Ronald Zielke, John G. Hohrmann, Allan R. Jones, Amy Bernard, Michael J. Hawrylycz, Patrick R. Hof, Bruce Fischl, and Ed S. Lein. 2016. 
        "<a href="https://pubmed.ncbi.nlm.nih.gov/27418273/" target="_blank">Comprehensive Cellular-Resolution Atlas of the Adult Human Brain.</a>" Journal of Comparative Neurology 524 (16): 3127-348. doi:10.1002/cne.24080.<br><br>
        Ding, Song-Lin, Joshua J. Royall, Susan M. Sunkin, Benjamin A.C. Facer, Phil Lesnar, Amy Bernard, Lydia Ng, and Ed S. Lein. 2020. <a href="https://community.brain-map.org/t/allen-human-reference-atlas-3d-2020-new/405" target="_blank">Allen Human Reference Atlas - 3D, 2020</a>. RRID:SCR_017764, version 1.0.0.<br><br>
        U.S. National Library of Medicine. 2021. <a href="https://www.nlm.nih.gov/databases/download/vhp.html" target="_blank"><i>Visible Human Project Data</i></a>.`
    }
]

export const threeDimOrganInfo: VersionOrgans[] = [
    {
        version: '1',
        organData: [
            {
                name: 'Kidney',
                image: 'assets/images/kidney.jpg',
                tissueData: [
                    {
                        name: 'Nephron',
                        image: 'assets/images/nephron.png',
                        expandedImage: 'assets/images/nephron_dialog.png',
                        url: 'https://doi.org/10.48539/HBM489.SGQZ.655'
                    },
                    {
                        name: 'Renal Corpuscle',
                        image: 'assets/images/renal_corpuscle.png',
                        expandedImage: 'assets/images/renal_corpuscle.png',
                        url: 'https://doi.org/10.48539/HBM395.LVFN.656'
                    }
                ]
            },
            {
                name: 'Liver',
                image: 'assets/images/liver.jpg',
                tissueData: [{
                    name: 'Liver Lobule',
                    image: 'assets/images/liver_lobule.png',
                    expandedImage: 'assets/images/liver_lobule.png',
                    url: 'https://doi.org/10.48539/HBM692.KXMT.939'
                }]
            },
            {
                name: 'Large Intestine',
                image: 'assets/images/large_intestine.jpg',
                tissueData: [{
                    name: 'Crypt of Lieberkuhn',
                    image: 'assets/images/crypt_lieberkuhn_large_intestine.png',
                    expandedImage: 'assets/images/crypt_lieberkuhn_large_intestine.png',
                    url: 'https://doi.org/10.48539/HBM373.JRGS.542'
                }]
            },
            {
                name: 'Lungs',
                image: 'assets/images/lungs.jpg',
                tissueData: [{
                    name: 'Pulmonary Alveolus',
                    image: 'assets/images/pulmonary_alveolus_lung.png',
                    expandedImage: 'assets/images/pulmonary_alveolus_lung.png',
                    url: 'https://doi.org/10.48539/HBM626.KZVN.453'
                }]
            },
            {
                name: 'Pancreas',
                image: 'assets/images/pancreas.jpg',
                tissueData: [{
                    name: 'Islets of Langerhans',
                    image: 'assets/images/islets_langerhans_pancreas.png',
                    expandedImage: 'assets/images/islets_langerhans_pancreas.png',
                    url: 'https://doi.org/10.48539/HBM344.CNNH.639'
                }]
            },
            {
                name: 'Prostate',
                image: 'assets/images/prostate.jpg',
                tissueData: [{
                    name: 'Prostate Glandular Acinus',
                    image: 'assets/images/prostate_glandular_acinus_prostate.png',
                    expandedImage: 'assets/images/prostate_glandular_acinus_prostate.png',
                    url: 'https://doi.org/10.48539/HBM523.TDCH.662'
                }]
            },
            {
                name: 'Thymus',
                image: 'assets/images/thymus.jpg',
                tissueData: [{
                    name: 'Thymus Lobule',
                    image: 'assets/images/thymus_lobule_thymus.png',
                    expandedImage: 'assets/images/thymus_lobule_thymus.png',
                    url: 'https://doi.org/10.48539/HBM794.PKVD.274'
                }]
            }
        ]
    },
    {
        version: '2',
        organData: [
            {
                name: 'Kidney',
                image: 'assets/images/kidney.jpg',
                tissueData: [
                    {
                        name: 'Nephron',
                        image: 'assets/images/nephron.png',
                        expandedImage: 'assets/images/nephron_dialog.png',
                        url: 'https://doi.org/10.48539/HBM489.SGQZ.655'
                    },
                    {
                        name: 'Renal Corpuscle',
                        image: 'assets/images/renal_corpuscle.png',
                        expandedImage: 'assets/images/renal_corpuscle.png',
                        url: 'https://doi.org/10.48539/HBM395.LVFN.656'
                    }
                ]
            },
            {
                name: 'Liver',
                image: 'assets/images/liver.jpg',
                tissueData: [{
                    name: 'Liver Lobule',
                    image: 'assets/images/liver_lobule.png',
                    expandedImage: 'assets/images/liver_lobule.png',
                    url: 'https://doi.org/10.48539/HBM692.KXMT.939'
                }]
            }
        ]
    }
]