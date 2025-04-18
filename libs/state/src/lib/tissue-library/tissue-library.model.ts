import { TissueLibrary } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';

/** Type alias for the tissue data */
export type TissueLibraryModel = TissueLibrary;

/** Helper alias for action handler's ctx argument */
export type TissueLibraryContext = StateContext<TissueLibraryModel>;
