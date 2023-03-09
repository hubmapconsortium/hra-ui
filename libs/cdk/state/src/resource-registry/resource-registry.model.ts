import { StateContext } from '@ngxs/store';

/** Unqiue identifier for a resource */
export enum ResourceId {}

/** Enum to hold different types of resources */
export enum ResourceType {
  Markdown = 'md',
  Url = 'url',
  Image = 'image',
}

/** type to hold Resource object for markdown */
export interface MarkdownResource {
  /** indicates type for resource */
  type: ResourceType.Markdown;
  /** markdown content */
  markdown: string;
}

/** type to hold resource data for Url */
export interface UrlResource {
  /** indicates type for resource */
  type: ResourceType.Url;
  /** url of the resource*/
  url: string;
}

/** Type for different resource objects  */
export type ResourceEntry = { type: string } | MarkdownResource | UrlResource;

/** Type for resource registry model */
export type ResourceRegistryModel = Record<ResourceId, ResourceEntry>;

/** Context type for action handlers */
export type ResourceRegistryContext = StateContext<ResourceRegistryModel>;
