const api = require("./api2");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (api.existsPath(path)) {
      api.absolutePath(path);
      if ((api.findMarkdownFiles(path).length) > 0) {
        // console.log(`Markdown files found: ${findMarkdownFiles(path)}`);
        // console.log('PATH',path)
        const exthttp = api.extractHttpLinksFromFile(path)

        if (options && options.validate === true) {
          // console.log('arrLinks', arrLinks)
          api.linkIsActive(exthttp)
            .then((res) => resolve(res.flat(1)))
            .catch((error) => reject('error de link is active' + error));
        } else {
          resolve(exthttp);
        }

      } else {
        reject('No Markdown (.md) files found');
      }
    } else {
      reject('The path does not exist. Did you mean --help?');
    }
  });
}

module.exports = {
  mdLinks,
}
