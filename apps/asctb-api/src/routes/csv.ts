import axios from 'axios';
import { Express, Request, Response } from 'express';
import { expand } from 'jsonld';
import papa from 'papaparse';

import { makeASCTBData, normalizeCsvUrl } from '../functions/api.functions';
import { makeJsonLdData } from '../functions/graph-jsonld.functions';
import { makeOwlData } from '../functions/graph-owl.functions';
import { makeGraphData } from '../functions/graph.functions';
import { makeValidationReport } from '../functions/validation-report.function';
import { UploadedFile } from '../models/api.model';

/** Adds csv routes */
export function setupCSVRoutes(app: Express): void {
  /**
   * Fetch a CSV given a link and parse it into json or graph output
   */
  app.get('/v2/csv', async (req: Request, res: Response) => {
    console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);

    // query parameters
    const csvUrls = req.query['csvUrl'] as string;
    const expanded = req.query['expanded'] !== 'false';
    const withSubclasses = req.query['subclasses'] !== 'false';
    const output = req.query['output'] as string;

    try {
      const asctbDataResponses = await Promise.all(
        csvUrls.split('|').map(async (csvUrl) => {
          const parsedUrl = normalizeCsvUrl(csvUrl.trim());
          const response = await axios.get(parsedUrl);
          const { data } = papa.parse<string[]>(response.data, {
            skipEmptyLines: 'greedy',
          });
          const asctbData = makeASCTBData(data);
          return {
            data: asctbData?.data ?? [],
            metadata: asctbData?.metadata ?? {},
            csv: response.data,
            parsed: data,
            warnings: asctbData?.warnings ?? [],
            isOmap: asctbData?.isOmap ?? false,
          };
        }),
      );
      const asctbData = asctbDataResponses
        .map((response) => response.data)
        .reduce((result, data) => {
          result = result.concat(data);
          return result;
        }, []);

      const asctbDataResponse = asctbDataResponses[0];

      if (output === 'owl') {
        const graphData = await makeOwlData(makeJsonLdData(makeGraphData(asctbData), withSubclasses));
        res.type('application/rdf+xml');
        res.send(graphData);
      } else if (output === 'jsonld') {
        let graphData = makeJsonLdData(makeGraphData(asctbData), withSubclasses);
        if (expanded) {
          graphData = await expand(graphData);
        }
        res.send(graphData);
      } else if (output === 'graph') {
        const graphData = makeGraphData(asctbData);
        res.send({
          data: graphData,
        });
      } else if (output === 'validate') {
        const reports = asctbDataResponses.map(makeValidationReport);
        res.type('text/plain');
        res.send(reports[0]);
      } else {
        // The default is returning the json
        res.send({
          data: asctbData,
          metadata: asctbDataResponse.metadata,
          csv: asctbDataResponse.csv,
          parsed: asctbDataResponse.parsed,
          warnings: asctbDataResponse.warnings,
          isOmap: asctbDataResponse.isOmap ?? false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        msg: 'Please provide a either a valid csv url or a valid public google sheet url. If you are uploading either of these methods, please check the CSV format',
        code: 500,
      });
    }
  });

  /**
   * Parse a CSV into JSON format given the raw file formData
   */
  app.post('/v2/csv', async (req: Request, res: Response) => {
    console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
    if (!req.files || !req.files['csvFile']) {
      res.status(400).send({
        msg: 'This route only accepts CSVs POSTed and called csvFile',
        code: 400,
      });
      return;
    }

    const file = req.files['csvFile'] as UploadedFile;

    if (file.mimetype !== 'text/csv' || file.size > 10000000) {
      res.status(400).send({
        msg: 'File must be a CSV less than 10 MB.',
        code: 400,
      });
      return;
    }

    const dataString = file.data.toString();
    console.log('File uploaded: ', file.name);

    try {
      const { data } = papa.parse<string[]>(dataString, {
        skipEmptyLines: 'greedy',
      });
      const asctbData = makeASCTBData(data);

      res.send({
        data: asctbData?.data ?? [],
        metadata: asctbData?.metadata ?? {},
        csv: dataString,
        parsed: data,
        warnings: asctbData?.warnings ?? [],
        isOmap: asctbData?.isOmap ?? false,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        msg: 'Please check the CSV format',
        code: 500,
      });
    }
  });

  app.get('/v2/csv/validate', async () => {
    console.log();
  });
}
