import Papa from 'papaparse';

export async function fetchCsv(url: string, papaOptions = {}): Promise<any[]> {
  return new Promise((resolve) => {
    Papa.parse(url, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      ...papaOptions,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
}
