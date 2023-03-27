import { Action } from '@hra-ui/cdk/state';
import { TissueLibraryService } from '@hra-ui/services';

export class SetActive extends Action('') {}

export class ClearActive extends Action('') {}

export class Load extends Action('') {}
