import { AngularFramework, Args } from '@storybook/angular';
import { ArgTypesEnhancer, StrictArgTypes, StrictInputType } from '@storybook/csf';

function parseDefaultValue(type: StrictInputType): unknown {
  const { defaultValue, type: typeDef } = type;

  // No default value or already the correct type
  if (defaultValue === undefined || typeof defaultValue !== 'string' || typeDef?.name === 'string') {
    return defaultValue;
  }

  switch (typeDef?.name) {
    case 'array':
    case 'boolean':
    case 'number':
    case 'object':
      try {
        // Might be a better way to parse the string
        const constant = new Function('return ' + defaultValue);
        return constant();
      } catch (_error) {
        return undefined;
      }

    case 'enum':
      if (typeDef.value.includes(defaultValue)) {
        return defaultValue;
      }
      return undefined;

    default:
      // Might be possible to handle union and intersection types
      // but I haven't encountered any value with those types
      // so I'm skipping them for now.
      return undefined;
  }
}

// Fix for: https://github.com/storybookjs/storybook/issues/17004
export function fixArgTypes(): ArgTypesEnhancer<AngularFramework, Args> {
  return (context) => {
    const argTypes: StrictArgTypes<Args> = { ...context.argTypes };
    const exclude = [...(context.parameters['controls']?.exclude ?? [])];

    for (const [key, type] of Object.entries(argTypes)) {
      switch (type['table'].category) {
        case 'inputs':
          const defaultValue = parseDefaultValue(type);
          if (defaultValue !== type.defaultValue) {
            argTypes[key] = { ...type, defaultValue };
          }
          break;

        case 'outputs':
          argTypes[key] = { ...type, defaultValue: undefined };
          break;

        default:
          exclude.push(key);
          break;
      }
    }

    context.parameters['controls'] = { ...context.parameters['controls'], exclude };
    return argTypes;
  };
}
