import { ChooseVersion } from "src/app/components/choose-version/choose-version";
import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { SopLinks } from "src/app/components/sop-links/sop-links";
import { VersionOrgans } from "src/app/components/two-dim-image/two-dim-image";

export const twoDimHeaderCardDetails: PageHeaderItems[] = [
    {
        image: 'assets/images/two_dim_header.svg',
        title: 'CCF 2D Functional Tissue Unit (FTU) Illustrations',
        subtitle: 'Open source 2D reference illustrations of Functional Tissue Units (FTUs) mapped to ASCT+B tables used for single cell data exploration'
    }
]

export const overviewData: PageDataItems[] = [
    {
        heading: 'Overview',
        descriptions: `The 2D Functional Tissue Unit Library provides anatomically correct illustrations of functional tissue units (FTUs). The illustrations are developed by a specialist in 2D medical illustration and approved by organ experts.
    <br><br>Illustrations are created using terms from the Anatomical Structures, Cell Types, and Biomarker (ASCT+B) table for each organ. Subject matter experts collaborate on a list of anatomical structures and/or cell types to be included in each FTU. Histology atlases and data sets are consulted for visual reference, and research is undertaken to determine if cell sizes and their relative number and distribution is known for a given FTU. Reasonable estimates are made when placing cells in the illustration and relating them to a scale bar.
    <br><br>A crosswalk table is then created for each FTU illustration, linking the terms in the ASCT+B table to the individual cells in the illustration. This provides an opportunity to add interactive functionality and extends the potential uses for each FTU.
    <br><br>On June, 2022, a total of 8 2D FTUs became available in SVG format. Each illustration can be downloaded and edited using Adobe Illustrator. We encourage users to create additional FTU illustrations using these templates, or to use and share them as desired.`
    }
]

export const sopData: SopLinks[] = [
    {
        urls: ' Style Guide: HuBMAP 2D Functional Tissue Unit (FTU) Illustrations',
        href: "https://zenodo.org/record/6703108/files/SOP_%20Creating%202D%20Illustrations%20for%20Functional%20Tissue%20Units.pdf"
    }
]

export const versionData: ChooseVersion[] = [
    { release: '4th HRA Release (v1.3), December 2022', version: '1.3' },
    { release: '3rd HRA Release (v1.2), June 2022', version: '1.2' }
]

export const termsOfUseData: PageDataItems[] = [
    {
        heading: 'Terms of Use',
        descriptions: `HuBMAP data are supplied with no warranties, expressed or implied, including without limitation, any warranty of merchantability or fitness for a particular purpose or non-infringement. No warranty with respect to the HuBMAP infrastructure is provided, including without limitation, any uptime warranty.
        The Parties make no representations that the use of the data will not infringe any patent or proprietary rights of third parties.`
    },
    {
        heading: 'License',
        descriptions: 'All CCF 2D functional tissue units files are released under <a href="https://creativecommons.org/licenses/by/4.0/" target=_blank> Attribution 4.0 International (CC BY 4.0)</a>.'
    },
    {
        heading: 'Citation',
        descriptions: `If you use the 2D data files in v1.2 release, please cite this effort as follows:
        <br><br> Bajema, R., Bidanta, S., Quardokus, E., Herr II, B. W., Börner, K. 2022.
        <a href="https://hubmapconsortium.github.io/ccf/pages/ccf-2d-reference-library.html/" target="_blank">HuBMAP CCF 2D Reference Object Library</a>. Accessed on May 6, 2022.`
    },
    {
        heading: 'Acknowledgments',
        descriptions: 'The 2D Functional Tissue Unit Library files were created by Rachel Bajema on the MC-IU team. This research has been funded in part by the NIH Common Fund through the Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671 and the NIDDK Kidney Precision Medicine Project grant U2CDK114886.'
    }
]

export const license: PageDataItems[] = [
    {
        heading: 'License',
        descriptions: 'All CCF 2D functional tissue units files are released under <a href="https://creativecommons.org/licenses/by/4.0/" target=_blank> Attribution 4.0 International (CC BY 4.0)</a>.'
    }
]

