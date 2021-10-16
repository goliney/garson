import { app } from '../src/app';

export async function write(content) {
  app.stdin.write(content);
  await new Promise(resolve => setTimeout(resolve));
}

export function trimFrame(text) {
  // for some reason, on github lines appear with trailing
  // space after text input
  return text
    .split('\n')
    .map(line => line.trim())
    .join('\n');
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

export const waitFor = (callback, { interval = 50, timeout = 1000 } = {}) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now();

    const nextInterval = () => {
      setTimeout(() => {
        try {
          callback();
          resolve();
        } catch (err) {
          if (Date.now() - startTime > timeout) {
            reject(new Error('Timed out.'));
          } else {
            nextInterval();
          }
        }
      }, interval);
    };

    nextInterval();
  });
