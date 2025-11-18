import { Selector } from '@ngxs/store';
import { CallToActionModel, CallToActionState } from './call-to-action.state';

/** Call to action selectors */
export class CallToActionSelectors {
  /** Get the title */
  @Selector([CallToActionState])
  static title(state: CallToActionModel): string {
    return state.title;
  }

  /** Get the message */
  @Selector([CallToActionState])
  static message(state: CallToActionModel): string {
    return state.message;
  }

  /** Get the call to action text */
  @Selector([CallToActionState])
  static callToAction(state: CallToActionModel): string {
    return state.callToAction;
  }

  /** Get the image url */
  @Selector([CallToActionState])
  static imageUrl(state: CallToActionModel): string {
    return state.imageUrl;
  }

  /** Get the expiration date */
  @Selector([CallToActionState])
  static expirationDate(state: CallToActionModel): string {
    return state.expirationDate;
  }

  /** Get whether popup is shown */
  @Selector([CallToActionState])
  static popupShown(state: CallToActionModel): boolean {
    return state.popupShown;
  }
}
