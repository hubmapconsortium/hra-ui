import ComponentDefsSchema, { ComponentDefId } from '../types/component-defs.schema';
import OrgansSchema from '../types/organs.schema';
import RAW_COMPONENT_DEFS from './component-defs.json';
import RAW_ORGANS from './organs.json';

import ruiEmbedTemplate from './templates/rui.html';
import euiEmbedTemplate from './templates/eui.html';
import euiOrganInfoEmbedTemplate from './templates/eui-organ-info.html';
import eui3dOrganViewer from './templates/eui-3d-organ-viewer.html';
import ftuUiEmbedTemplate from './templates/ftu-ui.html';
import ftuUiSmallEmbedTemplate from './templates/ftu-ui-small.html';
import ftuMedicalIllustrationEmbedTemplate from './templates/ftu-medical-illustration.html';

/**
 * Parsed organs from Organs json file
 */
export const ORGANS = OrgansSchema.parse(RAW_ORGANS).organs;
/**
 * Parsed component defs from ComponentDefs json file
 */
export const COMPONENT_DEFS = ComponentDefsSchema.parse(RAW_COMPONENT_DEFS).defs;

/**
 * Embed templates for different component defs
 */
export const EMBED_TEMPLATES: Record<ComponentDefId, string> = {
  ['rui' as ComponentDefId]: ruiEmbedTemplate,
  ['eui' as ComponentDefId]: euiEmbedTemplate,
  ['eui-organ-information' as ComponentDefId]: euiOrganInfoEmbedTemplate,
  ['eui-3d-organ-viewer' as ComponentDefId]: eui3dOrganViewer,
  ['ftu-ui' as ComponentDefId]: ftuUiEmbedTemplate,
  ['ftu-ui-small' as ComponentDefId]: ftuUiSmallEmbedTemplate,
  ['ftu-medical-illustration' as ComponentDefId]: ftuMedicalIllustrationEmbedTemplate,
};
