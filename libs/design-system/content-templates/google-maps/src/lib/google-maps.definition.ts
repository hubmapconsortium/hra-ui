import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsSchema } from './google-maps.schema';

/** Content template definition for GoogleMapsComponent */
export const GoogleMapsDef: ContentTemplateDef<GoogleMapsComponent> = {
  component: GoogleMapsComponent,
  spec: GoogleMapsSchema,
};
