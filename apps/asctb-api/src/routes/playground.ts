import { Express, Request, Response } from 'express';
import papa from 'papaparse';

import { PLAYGROUND_CSV } from '../../const';
import { makeASCTBData } from '../functions/api.functions';

/** Adds playground routes */
export function setupPlaygroundRoutes(app: Express): void {
  /**
   * Get the toy CSV data set for the default playground view
   */
  app.get('/v2/playground', async (req: Request, res: Response) => {
    console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
    try {
      const parsed = papa.parse<string[]>(PLAYGROUND_CSV).data;
      const asctbData = makeASCTBData(parsed);
      res.send({
        data: asctbData?.data ?? [],
        metadata: asctbData?.metadata ?? {},
        csv: PLAYGROUND_CSV,
        parsed: parsed,
        warnings: asctbData?.warnings ?? [],
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        msg: JSON.stringify(err),
        code: 500,
      });
    }
  });

  /**
   * Send updated data to render on the playground after editing the table
   */
  app.post('/v2/playground', async (req: Request, res: Response) => {
    const csv = papa.unparse(req.body);
    try {
      const asctbData = makeASCTBData(req.body.data);
      res.send({
        data: asctbData?.data ?? [],
        metadata: asctbData?.metadata ?? {},
        parsed: req.body,
        csv: csv,
        warnings: asctbData?.warnings ?? [],
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        msg: JSON.stringify(err),
        code: 500,
      });
    }
  });
}
