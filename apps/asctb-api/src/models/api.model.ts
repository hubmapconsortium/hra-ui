/** Metadata delimiter */
export const DELIMETER = ';';
/** Metadata title row index */
export const TITLE_ROW_INDEX = 0;

/** Metadta fields */
export const metadataArrayFields = [
  'author_names',
  'author_orcids',
  'reviewer_names',
  'reviewer_orcids',
  'general_publications',
];
/** Metadata name map */
export const metadataNameMap: Record<string, string> = {
  'Author Name(s):': 'author_names',
  'Author ORCID(s):': 'author_orcids',
  'Reviewer(s):': 'reviewer_names',
  'Reviewer ORCID(s):': 'reviewer_orcids',
  'General Publication(s):': 'general_publications',
  'Data DOI:': 'data_doi',
  'Date:': 'date',
  'Version Number:': 'version',
};
/** Biomarker types */
export enum BM_TYPE {
  G = 'gene',
  P = 'protein',
  BL = 'lipids',
  BM = 'metabolites',
  BF = 'proteoforms',
}

/** Omap organ mapping */
export const OMAP_ORGAN = {
  'https://doi.org/10.48539/HBM467.LRKZ.884': {
    name: 'skin',
    rdfs_label: 'skin of body',
    id: 'UBERON:0002097',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM577.SBHH.454': {
    name: 'skin',
    rdfs_label: 'skin of body',
    id: 'UBERON:0002097',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM674.DJKV.876': {
    name: 'lymph node',
    rdfs_label: 'lymph node',
    id: 'UBERON: 0000029',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM794.CSBJ.358': {
    name: 'intestine',
    rdfs_label: 'intestine',
    id: 'UBERON:0000160',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM568.RMZB.377': {
    name: 'kidney',
    rdfs_label: 'kidney',
    id: 'UBERON:0002113',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM495.QBSV.777': {
    name: 'liver',
    rdfs_label: 'liver',
    id: 'UBERON:0002107',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM868.XLTM.922': {
    name: 'Pancreas',
    rdfs_label: 'Pancreas',
    id: 'UBERON:0001264',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  'https://doi.org/10.48539/HBM972.WHPW.455': {
    name: 'Lung',
    rdfs_label: 'Lung',
    id: 'UBERON:0002048',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
  default: {
    name: 'unknown',
    rdfs_label: 'unknown',
    id: 'unknown',
    setBiomarkerProperties: undefined,
    isValid: undefined,
  },
} as unknown as Record<string, Structure>;

/** Protein presence options */
export enum PROTEIN_PRESENCE {
  POS = 'Positive',
  NEG = 'Negative',
  UNKNOWN = 'Unknown',
  INTERMEDIATE = 'Intermediate',
}

/** Asct header first column */
export const ASCT_HEADER_FIRST_COLUMN = 'AS/1';
/** Legacy omap header first column */
export const LEGACY_OMAP_HEADER_FIRST_COLUMN = 'uniprot_accession_number';
/** Omap header first columnc */
export const OMAP_HEADER_FIRST_COLUMN = 'omap_id';

/** Array name mapping */
export const arrayNameMap: Record<string, arrayNameType> = {
  AS: 'anatomical_structures',
  CT: 'cell_types',
  FTU: 'ftu_types',
  BG: 'biomarkers_gene',
  BP: 'biomarkers_protein',
  BGENE: 'biomarkers_gene',
  BPROTEIN: 'biomarkers_protein',
  REF: 'references',
  BLIPID: 'biomarkers_lipids',
  BMETABOLITES: 'biomarkers_meta',
  BPROTEOFORM: 'biomarkers_prot',
  BL: 'biomarkers_lipids',
  BM: 'biomarkers_meta',
  BF: 'biomarkers_prot',
};

/** Array name types */
export type arrayNameType =
  | 'anatomical_structures'
  | 'cell_types'
  | 'ftu_types'
  | 'biomarkers_gene'
  | 'biomarkers_protein'
  | 'biomarkers_lipids'
  | 'biomarkers_meta'
  | 'biomarkers_prot'
  | 'references';

/** Object field mapping */
export const objectFieldMap: Record<string, string> = {
  ID: 'id',
  LABEL: 'rdfs_label',
  DOI: 'doi',
  NOTES: 'notes',
  NOTE: 'notes',
};

/**
 * Creates a named object
 *
 * @param name Name
 * @param structureType Structure type
 * @returns A `Reference` or `Structure`
 */
export function createObject(name: string, structureType: string): Structure | Reference {
  switch (structureType) {
    case 'REF':
      return new Reference(name);
    case 'AS':
    default:
      return new Structure(name, structureType);
  }
}

/** Reference object */
export class Reference {
  /** Id */
  id?: string;
  /** Doi */
  doi?: string;
  /** Additional notes */
  notes?: string;

  /** Initializes the class */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Checks whether the state of this object is valid
   *
   * @returns true if this is valid, false otherwise
   */
  isValid(): boolean {
    return !!this.id || !!this.doi || !!this.notes;
  }
}

/** Structure */
export class Structure {
  /** Name */
  name: string;
  /** Id */
  id = '';
  /** Rdfs label */
  rdfs_label = '';
  /** Biomarker type */
  b_type?: BM_TYPE;
  /** Protein presence */
  proteinPresence?: PROTEIN_PRESENCE;
  /** Additional notes */
  notes?: string;

  /** Initializes the class */
  constructor(name: string, structureType: string) {
    this.name = name;
    this.setBiomarkerProperties(structureType, name);
  }

  /**
   * Updates this with a new name and biomarker type
   *
   * @param structureType Biomarker type
   * @param name Name
   */
  setBiomarkerProperties(structureType: string, name: string): void {
    if (structureType === 'BGENE' || structureType === 'BG') {
      this.b_type = BM_TYPE.G;
    }
    if (structureType === 'BPROTEIN' || structureType === 'BP') {
      name = this.name = name.replace('Protein', '').trim();
      const hasPos = name.endsWith('+');
      const hasNeg = name.endsWith('-');
      const hasInt = name.endsWith('+/-');

      if (hasPos) {
        this.name = name.slice(0, -1);
        this.proteinPresence = PROTEIN_PRESENCE.POS;
      } else if (hasInt) {
        this.name = name.slice(0, -3).trim();
        this.proteinPresence = PROTEIN_PRESENCE.INTERMEDIATE;
      } else if (hasNeg) {
        this.name = name.slice(0, -1);
        this.proteinPresence = PROTEIN_PRESENCE.NEG;
      } else {
        this.proteinPresence = PROTEIN_PRESENCE.UNKNOWN;
      }
      this.b_type = BM_TYPE.P;
    }
    if (structureType === 'BLIPID' || structureType === 'BL') {
      this.b_type = BM_TYPE.BL;
    }
    if (structureType === 'BMETABOLITES' || structureType === 'BM') {
      this.b_type = BM_TYPE.BM;
    }
    if (structureType === 'BPROTEOFORM' || structureType === 'BF') {
      this.b_type = BM_TYPE.BF;
    }
  }

  /**
   * Checks if this object is in a valid state
   *
   * @returns true if this is valid, false otherwise
   */
  isValid(): boolean {
    return !!this.id || !!this.name || !!this.rdfs_label;
  }
}

/** Row */
export class Row {
  /** Anatomical structures */
  anatomical_structures: Array<Structure> = [];
  /** Cell types */
  cell_types: Array<Structure> = [];
  /** All biomarkers */
  biomarkers: Array<Structure> = [];
  /** Protein biomarkers */
  biomarkers_protein: Array<Structure> = [];
  /** Gene biomarkers */
  biomarkers_gene: Array<Structure> = [];
  /** Lipid biomarkers */
  biomarkers_lipids: Array<Structure> = [];
  /** Meta biomarkers */
  biomarkers_meta: Array<Structure> = [];
  /** Prot biomarkers */
  biomarkers_prot: Array<Structure> = [];
  /** Ftu types */
  ftu_types: Array<Structure> = [];
  /** References */
  references: Reference[] = [];

  /**
   * Initializes the row
   *
   * @param rowNumber Row number
   */
  constructor(public rowNumber: number) {}

  /** Removes all invalid structures and combines all biomarkers */
  finalize(): void {
    this.anatomical_structures = this.anatomical_structures.filter((s) => s.isValid());
    this.cell_types = this.cell_types.filter((s) => s.isValid());
    this.ftu_types = this.ftu_types.filter((s) => s.isValid());
    this.references = this.references.filter((s) => s.isValid());

    this.biomarkers_gene = this.biomarkers_gene.filter((s) => s.isValid());
    this.biomarkers_protein = this.biomarkers_protein.filter((s) => s.isValid());
    this.biomarkers_lipids = this.biomarkers_lipids.filter((s) => s.isValid());
    this.biomarkers_meta = this.biomarkers_meta.filter((s) => s.isValid());
    this.biomarkers_prot = this.biomarkers_prot.filter((s) => s.isValid());

    this.biomarkers = [
      ...this.biomarkers_gene,
      ...this.biomarkers_protein,
      ...this.biomarkers_lipids,
      ...this.biomarkers_meta,
      ...this.biomarkers_prot,
    ];
  }
}

// Copied interface out of @types/express-fileupload to avoid type casting failure
/** Uploaded file information */
export interface UploadedFile {
  /** file name */
  name: string;
  /** A function to move the file elsewhere on your server */
  mv(path: string, callback: (err: unknown) => void): void;
  /** A function to move the file elsewhere on your server */
  mv(path: string): Promise<void>;
  /** Encoding type of the file */
  encoding: string;
  /** The mimetype of your file */
  mimetype: string;
  /** A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true. */
  data: Buffer;
  /** A path to the temporary file in case useTempFiles option was set to true. */
  tempFilePath: string;
  /** A boolean that represents if the file is over the size limit */
  truncated: boolean;
  /** Uploaded size in bytes */
  size: number;
  /** MD5 checksum of the uploaded file */
  md5: string;
}
