import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";
import { UseButton } from "src/app/components/use-button/use-button";

export const backButton: UseButton = 
    {
        text: 'Back to OMAPs',
        route: 'omap'
    }


export const faqPageHeader: PageHeaderItems[] = [
    {
        image: 'assets/images/omap_faq.svg',
        title: 'Frequently Asked Questions (FAQs) for Organ Mapping Antibody Panels (OMAPs)',
        subtitle: ''
    }
]

export const tableOfContents: PageDataItems[] = [
    {
        heading: 'Table of Contents',
        descriptions: `<ol>
        <li>General Questions</li>
        <ol type="a">
            <li><a href="faq/omap#what-is-an-omap">What is an OMAP?</a></li>
            <li><a href="faq/omap#how-are-omaps-different-from-other-validated-antibody-resources">How are OMAPs different from other validated antibody resources?</a></li>
            <li><a href="faq/omap#which-multiplexed-antibody-based-imaging-techniques-are-supported">Which multiplexed antibody-based imaging techniques are supported?</a></li>
            <li><a href="faq/omap#are-omaps-just-for-healthy-human-tissues">Are OMAPs just for healthy human tissues?</a></li>
            <li><a href="faq/omap#how-many-antibodies-are-included-in-an-omap">How many antibodies are included in an OMAP?</a></li>
            <li><a href="faq/omap#how-do-i-cite-an-existing-omap">How do I cite an existing OMAP?</a></li>
            <li><a href="faq/omap#how-do-i-cite-omaps-overall">How do I cite OMAPs overall?</a></li>
        </ol>
        <li>Authoring OMAPs</li>
        <ol type="a">
            <li><a href="faq/omap#how-do-i-author-an-omap">How do I author an OMAP?</a></li>
            <li><a href="faq/omap#must-i-be-a-member-of-the-human-biomolecular-atlas-program-hubmap-to-author-an-omap">Must I be a member of the Human Biomolecular Atlas Program (HuBMAP) to author an OMAP?</a></li>
            <li><a href="faq/omap#is-there-a-working-group-i-may-join-to-support-authoring-an-omap">Is there a working group I may join to support authoring an OMAP?</a></li>
            <li><a href="faq/omap#how-do-i-report-imaging-methods-that-employ-oligo-conjugated-antibodies-and-fluorescent-reporters-for-marker-detection">How do I report imaging methods that employ oligo-conjugated antibodies and fluorescent reporters for marker detection?</a></li>
            <li><a href="faq/omap#should-i-include-antigen-retrieval-conditions-for-omaps-designed-for-formalin-fixed-paraffin-embedded-ffpe-specimens">Should I include antigen retrieval conditions for OMAPs designed for Formalin Fixed Paraffin Embedded (FFPE) specimens?</a></li>
            <li><a href="faq/omap#how-do-i-report-the-use-of-unconjugated-primaries-detected-with-secondary-antibodies">How do I report the use of unconjugated primaries detected with secondary antibodies?</a></li>
            <li><a href="faq/omap#how-do-i-report-antibodies-used-for-non-cyclic-non-fluorescent-based-methods-such-as-imaging-mass-cytometry">How do I report antibodies used for non-cyclic, non-fluorescent based methods such as imaging mass cytometry?</a></li>
            <li><a href="faq/omap#how-do-i-report-the-use-of-custom-reagents-conjugated-in-house-or-purchased-from-a-vendor">How do I report the use of custom reagents conjugated in house or purchased from a vendor?</a></li>
            <li><a href="faq/omap#should-i-include-an-omap-in-my-manuscript-that-uses-multiplexed-antibody-based-imaging">Should I include an OMAP in my manuscript that uses multiplexed antibody-based imaging?</a></li>
            <li><a href="faq/omap#as-an-omap-author-who-has-published-my-omap-with-a-peer-reviewed-journal-why-should-i-also-publish-my-omap-on-the-hubmap-hra-portal">As an OMAP author who has published my OMAP with a peer reviewed journal, why should I also publish my OMAP on the HuBMAP HRA Portal?</a></li>
            <li><a href="faq/omap#do-omaps-need-to-accompany-published-work-featuring-multiplexed-antibody-based-imaging">Do OMAPs need to accompany published work featuring multiplexed antibody-based imaging?</a></li>
            <li><a href="faq/omap#can-i-make-changes-to-an-existing-omap">Can I make changes to an existing OMAP?</a></li>
            <li><a href="faq/omap#can-i-expand-upon-an-existing-omap">Can I expand upon an existing OMAP?</a></li>
            <li><a href="faq/omap#are-omap-revisions-versioned">Are OMAP revisions versioned?</a></li>
         </ol>
        </ol>`
    }
]

