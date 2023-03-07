export enum ResourceId {}

export enum ResourceType {
  Markdown = 'md',
  Url = 'url',
  Image = 'image',
}

export interface MarkdownResource {
  type: ResourceType.Markdown;
  markdown: string;
}

export type ResourceEntry = { type: string } | MarkdownResource;

export type ResourceRegistryModel = Record<ResourceId, ResourceEntry>;
