import { TissueData } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';

export type TissueLibraryModel = TissueData;

export type TissueLibraryContext = StateContext<TissueLibraryModel>;
