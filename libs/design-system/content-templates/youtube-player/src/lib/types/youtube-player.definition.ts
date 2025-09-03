import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { HraYoutubePlayerComponent } from '../youtube-player.component';
import { YouTubePlayerSchema } from './youtube-player.schema';

/** Content template definition for YoutubePlayer */
export const YouTubePlayerDef: ContentTemplateDef<HraYoutubePlayerComponent> = {
  component: HraYoutubePlayerComponent,
  spec: YouTubePlayerSchema,
};
