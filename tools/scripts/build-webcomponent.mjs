import concat from 'concat';
import { glob } from 'glob';
import { copyFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { argv, exit } from 'node:process';

function getDirs(appName) {
  return {
    srcDir: `./apps/${appName}/src`,
    distDir: `./dist/apps/${appName}`,
  };
}

async function build(appName) {
  const { distDir } = getDirs(appName);
  const jsFiles = await glob([
    `${distDir}/runtime*.js`,
    `${distDir}/polyfills*.js`,
    `${distDir}/scripts*.js`,
    `${distDir}/vendor*.js`,
    `${distDir}/main*.js`,
  ]);

  if (jsFiles.length === 0) {
    console.log('Failed to find application js files');
    exit(1);
  }

  await concat(jsFiles, `${distDir}/wc.js`);
}

async function copyExampleHtmlFiles(appName) {
  const { srcDir, distDir } = getDirs(appName);
  const exampleFiles = await glob(`${srcDir}/*-example.html`);

  for (const path of exampleFiles) {
    const fileName = basename(path);
    const destPath = `${distDir}/${fileName}`;
    await copyFile(path, destPath).catch(() => {});
  }
}

async function main() {
  const userArguments = argv.slice(2);
  if (userArguments.length !== 1) {
    console.error('Expected the application directory name as the only argument');
    exit(1);
  }

  const appName = userArguments[0];
  await build(appName);
  await copyExampleHtmlFiles(appName);
}

await main();
