import { app } from '../src/app';

export async function write(content) {
  app.stdin.write(content);
  await new Promise(resolve => setTimeout(resolve));
}

export function stripColors(text) {
  return text.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
}

export function stripColorsFromLastFrame() {
  return stripColors(app.lastFrame());
}
