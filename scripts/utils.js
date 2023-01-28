import { spawn } from 'child_process';

export function spawnPromise(cmd) {
  let theResolve;
  let theReject;
  const thePromise = new Promise((resolve, reject) => {
    theResolve = resolve;
    theReject = reject;
  });
  const ins = spawn(cmd, {
    shell: true,
    stdio: 'inherit',
  });

  ins.on('close', () => {
    theResolve();
  });

  ins.on('error', () => {
    theReject();
  });

  return thePromise;
}
