import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ProfileCardComponent } from '../profile-card.component';
import { ProfileCardSchema } from './profile-card.schema';

/** ProfileCard content template definition */
export const ProfileCardDef: ContentTemplateDef<ProfileCardComponent> = {
  component: ProfileCardComponent,
  spec: ProfileCardSchema,
};
