import { Url } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { IllustratorModel, IllustratorState } from './illustrator.state';

export class IllustratorSelectors {
  @Selector([IllustratorState])
  static url({ url }: IllustratorModel): Url | undefined {
    return url;
  }

  @Selector([IllustratorState])
  static selected({ selected }: IllustratorModel): unknown | undefined {
    return selected;
  }
}
