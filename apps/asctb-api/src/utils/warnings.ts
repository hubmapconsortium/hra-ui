export enum WarningCode {
  InvalidCsvFile = 1,
  UnmappedMetadata = 2,
  InvalidHeader = 3,
  MissingHeader = 4,
  InvalidCharacter = 5,
  MissingCTorAnatomy = 6,
  UnmappedData = 7,
  BadColumn = 8,
  NoIdInCT1 = 9,
}

export const WarningLabels = {
  [WarningCode.InvalidCsvFile]: 'Invalid CSV file?',
  [WarningCode.UnmappedMetadata]: 'Unmapped Metadata found?',
  [WarningCode.InvalidHeader]: 'Invalid Header found?',
  [WarningCode.MissingHeader]: 'Missing Header Value found?',
  [WarningCode.InvalidCharacter]: 'Invalid Character found?',
  [WarningCode.MissingCTorAnatomy]: 'Missing Uberon or CL IDs?',
  [WarningCode.UnmappedData]: 'Unmapped Data found?',
  [WarningCode.BadColumn]: 'Bad Column found?',
  [WarningCode.NoIdInCT1]: 'CT/1 has CL ID?',
};
