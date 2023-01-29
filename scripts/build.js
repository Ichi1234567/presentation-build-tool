import prompts from 'prompts';

import config from './config.js';
import { spawnPromise } from './utils.js';
import getPresentations from './get_presentations.js';
import modifyReadme from './modify_readme.js';

async function main() {
  const dirs = await getPresentations(config.sources);
  const resp = await prompts([
    {
      type: 'multiselect',
      name: 'presentations',
      message: 'Pick presentation',
      choices: dirs.map((dir, index) => ({
        title: dir.replace('../', ''), value: dir, selected: !index,
      })),
    }
  ]);

  // console.log('resp', resp);
  const marpCmds = resp.presentations.map(from => {
    const cmd = `marp ${from} -o ${config.target(from)}/index.html --html`;

    return cmd;
  }) ;

  // console.log('marpCmds', marpCmds);
  marpCmds.forEach(cmd => {
    spawnPromise(cmd);
  })

  // copy assets
  const copyCmds = resp.presentations.map(from => {
    const source = `${from}/assets/images`;
    const target = `${config.target(from)}/assets`;
    const cmd = `mkdir -p "${target}" && cp -R ${source} ${target}`;

    return cmd;
  });

  // console.log('copyCmds', copyCmds);
  copyCmds.forEach(cmd => {
    spawnPromise(cmd).then(() => {
      console.log('DONE - copy assets');
    });
  })

  // modify readme
  modifyReadme(dirs);
}

main();
