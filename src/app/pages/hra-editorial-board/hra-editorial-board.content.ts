import { BoardMemberItems } from "src/app/components/board-members/board-members";
import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

export const boardHeader: PageHeaderItems[] = [
  {
    title: 'Human Reference Atlas Editorial Board',
    subtitle: 'A panel of interdisciplinary experts advises on Human Reference Atlas policies, extensions, and applications',
    image: '/assets/images/editorial_board.svg'
  }
]

export const overviewData: PageDataItems[] = [
  {
    heading: 'Overview',
    descriptions: `The HRA editorial is composed of interdisciplinary experts from pathology, surgery, and single cell experimentalists. 
    <br><br>The board will meet virtually every six months—in Nov and May of each year—to<br>
    <ul>
    <li>advise on setting HRA editorial policies,</li>
    <li>suggest future HRA extensions (e.g., crosswalks between ASCT+B tables and Azimuth references or OMAPs),</li>
    <li>select organ-specific editors that invite high quality submissions/revisions of HRA digital objects and administer the peer review of submissions,</li>
    <li>optimize incentive structures (e.g., HRA papers in major journals, awards for highest quality contributions by organ teams/editors/reviewers),</li>
    <li>discuss commercial and other means to sustain the HRA effort beyond current NIH funding, and</li>
    <li>act as ambassadors for the HRA—promoting the HRA at relevant conferences and within key communities.</li>
    </ul>`
  }
]

export const boardMembersData: BoardMemberItems[] = [
  {
    image: 'assets/images/kristin.svg',
    description: '<a href="https://www.broadinstitute.org/bios/kristin-ardlie" target="_blank">Kristin Ardlie</a>, Ph.D., Director of the GTEx Laboratory Data Analysis and Coordination Center at the Broad Institute of MIT and Harvard, where she is an institute scientist. She was responsible for the generation, quality control, and analysis of RNA sequence data for ca. 20,000 tissues to characterize the relationship between genetic variation and the regulation of gene expression across human tissues.'
  },
  {
    image: 'assets/images/fiona_ginty.svg',
    description: `<a href="https://www.ge.com/research/people/fiona-ginty" target="_blank">Fiona Ginty</a>, Ph.D. leads a group of cellular and molecular scientists in Biosciences at GE Research 
    who are inventing new methods and applications for the life sciences industry, including new cell therapy workflows, forensics, synthetic biology and cell imaging.`
  },
  {
    image: 'assets/images/marc_halushka.svg',
    description: `<a href="https://www.hopkinsmedicine.org/profiles/details/marc-halushka" target="_blank">Marc Halushka</a>, M.D., is a professor of pathology and oncology at the Johns Hopkins University School of Medicine. 
    His areas of clinical expertise include cardiovascular pathology, autopsy pathology, and transplant pathology. He is a world-renowned expert on cardiovascular tissue microarrays.`
  },
  {
    image: 'assets/images/matthias_kretzler.svg',
    description: `<a href="https://medicine.umich.edu/dept/dcmb/matthias-kretzler-md" target="_blank">Matthias Kretzler</a>, M.D., Professor of Computational 
    Medicine & Bioinformatics, Professor of Internal Medicine at University of Michigan. He performs research on systems biology of renal diseases, 
    including nephrotic syndrome, diabetes, hypertension and autoimmune diseases of the kidney.`
  },
  {
    image: 'assets/images/louise_laurent.svg',
    description: `<a href="https://obgyn.ucsd.edu/research/labs/laurent/index.html" target="_blank">Louise C. Laurent</a>, M.D., Ph.D. is the 
    Vice Chair for Translational Research and Director of Perinatal Research for the UC San Diego Department of Obstetrics, Gynecology, & Reproductive Sciences and 
    a member of the UC San Diego Embryonic Stem Cell Research Oversight Committee.`
  },
  {
    image: 'assets/images/mike_synder.svg',
    description: `<a href="https://med.stanford.edu/content/sm/snyderlab.html.html" target="_blank">Mike Snyder</a>, Ph.D., Stanford W. Ascherman, Professor in Genetics. 
    He is a leader in the field of functional genomics and proteomics, and one of the major participants of the ENCODE project.`
  }
]

export const acknowledgmentsData: PageDataItems[] = [
  {
    heading: 'Acknowledgments',
    descriptions: 'We thank all members of the 17 consortia that participate in the Human Reference Atlas construction for their expert input and guidance.'
  }
]