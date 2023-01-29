export default {
  domain: 'https://ichi1234567.github.io/presentaions',
  extractInfo: originItem => {
    // originItem: ../group/src/title
    const splits = originItem.split('/');
    const group = splits.slice(1)[0];
    const title = splits.slice(-1)[0];

    return { group, title };
  },
  sources: [
    '../about-functional',
    '../about-test',
  ],
  target: from => `${from.replace('../', '../presentations/').replace('/src', '')}`,
  targetReadme: `../presentations/README.md`,
}
