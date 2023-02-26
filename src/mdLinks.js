const api = require('../prueba/api.js');

const mdLinks = (path, options) => {
  new Promise((resolve, reject) => {
    if (api.existsPath) {
      api.absolutePath(path)
      if ((api.findMarkdownFiles(path).length) > 0) {
        const arrLinks = api.extractHttpLinksFromFile(path);
        if (options.validate === true) {
          api.linkIsActive(arrLinks)
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
  })
}

module.exports = {
  mdLinks,
};
