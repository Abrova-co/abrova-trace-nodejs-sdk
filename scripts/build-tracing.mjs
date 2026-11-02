// Builds lib/tracing/otel.js: OpenTelemetry and its instrumentations in one file, so the published package needs
// nothing from npm. Licences of the bundled code are kept at the end of the file.
import { build } from 'esbuild';

await build({
  entryPoints: ['tracing-src/index.js'],
  outfile: 'lib/tracing/otel.js',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  legalComments: 'eof',
  logLevel: 'warning',
});
