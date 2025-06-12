import { RequestHandler } from 'express';
import mcache from 'memory-cache';

/**
 * Creates a handler that caches responses for a specific duration
 *
 * @param duration Duration to keep the cached response
 * @returns A request handler
 */
export function routeCache(duration: number): RequestHandler {
  return (req, res, next) => {
    // query parameters
    const cache = req.query['cache'] as string;
    if (cache !== 'true') {
      next();
    } else {
      res.set('Content-Type', 'application/json');
      res.set('Cache-control', `public, max-age=${duration}`);
      const key = '__express__' + req.originalUrl || req.url;
      const cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
      } else {
        const sendResponse = res.send;
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          sendResponse.call(res, body);
          return body;
        };
        next();
      }
    }
  };
}
