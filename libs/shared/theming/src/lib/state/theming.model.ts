import { StateContext } from '@ngxs/store';
import { MaterialCssVariables } from 'angular-material-css-vars';
import { z } from 'zod';

export type ThemingModel = z.infer<typeof THEMING_FILE_SCHEMA>;

export type ThemingContext = StateContext<ThemingModel>;

export const THEMING_FILE_SCHEMA = z.record(z.nativeEnum(MaterialCssVariables), z.string());