export const generalOmapQuestions: PageDataItems[] = [
    {
        heading: 'General OMAP Questions',
        descriptions: `
        <div id="what-is-an-omap">
        <strong>What is an OMAP?</strong>
        <br>OMAPs are combinations of antibodies that define cell populations, cell states, and anatomical structures reproducibly in diverse human tissues using multiplexed antibody-based imaging. Each OMAP is tailored to a tissue and/or organ of interest (e.g., kidney, lymph node), 
        multiplexed imaging method (e.g., IBEX, CODEX), and tissue preservation method (e.g., fixed frozen, FFPE). The OMAP initiative emerged from the Affinity Reagents Working Group within the Human BioMolecular Atlas Program (HuBMAP) 
        Consortium and parallel efforts in the field of cytometry to construct peer reviewed Optimized Multicolor Immunofluorescence Panels (OMIPs).
        </div>
        <br>
        <div id="how-are-omaps-different-from-other-validated-antibody-resources">
        <strong>How are OMAPs different from other validated antibody resources?</strong>
        <br>OMAPs provide experimental details relevant for their successful application, e.g., tissue preservation method, imaging method, antigen retrieval conditions, and antibody cycling order. 
        The end result is an assembly of expertly curated antibodies that work together in a single tissue section. By analogy, OMAPs are recipes and validated antibodies are ingredients. See for validated antibody resources: 
        the <a href="https://avr.hubmapconsortium.org/" target="_blank">HuBMAP Antibody Validation Report</a> and <a href="https://www.proteinatlas.org/humanproteome/tissue" target="_blank">Human Protein Atlas</a>.
        </div>
        <br>
        <div id="which-multiplexed-antibody-based-imaging-techniques-are-supported">
        <strong>Which multiplexed antibody-based imaging techniques are supported?</strong>
        <br>We will consider OMAPs from 2D and 3D tissue imaging techniques that employ antibodies for protein detection.
        </div>
        <br>
        <div id="are-omaps-just-for-healthy-human-tissues">
        <strong>Are OMAPs just for healthy human tissues?</strong>
        <br>HuBMAP is focused on collecting OMAPs for healthy human tissues in support of a Human Reference Atlas (HRA). However, we will support OMAPs designed for diseased human tissues and consider OMAPs designed for use in experimental animal model systems or organoids.
        </div><br>
        <div id="how-many-antibodies-are-included-in-an-omap">
        <strong>How many antibodies are included in an OMAP?</strong>
        <br>
        An ideal panel will be as comprehensive as possible (40-60 markers or more as technology advances). However, we welcome OMAPs that capture most anatomical structures and cell types present 
        in a tissue and, at a minimum, allow for the characterization of 10 biomarkers in a single tissue section.
        </div><br>
        <div id="how-do-i-cite-an-existing-omap">
        <strong>How do I cite an existing OMAP?</strong>
        <br>Each OMAP has a digital object identifier (DOI) which can be used to cite it found on the <a href="https://hubmapconsortium.github.io/ccf/pages/omap.html" target="_blank">HRA portal</a>. Please cite OMAPs that you used and/or built upon. Thank you!
        </div><br>
        <div id="how-do-i-cite-omaps-overall">
        <strong>How do I cite OMAPs overall?</strong>
        <br>Please cite: Hickey, John W., Elizabeth K. Neumann, Andrea J. Radtke, Jeannie M. Camarillo, Rebecca T. Beuschel, Alexandre Albanese, Elizabeth McDonough, et al. “Spatial Mapping of Protein Composition and Tissue Organization: A Primer for Multiplexed Antibody-Based Imaging.” 
        Nature Methods, November 22, 2021. <a href="https://doi.org/10.1038/s41592-021-01316-y" target="_blank">https://doi.org/10.1038/s41592-021-01316-y</a>.
        </div>`
    }
]

