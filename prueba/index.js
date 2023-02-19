const api = require('./propio2.js');

const mdLinksIndex = (path, options) => new Promise((resolve, reject) => {
  if (api.routeExists(path)) {
    api.absolutePath(path);
    if ((api.recursiveFunction(path).length) !== 0) {
      const arrLinks = api.toHtmlAndExtractLinks(path);
      if (options.validate === true) {
        api.linkStatus(arrLinks)
        .then((res) => resolve(res));
      } else {
        resolve(arrLinks);
      }
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('No Markdown (.md) files found');
    }
  } else {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('The path do not exist. Did you mean --help?');
  }
});

module.exports = {
  mdLinksIndex,
};
