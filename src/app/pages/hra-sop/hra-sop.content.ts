import { PageDataItems } from "src/app/components/page-data/page-data";
import { PageHeaderItems } from "src/app/components/page-header/page-header-items";

export const pageHeader: PageHeaderItems[] = [
  {
    image: 'assets/images/hra-sop.svg',
    title: 'Human Reference Atlas Standard Operating Procedures',
    subtitle: 'Standard operating procedures for Human Reference Atlas construction, visualization, and usage'
  }
]

export const overviewData: PageDataItems[] = [
  {
    heading: 'Overview', descriptions: `Overview Goes Here`
  }
]

export const acknowledgmentsData: PageDataItems[] = [
  {
    heading: 'Acknowledgments',
    descriptions: `The CCF work is under active development by the Indiana University Mapping Component as part of the HuBMAP HIVE effort with expert input by the HuBMAP team.
    Data was provided by the HuBMAP Tissue Mapping Centers. This research is funded by the NIH Common Fund through the
    Office of Strategic Coordination/Office of the NIH Director under award OT2OD026671, by the NIDDK Kidney Precision
    Medicine Project grant U2CDK114886, and the NIH National Institute of Allergy and Infectious Diseases (NIAID),
    Department of Health and Human Services under BCBB Support Services Contract HHSN316201300006W/HHSN27200002`
  }
]
