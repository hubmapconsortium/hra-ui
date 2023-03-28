import { Action } from '@hra-ui/cdk/state';
import { TissueLibraryService } from '@hra-ui/services';

export class Load extends Action('') {}

export class SetActive extends Action('') {}

export class ClearActive extends Action('') {}
