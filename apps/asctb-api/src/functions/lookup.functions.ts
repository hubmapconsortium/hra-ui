import { OntologyCode } from './../models/lookup.model';

/** Creates an asct api url */
export function buildASCTApiUrl(id: string): string {
  return `http://www.ebi.ac.uk/ols/api/terms/findByIdAndIsDefiningOntology?obo_id=${id}`;
}

/** Creates an hgnc api url */
export function buildHGNCApiUrl(id: string): string {
  return `https://rest.genenames.org/fetch/hgnc_id/${id}`;
}

/** Creates an uniprot link */
export function buildUniprotLink(id: string): string {
  return `https://www.uniprot.org/uniprot/${id}`;
}

/** Creates an entrez link */
export function buildEntrezLink(id: string): string {
  return `https://www.ncbi.nlm.nih.gov/gene/?term=${id}`;
}

/** Creates an hgnc link */
export function buildHGNCLink(id: string): string {
  return `http://identifiers.org/hgnc/${id}`;
}

/**
 * Fix a poorly constructed ontology id
 *
 * @param id Original id
 * @returns A proper id
 */
export function fixOntologyId(id: string): string {
  if (id?.toLowerCase() === 'n/a' || id?.toLowerCase() === 'not found') {
    return '';
  }
  // Fix IDs from ASCT+B Tables. Ideally, these changes are made up stream for next release and no transformation is necessary
  if (id.startsWith('fma') && /[0-9]/.test(id[3])) {
    id = 'fma:' + id.slice(3);
  }
  id = id.replace('_', ':').replace('::', ':').replace(': ', ':').replace('fmaid:', 'FMA:').split(' ')[0].toUpperCase();
  id = id
    .split(':')
    .map((s: string) => s.trim())
    .join(':');
  id = id.replace(/[^A-Z0-9_:]+/g, '');
  return id;
}

/**
 * Attepmts to guess the iri corresponding to an id
 *
 * @param id Id to guess iri for
 * @returns An iri if possible
 */
export function guessIri(id: string): string | undefined {
  const [code, idNumber] = id.split(':');
  if (idNumber) {
    switch (code) {
      case OntologyCode.CL:
        return `http://purl.obolibrary.org/obo/CL_${idNumber}`;
      case OntologyCode.FMA:
        return `http://purl.org/sig/ont/fma/fma${idNumber}`;
      case OntologyCode.HGNC:
        return `http://identifiers.org/hgnc/${idNumber}`;
      case OntologyCode.LMHA:
        return `http://purl.obolibrary.org/obo/LMHA_${idNumber}`;
      case OntologyCode.UBERON:
        return `http://purl.obolibrary.org/obo/UBERON_${idNumber}`;
      default:
        return undefined;
    }
  } else {
    return undefined;
  }
}
