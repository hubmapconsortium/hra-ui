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
    { release: '3rd Release, June 2021', version: '1.2' }
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

export const organInfo: VersionOrgans[] = [
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
                        expandedImage: 'assets/images/nephron.svg',
                        url: 'https://doi.org/10.48539/HBM489.SGQZ.655',
                        svg: 'assets/images/nephron.svg'
                    },
                    {
                        name: 'Renal Corpuscle',
                        image: 'assets/images/renal_corpuscle.png',
                        expandedImage: 'assets/images/renal_corpuscle.svg',
                        url: 'https://doi.org/10.48539/HBM395.LVFN.656',
                        svg: 'assets/images/renal_corpuscle.svg'
                    }
                ]
            },
            {
                name: 'Large Intestine',
                image: 'assets/images/large_intestine.svg',
                tissueData: [{
                    name: 'Crypt of Lieberkuhn',
                    image: 'assets/images/crypt_lieberkuhn_large_intestine.png',
                    expandedImage: 'assets/images/crypt_lieberkuhn_large_intestine.svg',
                    url: 'https://doi.org/10.48539/HBM373.JRGS.542',
                    svg: 'assets/images/crypt_lieberkuhn_large_intestine.svg'
                }]
            },
            {
                name: 'Liver',
                image: 'assets/images/liver.svg',
                tissueData: [{
                    name: 'Liver Lobule',
                    image: 'assets/images/liver_lobule.png',
                    expandedImage: 'assets/images/liver_lobule.svg',
                    url: 'https://doi.org/10.48539/HBM692.KXMT.939',
                    svg: 'assets/images/liver_lobule.svg',
                }]
            },
            {
                name: 'Lungs',
                image: 'assets/images/lungs.svg',
                tissueData: [{
                    name: 'Pulmonary Alveolus',
                    image: 'assets/images/pulmonary_alveolus_lung.png',
                    expandedImage: 'assets/images/pulmonary_alveolus_lung.svg',
                    url: 'https://doi.org/10.48539/HBM626.KZVN.453',
                    svg: 'assets/images/pulmonary_alveolus_lung.svg',
                }]
            },
            {
                name: 'Pancreas',
                image: 'assets/images/pancreas.svg',
                tissueData: [{
                    name: 'Islets of Langerhans',
                    image: 'assets/images/islets_langerhans_pancreas.png',
                    expandedImage: 'assets/images/islets_langerhans_pancreas.svg',
                    url: 'https://doi.org/10.48539/HBM344.CNNH.639',
                    svg: 'assets/images/islets_langerhans_pancreas.svg',
                }]
            },
            {
                name: 'Prostate',
                image: 'assets/images/prostate.svg',
                tissueData: [{
                    name: 'Prostate Glandular Acinus',
                    image: 'assets/images/prostate_glandular_acinus_prostate.png',
                    expandedImage: 'assets/images/prostate_glandular_acinus_prostate.svg',
                    url: 'https://doi.org/10.48539/HBM523.TDCH.662',
                    svg: 'assets/images/prostate_glandular_acinus_prostate.svg',
                }]
            },
            {
                name: 'Thymus',
                image: 'assets/images/thymus.svg',
                tissueData: [{
                    name: 'Thymus Lobule',
                    image: 'assets/images/thymus_lobule_thymus.png',
                    expandedImage: 'assets/images/thymus_lobule_thymus.svg',
                    url: 'https://doi.org/10.48539/HBM794.PKVD.274',
                    svg: 'assets/images/thymus_lobule_thymus.svg',
                }]
            }
        ]
    }
]