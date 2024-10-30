const inlineWorkers = {};

function registerInlineWorkers(workers) {
  Object.assign(inlineWorkers, workers);
}

function findInlineWorker(url) {
  const urlString = String(url);
  for (const key in inlineWorkers) {
    if (urlString.endsWith(key)) {
      return inlineWorkers[key];
    }
  }

  return undefined;
}

function createInlineWorker(scriptText, options) {
  const blob = new Blob([scriptText], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url, options);
  URL.revokeObjectURL(url);
  return worker;
}

const workerShim = new Proxy(Worker, {
  construct: (_target, args, _newTarget) => {
    const inlineWorkerCode = findInlineWorker(args[0]);
    if (inlineWorkerCode !== undefined) {
      return createInlineWorker(inlineWorkerCode, args[1]);
    }

    return new Worker(...args);
  },
});

export { workerShim as Worker, registerInlineWorkers };
