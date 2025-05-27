import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { YouTubePlayer } from '@angular/youtube-player';
import { YouTubePlayerSchema } from './youtube-player.schema';

/** Content template definition for YoutubePlayer */
export const YouTubePlayerDef: ContentTemplateDef<YouTubePlayer> = {
  component: YouTubePlayer,
  spec: YouTubePlayerSchema,
};
