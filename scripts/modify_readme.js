import { writeFile } from 'fs/promises';

import config from './config.js';

function getListInfo(dirs) {
  return dirs.reduce((result, dir) => {
    const info = config.extractInfo(dir);

    if (!result[info.group]) {
      result[info.group] = [];
    };

    result[info.group].push({
      title: info.title,
      url: [config.domain, info.group, info.title].join('/'),
    });

    return result;
  }, {});
}

function readmeTemplate(fromGroups) {
  const groupContents = Object.keys(fromGroups).map(group => {
    return [
      `\n`,
      `## ${group}`,
      ...fromGroups[group].map(list => {
        return `* [${list.title}](${list.url})`;
      }),
    ];
  }).flat();

  return [
    '# Presentations',
    'The contents are built by [presentation-build-tool](https://github.com/Ichi1234567/presentation-build-tool).',
    ...groupContents,
  ].join('\n');
}

export default function modifyReadme(dirs) {
  const groups = getListInfo(dirs);
  const content = readmeTemplate(groups);

  // console.log('groups', groups);
  // console.log('content', content);

  return writeFile(config.targetReadme, content).then(() => {
    console.log('DONE - modified readme');
  });
}
