import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { ReleaseNotesVersionSelectorComponent } from './release-notes-version-selector.component';
import { ReleaseNotesVersionSelectorSchema } from './release-notes-version-selector.schema';

/** Definition for Release Notes Version Selector Component */
export const ReleaseNotesVersionSelectorDef: ContentTemplateDef<ReleaseNotesVersionSelectorComponent> = {
  component: ReleaseNotesVersionSelectorComponent,
  spec: ReleaseNotesVersionSelectorSchema,
};
