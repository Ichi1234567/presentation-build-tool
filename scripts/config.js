export default {
  sources: [
    '../about-functional',
    '../about-test',
  ],
  target: from => `${from.replace('../', '../presentations/').replace('/src', '')}`,
}
