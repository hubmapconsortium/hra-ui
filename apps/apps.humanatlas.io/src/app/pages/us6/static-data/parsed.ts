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

export const ORGANS = OrgansSchema.parse(RAW_ORGANS).organs;
export const COMPONENT_DEFS = ComponentDefsSchema.parse(RAW_COMPONENT_DEFS).defs;

export const EMBED_TEMPLATES: Record<ComponentDefId, string> = {
  ['rui' as ComponentDefId]: ruiEmbedTemplate,
  ['eui' as ComponentDefId]: euiEmbedTemplate,
  ['eui-organ-information' as ComponentDefId]: euiOrganInfoEmbedTemplate,
  ['eui-3d-organ-viewer' as ComponentDefId]: eui3dOrganViewer,
  ['ftu-ui' as ComponentDefId]: ftuUiEmbedTemplate,
  ['ftu-ui-small' as ComponentDefId]: ftuUiSmallEmbedTemplate,
  ['ftu-medical-illustration' as ComponentDefId]: ftuMedicalIllustrationEmbedTemplate,
};

export const DOC_LINKS: Record<ComponentDefId, string> = {
  ['rui' as ComponentDefId]: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/ccf-rui/EMBEDDING.md',
  ['eui' as ComponentDefId]: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/ccf-eui/EMBEDDING.md',
  ['eui-organ-information' as ComponentDefId]: '',
  ['eui-3d-organ-viewer' as ComponentDefId]:
    'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/ccf-body-ui-wc/README.md',
  ['ftu-ui' as ComponentDefId]: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/ftu-ui/EMBEDDING.md',
  ['ftu-ui-small' as ComponentDefId]:
    'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/ftu-ui-small-wc/EMBEDDING.md',
  ['ftu-medical-illustration' as ComponentDefId]:
    'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/medical-illustration/EMBEDDING.md',
};