export const organInfo: VersionOrgans[] = [
    {
        version: '1.3',
        organData: [
            {
                name: 'Kidney',
                image: 'assets/images/kidney.svg',
                tissueData: [
                    {
                        name: 'Ascending Thin Loop Of Henle',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.ai',
                        png: ''
                    },
                    {
                        name: 'Cortical Collecting Duct',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.ai',
                        png: ''
                    },
                    {
                        name: 'Descending Thin Loop Of Henle',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.ai',
                        png: ''
                    },
                    {
                        name: 'Inner Medullary Collecting Duct',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.ai',
                        png: ''
                    },
                    {
                        name: 'Nephron',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-nephron.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.ai',
                        png: ''
                    },
                    {
                        name: 'Outer Medullary Collecting Duct',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.ai',
                        png: ''
                    },
                    {
                        name: 'Renal Corpuscle',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-renal-corpuscle.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.ai',
                        png: ''
                    },
                    {
                        name: 'Thick Ascending Loop Of Henle',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.ai',
                        png: ''
                    }
                ]
            },
            {
                name: 'Large Intestine',
                image: 'assets/images/large_intestine.svg',
                tissueData: [
                    {
                        name: 'Crypt Lieberkuhn',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
                        png: ''
                    }
                ]
            },
            {
                name: 'Liver',
                image: 'assets/images/liver.svg',
                tissueData: [
                    {
                        name: 'Liver Lobule',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-liver-liver-lobule.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver_lobule.ai',
                        png: ''
                    }
                ]
            },
            {
                name: 'Lung',
                image: 'assets/images/lungs.svg',
                tissueData: [
                    {
                        name: 'Bronchial Submucosal Gland',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.ai',
                        png: ''
                    },
                    {
                        name: 'Pulmonary Alveolus',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-lung-pulmonary-alveolus.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.ai',
                        png: ''
                    }
                ]
            },
            {
                name: "Pancreas",
                image: 'assets/images/pancreas.svg',
                tissueData: [
                    {
                        name: 'Intercalated Duct',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-pancreas-intercalated-duct.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.ai',
                        png: ''
                    },
                    {
                        name: 'Pancreatic Acinus',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.ai',
                        png: ''
                    },
                    {
                        name: 'Islets Of Langerhans Pancreas',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-pancreas-islets-langerhans.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.ai',
                        png: ''
                    }
                ]
            },
            {
                name: "Prostate",
                image: 'assets/images/prostate.svg',
                tissueData: [
                    {
                        name: 'Prostate Glandular Acinus',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.ai',
                        png: ''
                    }
                ]
            },
            {
                name: "Skin",
                image: 'assets/images/skin.svg',
                tissueData: [
                    {
                        name: 'Dermal Papilla',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-skin-dermal-papilla.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.ai',
                        png: ''
                    },
                    {
                        name: 'Epidermal Ridge',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-skin-epidermal-ridge.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.ai',
                        png: ''
                    }
                ]
            },
            {
                name: "Thymus",
                image: 'assets/images/thymus.svg',
                tissueData: [
                    {
                        name: 'Thymus Lobule',
                        image: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
                        expandedImage: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
                        url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/docs/2d-ftu/2d-ftu-thymus-thymus-lobule.html',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
                        ai: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.ai'
                    }
                ]
            }
        ]
    },
    {
        version: '1.2',
        organData: [
            {
                name: 'Kidney',
                image: 'assets/images/kidney.svg',
                tissueData: [
                    {
                        name: 'Nephron',
                        image: 'assets/images/nephron.png',
                        expandedImage: 'assets/images/nephron.png',
                        url: 'https://doi.org/10.48539/HBM489.SGQZ.655',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/nephron_kidney.svg',
                        png: 'assets/images/nephron.png'
                    },
                    {
                        name: 'Renal Corpuscle',
                        image: 'assets/images/renal_corpuscle.png',
                        expandedImage: 'assets/images/renal_corpuscle.png',
                        url: 'https://doi.org/10.48539/HBM395.LVFN.656',
                        svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/renal_corpuscle_kidney.svg',
                        png: 'assets/images/renal_corpuscle.png'
                    }
                ]
            },
            {
                name: 'Large Intestine',
                image: 'assets/images/large_intestine.svg',
                tissueData: [{
                    name: 'Crypt of Lieberkuhn',
                    image: 'assets/images/crypt_lieberkuhn_large_intestine.png',
                    expandedImage: 'assets/images/crypt_lieberkuhn_large_intestine.png',
                    url: 'https://doi.org/10.48539/HBM373.JRGS.542',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/crypt_lieberkuhn_large_intestine.svg',
                    png: 'assets/images/large_intestine.png'
                }]
            },
            {
                name: 'Liver',
                image: 'assets/images/liver.svg',
                tissueData: [{
                    name: 'Liver Lobule',
                    image: 'assets/images/liver_lobule.png',
                    expandedImage: 'assets/images/liver_lobule.png',
                    url: 'https://doi.org/10.48539/HBM692.KXMT.939',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/liver_lobule_liver.svg',
                    png: 'assets/images/liver_lobule.png'
                }]
            },
            {
                name: 'Lungs',
                image: 'assets/images/lungs.svg',
                tissueData: [{
                    name: 'Pulmonary Alveolus',
                    image: 'assets/images/pulmonary_alveolus_lung.png',
                    expandedImage: 'assets/images/pulmonary_alveolus_lung.png',
                    url: 'https://doi.org/10.48539/HBM626.KZVN.453',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/pulmonary_alveolus_lung.svg',
                    png: 'assets/images/pulmonary_alveolus_lung.png'
                    
                }]
            },
            {
                name: 'Pancreas',
                image: 'assets/images/pancreas.svg',
                tissueData: [{
                    name: 'Islets of Langerhans',
                    image: 'assets/images/islets_langerhans_pancreas.png',
                    expandedImage: 'assets/images/islets_langerhans_pancreas.png',
                    url: 'https://doi.org/10.48539/HBM344.CNNH.639',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/islets_langerhans_pancreas.svg',
                    png: 'assets/images/islets_langerhans_pancreas.png'
                }]
            },
            {
                name: 'Prostate',
                image: 'assets/images/prostate.svg',
                tissueData: [{
                    name: 'Prostate Glandular Acinus',
                    image: 'assets/images/prostate_glandular_acinus_prostate.png',
                    expandedImage: 'assets/images/prostate_glandular_acinus_prostate.png',
                    url: 'https://doi.org/10.48539/HBM523.TDCH.662',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/prostate_glandular_acinus_prostate.svg',
                    png: 'assets/images/prostate_glandular_acinus_prostate.png'
                }]
            },
            {
                name: 'Thymus',
                image: 'assets/images/thymus.svg',
                tissueData: [{
                    name: 'Thymus Lobule',
                    image: 'assets/images/thymus_lobule_thymus.png',
                    expandedImage: 'assets/images/thymus_lobule_thymus.png',
                    url: 'https://doi.org/10.48539/HBM794.PKVD.274',
                    svg: 'https://hubmapconsortium.github.io/ccf-releases/v1.2/2d-ftu/thymus_lobule_thymus.svg',
                    png: 'assets/images/thymus_lobule_thymus.png'
                }]
            }
        ]
    }
]
