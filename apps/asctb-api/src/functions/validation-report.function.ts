import { WarningCode, WarningLabels } from '../utils/warnings';
import { ASCTBData } from './api.functions';

/** An object with containing zero or more warnings */
type WarningDictionary = {
  [code in WarningCode]: string[];
};

/**
 * Makes a validation report
 *
 * @param data Data to convert
 * @returns A csv string
 */
export function makeValidationReport(data: ASCTBData): string {
  // Output lines/data will be added here
  const lines: string[] = [];

  // Grouping all the warnings by its code
  const codeByWarnings: WarningDictionary = {} as Record<WarningCode, string[]>;

  for (const warning of data.warnings) {
    // match will be having two values [<matched string>, <digit part of the code in the string>]
    const match = warning.match(/\(Code ([0-9]+)\)$/);
    if (match) {
      const code = parseInt(match[1]) as WarningCode;
      if (codeByWarnings[code]) {
        codeByWarnings[code].push(warning);
      } else {
        codeByWarnings[code] = [warning];
      }
    }
  }

  // Loop for checking the group of errors, and if length of the group errors is more then 0 then it has failed the validation and vise versa
  for (const [codeString, label] of Object.entries(WarningLabels)) {
    const code: WarningCode = parseInt(codeString);
    lines.push(`Validation ${label} ${codeByWarnings[code] ? 'failed' : 'passed'}`);
  }

  // Adding extra lines for space
  lines.push('', '');

  for (const [codeString, label] of Object.entries(WarningLabels)) {
    const code: WarningCode = parseInt(codeString);
    const groupOfWarnings = codeByWarnings[code];
    if (groupOfWarnings) {
      lines.push(`Validation feedback for ${label}`);
      groupOfWarnings.forEach((warning) => {
        lines.push(warning);
      });
    }
  }

  return lines.join('\n');
}
