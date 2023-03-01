// import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

// const mdLinks = (path, options) => {
//   new Promise((resolve, reject) => {
//     if (existsPath) {
//       absolutePath(path)
//       if ((findMarkdownFiles(path).length) > 0) {
//         const arrLinks = extractHttpLinksFromFile(path);
//         if (options.validate === true) {
//           linkIsActive(arrLinks)
//             .then((res) => resolve(res));
//         } else {
//           resolve(arrLinks);
//         }
//       } else {
//         // eslint-disable-next-line prefer-promise-reject-errors
//         reject('No Markdown (.md) files found');
//       }
//     } else {
//       // eslint-disable-next-line prefer-promise-reject-errors
//       reject('The path do not exist. Did you mean --help?');
//     }
//   })
// }

// console.log(mdLinks('../prueba'))
// export default mdLinks
import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (existsPath(path)) {
      absolutePath(path)
      if ((findMarkdownFiles(path).length) > 0) {
        const arrLinks = extractHttpLinksFromFile(path)
        .then((paths) => {
          console.log('paths', JSON.stringify(paths, null, 2));
        })
        .catch((error) => {
          console.error(error);
        });
        console.log(arrLinks)
        if (options && options.validate === true) {
          console.log(arrLinks)
          linkIsActive(arrLinks)
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

console.log(mdLinks('../prueba', { validate: true }))
export default mdLinks
