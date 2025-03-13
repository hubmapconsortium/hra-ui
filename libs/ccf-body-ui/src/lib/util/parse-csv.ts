import { parse } from 'papaparse';

/**
 * This function parses a CSV text string and converts it into an array of objects, where each object represents a row in the CSV file.
 * @param csvText The CSV text string to be parsed.
 * @param [firstFieldName] The name of the first field to identify the header row. If provided, the function will search for this field name to determine the header row.
 * @returns A promise that resolves to an array of objects, where each object represents a row in the CSV file.
 */
export async function parseCSVText(csvText: string, firstFieldName?: string): Promise<Record<string, string>[]> {
  const csvRows = parse(csvText, { skipEmptyLines: true }).data as string[][];
  let headerIndex = 0;
  let csvHeader = csvRows[0];
  if (firstFieldName) {
    csvHeader =
      csvRows.find((row, index) => {
        if (row[0] === firstFieldName) {
          headerIndex = index;
        }
        return row[0] === firstFieldName;
      }) ?? [];
  }
  if (csvHeader.length > 0) {
    return csvRows.slice(headerIndex + 1).map((row) =>
      row.reduce(
        (acc, value, index) => {
          if (index < csvHeader.length) {
            // Empty cells with just a dash in it.
            value = value.trim() === '-' ? '' : value;
            acc[csvHeader[index]] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    );
  } else {
    return [];
  }
}

/**
 * This function fetches a CSV file from a given URL, parses the CSV text, and converts it into an array of objects.
 * @param sourceUrl The URL of the CSV file to be fetched and parsed.
 * @param [firstFieldName] The name of the first field to identify the header row. If provided, the function will search for this field name to determine the header row.
 * @returns A promise that resolves to an array of objects, where each object represents a row in the CSV file.
 */
export async function parseCSV(sourceUrl: string, firstFieldName?: string): Promise<Record<string, string>[]> {
  const csvText = await fetch(sourceUrl).then((r) => r.text());
  return parseCSVText(csvText, firstFieldName);
}
