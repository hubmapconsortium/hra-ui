import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod';

/**
 * A type of Iri which is infered from the IRI
 */
export type Iri = z.infer<typeof IRI>;

/**
 * A type of TissueItem which is infered from the Tissue Item Schema
 */
export type TissueItem = z.infer<typeof TISSUE_ITEM_SCHEMA>;

/**
 * A type of TissueData which is infered from the Tissue Data Schema
 */
export type TissueData = z.infer<typeof TISSUE_DATA_SCHEMA>;

/**
 * A validator that ensures string representing valid URLS, specifically marked as IRI are accepted
 */
export const IRI = z.string().url().brand('IRI');

/**
 * Tissue data schema which defines the type, id, parent, synonmynLabels and children
 */
export const TISSUE_ITEM_SCHEMA = z.object({
  '@type': z.string(),
  '@id': IRI,
  id: IRI,
  parent: IRI.or(z.literal('')),
  label: z.string(),
  synonymLabels: z.string().array(),
  children: IRI.array(),
});

/**
 * A Schema which defines the root and its nodes
 */
export const TISSUE_DATA_SCHEMA = z.object({
  root: IRI,
  nodes: z.record(IRI, TISSUE_ITEM_SCHEMA),
});

/** An abstract class representing a TissueLibraryService*/
@Injectable()
export abstract class TissueLibraryService {
  /** This method returns an Observable of the type of TissueData */
  abstract getTissues(): Observable<TissueData>;
}
