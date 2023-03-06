import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (existsPath(path)) {
      absolutePath(path);
      if ((findMarkdownFiles(path).length) > 0) {
        // console.log(`Markdown files found: ${findMarkdownFiles(path)}`);
        // console.log('PATH',path)
        extractHttpLinksFromFile(path)
          .then((arrLinks) => {
            if (options && options.validate === true) {
              linkIsActive(arrLinks)
                .then((res) => resolve(res.flat(1)))
                .catch((error) => reject('error de link is active'+ error));
            } else {
              resolve(arrLinks);
            }
          })
          .catch((error) => reject ('error de extract httplinksfile'+ error));
      } else {
        reject('No Markdown (.md) files found');
      }
    } else {
      reject('The path does not exist. Did you mean --help?');
    }
  });
};

// mdLinks('../prueba/leg.md', { validate: true })
//   .then(links => console.log(links))
//   .catch(err => console.log('error de mdlinks'+ err))
export default mdLinks;
