import { ChooseVersion } from "src/app/components/choose-version/choose-version";
import { organTabs } from "src/app/components/organ-tabs/organ-tabs";
import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { SopLinks } from "src/app/components/sop-links/sop-links";
import { OrganData } from "src/app/components/two-dim-image/two-dim-image";

export const twoDimHeaderCardDetails: PageHeaderItems[] = [
    {
        image: '../../../assets/images/2dheader.png',
        title: 'CCF 2D Reference Object Library',
        subtitle: 'Open source 2D illustrations of Functional Tissue Units (FTUs) crosswalked to ASCT+B tables used for single cell data exploration'
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
        title: 'Standard Operating Procedures (SOP)',
        urls: [' Style Guide: HuBMAP 2D Functional Tissue Unit (FTU) Illustrations'],
        href: ["https://drive.google.com/file/d/1KoJCEGMTbpX-LOLNoAZhQgSWNYCPTh41/view"]
    }
]

export const versionData: ChooseVersion[] = [
    { release: '1st Release, March 2021'},
    { release: '2nd Release, December 2021'},
  ]

export const termsOfUseData: PageDataItems[] = [
    {
        heading: 'Terms of Use',
        descriptions: `HuBMAP data are supplied with no warranties, expressed or implied, including without limitation, any warranty of merchantability or fitness for a particular purpose or non-infringement. No warranty with respect to the HuBMAP infrastructure is provided, including without limitation, any uptime warranty.
        The Parties make no representations that the use of the data will not infringe any patent or proprietary rights of third parties.`
    },
    {
        heading: 'License',
        descriptions: 'All CCF 2D functional tissue units files are released under <font color="#3d72bf"><a href="https://creativecommons.org/licenses/by/4.0/" target=_blank> Attribution 4.0 International (CC BY 4.0)</a>.</font>'
    },
    {
        heading: 'Citation',
        descriptions: `If you use the data files v1.0 release, please cite this effort as follows:
        <br><br> Browne, K., Cross, L. E., Herr II, B. W., Record, L, Quardokus, E, Bueckle, A., Börner, K. (2021). HuBMAP CCF 3D Reference Object Library.
        <font color = "#3d72bf">
        <a href="https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html" target="_blank">
        https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html.</a></font>
        Accessed on March 12, 2021.
        <br><br>If you use the data files v1.1 release, please cite this effort as follows:
        <br><br>Browne, K., Cross, L. E., Herr II, B. W., Record, L, Quardokus, E, Bueckle, A., Börner, K. (2021). HuBMAP CCF 3D Reference Object Library. 
        <font color = "#3d72bf">
        <a href="https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html" target="_blank">
        https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html.</a></font> Accessed on December 1, 2021.`
    },
    {
        heading: 'Acknowledgments',
        descriptions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
]

export const tabsImages: organTabs[] = [
    {
        organName: 'Kidney',
        imgUrl: '../../../assets/images/kidney.jpg',
        disabled: false
    },
    {
        organName: 'Large Intestine',
        imgUrl: '../../../assets/images/large_intestine.jpg',
        disabled: true
    },
    {
        organName: 'Liver',
        imgUrl: '../../../assets/images/liver.jpg',
        disabled: false
    },
    {
        organName: 'Lungs',
        imgUrl: '../../../assets/images/lungs.jpg',
        disabled: true
    },
    {
        organName: 'Pancreas',
        imgUrl: '../../../assets/images/pancreas.jpg',
        disabled: true
    },
    {
        organName: 'Prostate',
        imgUrl: '../../../assets/images/prostate.jpg',
        disabled: true
    },
    {
        organName: 'Thymus',
        imgUrl: '../../../assets/images/thymus.jpg',
        disabled: true
    }
]

export const organInfo: OrganData[] = [
    {
        organName: 'Kidney',
        tissueData: [
            {
                tissueName: 'Nephron',
                tissueImage: '../../../assets/images/nephron.png'
            },
            {
                tissueName: 'Renal Corpuscle',
                tissueImage: '../../../assets/images/renal_corpuscle.png'
            }
        ]
    },
    {
        organName: 'Liver',
        tissueData: [{
            tissueName: 'Liver Lobule',
            tissueImage: '../../../assets/images/liver_lobule.png'
        }]
    }
]