import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import { AnyContentTemplateDef } from './content-template.service';

/** @ignore */
const tokenBundle = createNoopInjectionToken<AnyContentTemplateDef[], true>('Content Template Defs', { multi: true });

/** Inject content template definitions */
export const injectContentTemplates = tokenBundle[0];
/** Provide content template definitions */
export const provideContentTemplates = tokenBundle[1];
