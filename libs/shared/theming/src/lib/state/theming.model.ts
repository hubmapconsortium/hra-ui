import { StateContext } from '@ngxs/store';
import { MaterialCssVariables } from 'angular-material-css-vars';
import { z } from 'zod';

/**
 * Model for theming
 */
export type ThemingModel = z.infer<typeof THEMING_FILE_SCHEMA>;

/**
 * State context for theming, with reference of model
 */
export type ThemingContext = StateContext<ThemingModel>;

/**
 * Theming mdoel schema, having records with key as material-css-vars pallete keys and string values
 */
export const THEMING_FILE_SCHEMA = z.record(z.nativeEnum(MaterialCssVariables), z.string());
