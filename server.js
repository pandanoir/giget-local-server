import express from 'express';
import { join } from 'path';
import * as tar from 'tar';
import { tmpdir } from 'os';
import { createWriteStream, createReadStream, mkdtempSync } from 'fs';
import { once } from 'events';

const templatePath = process.argv.slice(2)[0];

async function buildTarball() {
  const tarPath = join(
    mkdtempSync(join(tmpdir(), 'template-')),
    'template.tar.gz',
  );
  const out = createWriteStream(tarPath);
  tar.c({ gzip: true, cwd: templatePath }, ['.']).pipe(out);
  await once(out, 'close');
  return tarPath;
}

const app = express();

app.get('/template.tar.gz', async (_req, res) => {
  try {
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=template.tar.gz',
    );

    tar.c({ gzip: true, cwd: templatePath }, ['.']).pipe(res);
  } catch (err) {
    res.status(500).send('Failed to create tarball');
  }
});

const buildPromise = buildTarball(); // 起動時に非同期で開始
app.get('/cached.tar.gz', async (_req, res) => {
  try {
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', 'attachment; filename=cached.tar.gz');
    createReadStream(await buildPromise).pipe(res);
  } catch (err) {
    console.error('Build error:', err);
    res.status(500).send('Failed to create tarball.');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/template.tar.gz');
});

