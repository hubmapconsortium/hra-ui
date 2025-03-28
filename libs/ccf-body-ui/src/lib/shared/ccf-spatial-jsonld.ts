import { JsonLdObj } from 'jsonld/jsonld-spec';

/**
 * This interface defines the structure of a spatial placement JSON-LD object, which represents the placement information of a spatial entity.
 */
export interface SpatialPlacementJsonLd extends JsonLdObj {
  /** The JSON-LD context. */
  '@context'?: string;
  /** A unique identifier for the placement object. */
  '@id': string;
  /** The type of the placement object. */
  '@type': string;
  /** The source of the placement object. */
  source?: string;
  /** The target of the placement object. */
  target: string;
  /** The date of the placement object. */
  placement_date: string;
  /** The scaling factor along the x-axis. */
  x_scaling: number;
  /** The scaling factor along the y-axis. */
  y_scaling: number;
  /** The scaling factor along the z-axis. */
  z_scaling: number;
  /** The units of the scaling factors. */
  scaling_units: string;
  /** The rotation angle around the x-axis. */
  x_rotation: number;
  /** The rotation angle around the y-axis. */
  y_rotation: number;
  /** The rotation angle around the z-axis. */
  z_rotation: number;
  /** The units of the rotation angles. */
  rotation_units: string;
  /** The translation distance along the x-axis. */
  x_translation: number;
  /** The translation distance along the y-axis. */
  y_translation: number;
  /** The translation distance along the z-axis. */
  z_translation: number;
  /** The units of the translation distances. */
  translation_units: string;
}

/**
 * This interface defines the structure of a spatial object reference JSON-LD object, which represents a reference to a spatial object.
 */
export interface SpatialObjectReferenceJsonLd extends JsonLdObj {
  /** A unique identifier for the object reference. */
  '@id': string;
  /** The type of the object reference. */
  '@type': string;
  /** The file associated with the object reference. */
  file: string;
  /** The format of the file. */
  file_format: string;
  /** The placement information of the object, defined by the SpatialPlacementJsonLd interface. */
  placement: SpatialPlacementJsonLd;
}

/**
 * This interface defines the structure of a spatial entity JSON-LD object, which represents a spatial entity with various attributes and metadata.
 */
export interface SpatialEntityJsonLd extends JsonLdObj {
  /** The JSON-LD context. */
  '@context': string;
  /** A unique identifier for the entity. */
  '@id': string;
  /** The type of the entity, which can be a string or an array of strings. */
  '@type': string | string[];
  /** The label of the entity. */
  label: string;
  /** A comment or description of the entity. */
  comment: string;
  /** The creator of the entity. */
  creator: string;
  /** The first name of the creator. */
  creator_first_name: string;
  /** The middle name of the creator. */
  creator_middle_name?: string;
  /** The last name of the creator. */
  creator_last_name: string;
  /** The email address of the creator. */
  creator_email?: string;
  /** The ORCID identifier of the creator. */
  creator_orcid?: string;
  /** The creation date of the entity. */
  creation_date: string;
  /** The date when the entity was last updated. */
  updated_date: string;
  /** An array of annotations related to the entity. */
  ccf_annotations: string[];
  /** The entity that this entity represents. */
  representation_of: string;
  /** The reference organ associated with the entity. */
  reference_organ: string;
  /** The extraction set associated with the entity. */
  extraction_set: string;
  /** The sex of the entity, either 'Male' or 'Female'. */
  sex?: 'Male' | 'Female';
  /** The side of the entity, either 'Left' or 'Right'. */
  side?: 'Left' | 'Right';
  /** The RUI rank of the entity. */
  rui_rank: number;
  /** The thickness of the tissue block slices. */
  slice_thickness: number;
  /** The number of tissue block slices. */
  slice_count: number;
  /** The dimension along the x-axis. */
  x_dimension: number;
  /** The dimension along the y-axis. */
  y_dimension: number;
  /** The dimension along the z-axis. */
  z_dimension: number;
  /** The units of the dimensions. */
  dimension_units: string;
  /** The spatial object reference, defined by the SpatialObjectReferenceJsonLd interface. */
  object: SpatialObjectReferenceJsonLd;
  /** The placement information, which can be a single SpatialPlacementJsonLd object or an array of such objects. */
  placement: SpatialPlacementJsonLd | SpatialPlacementJsonLd[];
  /** The DOI of the publication associated with the entity. */
  publication_doi?: string;
  /** The consortium associated with the entity.*/
  consortium?: string;
}
