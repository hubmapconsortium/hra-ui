/**
 * All organs that will eventually be displayed in the app
 */
export const ALL_POSSIBLE_ORGANS = [
  {
    src: 'app:skin',
    organ: 'Skin',
    name: 'Skin',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002097',
  },
  {
    src: 'app:brain',
    organ: 'Brain',
    name: 'Brain',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000955',
  },
  {
    disabled: true,
    src: 'app:lymph-nodes',
    organ: 'Lymph Node',
    name: 'Lymph Node',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000029',
  },
  {
    src: 'app:lymph-nodes',
    organ: 'Lymph Node',
    name: 'Lymph Node',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002509',
  },
  {
    disabled: true,
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000970',
  },
  {
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004548',
  },
  {
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004549',
  },
  {
    disabled: true,
    src: 'app:fallopian-tube-left',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0003889',
  },
  {
    src: 'app:fallopian-tube-left',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001303',
  },
  {
    src: 'app:fallopian-tube-right',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001302',
  },
  {
    src: 'app:heart',
    organ: 'Heart',
    name: 'Heart',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000948',
  },
  {
    disabled: true,
    src: 'app:kidney-left',
    organ: 'Kidney',
    name: 'Kidney, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002113',
  },
  {
    src: 'app:kidney-left',
    organ: 'Kidney',
    name: 'Kidney, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004538',
  },
  {
    src: 'app:kidney-right',
    organ: 'Kidney',
    name: 'Kidney, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004539',
  },
  {
    disabled: true,
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001465',
  },
  {
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma24978',
  },
  {
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma24977',
  },
  {
    src: 'app:liver',
    organ: 'Liver',
    name: 'Liver',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002107',
  },
  {
    disabled: true,
    src: 'app:lung',
    organ: 'Lung',
    name: 'Lungs',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002048',
  },
  {
    src: 'app:lung',
    organ: 'Lung',
    name: 'Lungs',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001004',
  },
  {
    disabled: true,
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001911',
  },
  {
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma57991',
  },
  {
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma57987',
  },
  {
    src: 'app:manubrium',
    organ: 'Manubrium',
    name: 'Manubrium',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_2001553',
  },
  {
    disabled: true,
    src: 'app:ovary-left',
    organ: 'Ovary',
    name: 'Ovary, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000992',
  },
  {
    disabled: true,
    src: 'app:ovary-left',
    organ: 'Ovary',
    name: 'Ovary, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma7214',
  },
  {
    src: 'app:ovary-left',
    organ: 'Ovary',
    name: 'Ovary, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0002119',
  },
  {
    disabled: true,
    src: 'app:ovary-right',
    organ: 'Ovary',
    name: 'Ovary, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma7213',
  },
  {
    src: 'app:ovary-right',
    organ: 'Ovary',
    name: 'Ovary, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0002118',
  },
  {
    src: 'app:larynx',
    organ: 'Larynx',
    name: 'Larynx',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001737',
  },
  {
    src: 'app:main-bronchus',
    organ: 'Main Bronchus',
    name: 'Main Bronchus',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002182',
  },
  {
    disabled: true,
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002373',
  },
  {
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma54974',
  },
  {
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma54973',
  },
  {
    src: 'app:pancreas',
    organ: 'Pancreas',
    name: 'Pancreas',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001264',
  },
  {
    src: 'app:pelvis-f',
    organ: 'Pelvis',
    name: 'Pelvis',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001270',
  },
  {
    src: 'app:placenta',
    organ: 'Placenta',
    name: 'Placenta',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001987',
  },
  {
    src: 'app:prostate',
    organ: 'Prostate',
    name: 'Prostate',
    hasSex: false,
    sex: 'male',
    id: 'http://purl.obolibrary.org/obo/UBERON_0002367',
    disabled: true,
  },
  {
    src: 'app:prostate',
    organ: 'Prostate',
    name: 'Prostate',
    hasSex: false,
    sex: 'male',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000079',
  },
  {
    src: 'app:renal-pelvis-left',
    organ: 'Renal Pelvis',
    name: 'Renal Pelvis, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0018115',
  },
  {
    src: 'app:renal-pelvis-right',
    organ: 'Renal Pelvis',
    name: 'Renal Pelvis, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0018116',
  },
  {
    src: 'app:small-intestine',
    organ: 'Small Intestine',
    name: 'Small Intestine',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002108',
  },
  {
    src: 'app:sternum',
    organ: 'Sternum',
    name: 'Sternum',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000975',
  },
  {
    src: 'app:large-intestine',
    organ: 'Large Intestine',
    name: 'Large Intestine',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000059',
  },
  {
    src: 'app:spinal-cord',
    organ: 'Spinal Cord',
    name: 'Spinal Cord',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002240',
  },
  {
    src: 'app:spleen',
    organ: 'Spleen',
    name: 'Spleen',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002106',
  },
  {
    src: 'app:thymus',
    organ: 'Thymus',
    name: 'Thymus',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002370',
  },
  {
    src: 'app:trachea',
    organ: 'Trachea',
    name: 'Trachea',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0003126',
  },
  {
    disabled: true,
    src: 'app:ureter-left',
    organ: 'Ureter',
    name: 'Ureter, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000056',
  },
  {
    src: 'app:ureter-left',
    organ: 'Ureter',
    name: 'Ureter, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001223',
  },
  {
    src: 'app:ureter-right',
    organ: 'Ureter',
    name: 'Ureter, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001222',
  },
  {
    src: 'app:bladder',
    organ: 'Urinary Bladder',
    name: 'Urinary Bladder',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001255',
  },
  {
    src: 'app:uterus',
    organ: 'Uterus',
    name: 'Uterus',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000995',
  },
  {
    src: 'app:vasculature-thick',
    organ: 'Blood Vasculature',
    name: 'Blood Vasculature',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004537',
  },
  {
    disabled: true,
    src: 'app:vasculature-thick',
    organ: 'Blood Vasculature',
    name: 'Blood Vasculature',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002049',
  },
].sort((a, b) => a.name.localeCompare(b.name)) as OrganInfo[];

/**
 * All organs which have not been disabled
 */
export const ALL_ORGANS = ALL_POSSIBLE_ORGANS.filter((organ) => organ.disabled !== true);

/**
 * Contains the organ name and url of the icon svg
 */
export interface OrganInfo {
  /**
   * Used to fetch the url of the organ icon
   */
  src: string;

  /**
   * Label to display for the organ
   */
  name: string;

  /**
   * Name of the organ (to help match organs with left / right)
   */
  organ: string;

  /**
   * True if the icon is disabled
   */
  disabled?: boolean;

  /**
   * Used for paired organs
   */
  side?: 'left' | 'right';

  /**
   * True if applies to both sexes
   */
  hasSex?: boolean;

  /**
   * Used for single sex only organs
   */
  sex?: 'male' | 'female';

  /**
   * UBERON id for the organ
   */
  id?: string;

  numResults?: number;
}