export const authoringOmaps: PageDataItems[] = [
    {
        heading: 'Authoring OMAPs',
        descriptions: `
        <div id="how-do-i-author-an-omap">
        <strong>How do I author an OMAP?</strong>
        <br>Please follow the instructions in the <a href="https://doi.org/10.5281/zenodo.5749882" target="_blank">SOP: Construction of Organ Mapping Antibody Panels for Multiplexed Antibody-Based Imaging of Human Tissues</a>.
        <br>
        All OMAPs require the completion of the following:
        <br><br>(1) an OMAP Table based on standardized criteria specified in Table 2 Metadata Schema for OMAP Table columns in the SOP;
        <br><br>(2) OMAP Description Document that includes a brief description of the OMAP, links to relevant protocols and publications, and details related to antigen retrieval conditions and image analysis workflows, if applicable;
        <br><br>(3) an Antibody Validation Report (AVR) for each antibody included in your OMAP as outlined on the <a href="https://avr.hubmapconsortium.org/" target="_blank">HuBMAP AVR website</a> (HuBMAP membership for Globus login is required); and
        <br><br>(4) a link to dataset(s) employing your OMAP via a public data repository (Zenodo) or the <a href="https://portal.hubmapconsortium.org/" target="_blank">HuBMAP data portal</a>.
        <br><br>Download: <a href="https://hubmapconsortium.github.io/ccf/pages/omap-extras/omap-table-template.xlsx" target="_blank">OMAP Table Template harmonized with Antibody Validation Reports</a>
        <br><br>Download: <a href="https://hubmapconsortium.github.io/ccf/pages/omap-extras/omap-description-document-template.docx" target="_blank">OMAP Description Document Template</a>
        </div><br>
        <div id="must-i-be-a-member-of-the-human-biomolecular-atlas-program-hubmap-to-author-an-omap">
        <strong>Must I be a member of the Human Biomolecular Atlas Program (HuBMAP) to author an OMAP?</strong>
        <br>No, OMAP authors do not need to be affiliated with HuBMAP. Our initial set of OMAPs were authored by members of several consortia, including the Human Protein Atlas (HPA), Human Cell Atlas (HCA), and LungMap. We additionally welcome contributions from industry leaders and technology developers in the spatial biology field.
        </div><br>
        <div id="is-there-a-working-group-i-may-join-to-support-authoring-an-omap">
        <strong>Is there a working group I may join to support authoring an OMAP?</strong>
        <br>Yes, please join the Affinity Reagents Working Group by completing this form to indicate your interest: <a href="https://forms.gle/Y2TVAcadSNn8Tdks7" target="_blank">https://forms.gle/Y2TVAcadSNn8Tdks7</a>.
        </div><br>
        <div id="how-do-i-report-imaging-methods-that-employ-oligo-conjugated-antibodies-and-fluorescent-reporters-for-marker-detection">
        <strong>How do I report imaging methods that employ oligo-conjugated antibodies and fluorescent reporters for marker detection?</strong>
        <br>Please list 'Oligonucleotide' in the conjugate field of the OMAP Table and specify the cycle number and fluorophore, e.g., Cy3, Cy5, etc., in the corresponding fields. 
        For examples, see <a href="https://hubmapconsortium.github.io/ccf/pages/omap.html" target="_blank">CODEX OMAPs for the human intestines, pancreas, and kidney</a>.
        </div><br>
        <div id="should-i-include-antigen-retrieval-conditions-for-omaps-designed-for-formalin-fixed-paraffin-embedded-ffpe-specimens">
        <strong>Should I include antigen retrieval conditions for OMAPs designed for Formalin Fixed Paraffin Embedded (FFPE) specimens?</strong>
        <br>Yes. Please include the method (buffer, temperature, device used for antigen retrieval) in the OMAP Description Document. Please include links to relevant protocols in the OMAP Description Document and OMAP Table. For an example, see 
        <a href="https://hubmapconsortium.github.io/ccf-releases/v1.2/docs/omap/omap-lung-celldive.html" target="_blank">Lung Cell DIVE OMAP</a>.
        </div><br>
        <div id="how-do-i-report-the-use-of-unconjugated-primaries-detected-with-secondary-antibodies">
        <strong>How do I report the use of unconjugated primaries detected with secondary antibodies?</strong>
        <br>For unconjugated primary antibodies, specify which fluorophore in the 'conjugate' field of the OMAP Table and include “secondary detection,” e.g., “Cy3 secondary detection.” For secondary antibodies leave the following fields blank: uniprot_accession_number, HGNC_ID, and target_name. 
        In the 'rationale' field, please state “Used for detection of (insert unconjugated primary antibody here).” For examples, please see
        <a href="https://hubmapconsortium.github.io/ccf-releases/v1.2/docs/omap/omap-skin-celldive.html" target="_blank">Skin Cell DIVE OMAP, specifically UCH-L1 primary antibody and Cy3 secondary antibody</a>.
        </div><br>
        <div id="how-do-i-report-antibodies-used-for-non-cyclic-non-fluorescent-based-methods-such-as-imaging-mass-cytometry">
        <strong>How do I report antibodies used for non-cyclic, non-fluorescent based methods such as imaging mass cytometry?</strong>
        <br>Please list the metal conjugates used in the 'conjugate' field of the OMAP Table and list “1” for cycle number. For example of how to report non-cyclic imaging methods employing metal-labeled antibodies, please see 
        <a href="https://hubmapconsortium.github.io/ccf-releases/v1.2/docs/omap/omap-liver-sim.html" target="_blank">Liver SIMS OMAP</a>.
        </div><br>
        <div id="how-do-i-report-the-use-of-custom-reagents-conjugated-in-house-or-purchased-from-a-vendor">
        <strong>How do I report the use of custom reagents conjugated in house or purchased from a vendor?</strong>
        <br>Please include the catalog number for the unconjugated antibody and specify "unconjugated,” e.g., “338502 (Unconjugated).” Under 'conjugate' field, list the fluorophore, specify “custom,” and add the conjugation kit catalog number, if applicable. For examples, 
        please see <a href="https://hubmapconsortium.github.io/ccf-releases/v1.2/docs/omap/omap-lymph-node-ibex.html" target="_blank">Lymph Node IBEX OMAP</a>. Additionally, please create 
        <a href="https://scicrunch.org/resources" target="_blank">Research Resource Identifiers (RRIDs) for all custom reagents</a>.
        </div><br>
        <div id="should-i-include-an-omap-in-my-manuscript-that-uses-multiplexed-antibody-based-imaging">
        <strong>Should I include an OMAP in my manuscript that uses multiplexed antibody-based imaging?</strong>
        <br>We strongly recommend that you format your antibody panel using the <a href="https://hubmapconsortium.github.io/ccf/pages/omap-extras/omap-table-template.xlsx" target="_blank">OMAP Table Template</a>. 
        The metadata captured by our OMAP template conform to journal reporting standards and are recommended for reproducible multiplexed tissue imaging 
        (<a href="https://doi.org/10.1038/s41592-022-01415-4" target="_blank">Schapiro et al. 2022</a>; <a href="https://doi.org/10.1038/s41592-021-01316-y" target="_blank">Hickey et al. 2021</a>) . 
        This can be included as a supplementary table and/or dataset (CSV) file.
        </div><br>
        <div id="as-an-omap-author-who-has-published-my-omap-with-a-peer-reviewed-journal-why-should-i-also-publish-my-omap-on-the-hubmap-hra-portal">
        <strong>As an OMAP author who has published my OMAP with a peer reviewed journal, why should I also publish my OMAP on the HuBMAP HRA Portal?</strong>
        <br>By publishing OMAPs on the HuBMAP HRA portal, we aim to highlight useful resources that may be missed in the methods and supplementary tables of most manuscripts. 
        We appreciate the time and dedication it takes to construct an OMAP de novo and hope that the HuBMAP HRA Portal will provide greater visibility for your work while helping others with their multiplexed imaging studies.
        </div><br>
        <div id="do-omaps-need-to-accompany-published-work-featuring-multiplexed-antibody-based-imaging">
        <strong>Do OMAPs need to accompany published work featuring multiplexed antibody-based imaging?</strong>
        <br>No, we will accept OMAPs created for ongoing work as long as authors provide links to publicly available protocols, preprints, and datasets, e.g., protocols.io, bioRxiv, and Zenodo. These requirements help facilitate external review of OMAPs and cultivate community confidence in OMAPs. 
        We welcome unpublished OMAPs authored by industry leaders as long as relevant protocols and representative datasets are provided.
        </div><br>
        <div id="can-i-make-changes-to-an-existing-omap">
        <strong>Can I make changes to an existing OMAP?</strong>
        <br>Once published on the HuBMAP HRA Portal we cannot support major changes to an existing OMAP. In certain circumstances, we will accept revised OMAPs that correct minor changes such as typos. 
        However, please carefully review your OMAP before submission. You can expand on your existing OMAP - see Can I expand upon an existing OMAP?
        </div><br>
        <div id="can-i-expand-upon-an-existing-omap">
        <strong>Can I expand upon an existing OMAP?</strong>
        <br>Yes, please cite the original OMAP as a foundation and detail changes in the OMAP Description Document, e.g., additional antibodies included, alternative clones used, changes to the order in which antibodies are applied (if applicable), or conjugation kits used. 
        Additionally, the OMAP may be designed for a different sample type (e.g., FFPE if the original is for fixed frozen) or health state (e.g., aging, malignancy if the original is for a healthy adult). 
        In the latter example, the new OMAP must describe the unique cell types and cell states not covered by the existing OMAP for that tissue or organ. The expanded OMAP will receive a new number ID and DOI.
        </div><br>
        <div id="are-omap-revisions-versioned">
        <strong>Are OMAP revisions versioned?</strong>
        <br>Yes, if an existing OMAP has minor revisions to correct small changes to formatting or typos. Versioning is done through the GitHub repository for Human Reference Atlas (HRA) release. The OMAP maintains its original OMAP ID (Example: OMAP-1).
        </div><br>
        `
    }
]