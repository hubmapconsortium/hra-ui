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

/** Type for different resource objects  */
export type ResourceEntry = { type: string } | MarkdownResource;

/** Type for resource registry model */
export type ResourceRegistryModel = Record<ResourceId, ResourceEntry>;
