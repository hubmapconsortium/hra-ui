import { IllustrationMappingItem, Url } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { IllustratorModel, IllustratorState } from './illustrator.state';

/**
 * Selectors for Medical Illustrators
 */
export class IllustratorSelectors {
  /**
   * Returns the url for the illustrator
   */
  @Selector([IllustratorState])
  static url({ url }: IllustratorModel): Url | undefined {
    return url;
  }

  /**
   * Returns the selected model of the illustrator
   */
  @Selector([IllustratorState])
  static selectedOnHovered({ selectedOnHover }: IllustratorModel): IllustrationMappingItem | undefined {
    return selectedOnHover;
  }

  @Selector([IllustratorState])
  static selectedOnClicked({ selectedOnClick }: IllustratorModel): IllustrationMappingItem | undefined {
    return selectedOnClick;
  }

  /**
   * Returns the current mapping of the illustrator
   */
  @Selector([IllustratorState])
  static mapping({ mapping }: IllustratorModel): IllustrationMappingItem[] {
    return mapping;
  }
}
