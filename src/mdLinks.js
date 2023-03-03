// // import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

// // const mdLinks = (path, options) => {
// //   new Promise((resolve, reject) => {
// //     if (existsPath) {
// //       absolutePath(path)
// //       if ((findMarkdownFiles(path).length) > 0) {
// //         const arrLinks = extractHttpLinksFromFile(path);
// //         if (options.validate === true) {
// //           linkIsActive(arrLinks)
// //             .then((res) => resolve(res));
// //         } else {
// //           resolve(arrLinks);
// //         }
// //       } else {
// //         // eslint-disable-next-line prefer-promise-reject-errors
// //         reject('No Markdown (.md) files found');
// //       }
// //     } else {
// //       // eslint-disable-next-line prefer-promise-reject-errors
// //       reject('The path do not exist. Did you mean --help?');
// //     }
// //   })
// // }

// // console.log(mdLinks('../prueba'))
// // export default mdLinks

// import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     if (existsPath(path)) {
//       absolutePath(path)
//       if ((findMarkdownFiles(path).length) > 0) {
//         extractHttpLinksFromFile(path)
//           .then((arrLinks) => {
//             console.log('arrLinks', JSON.stringify(arrLinks, null, 2));
//             if (options && options.validate === true) {
//               linkIsActive(arrLinks)
//                 .then((res) => resolve(res));
//             } else {
//               resolve(arrLinks);
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//           });
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

// // console.log(mdLinks('../prueba/prueba2', { validate: true }))
// export default mdLinks

// import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     if (existsPath(path)) {
//       absolutePath(path);
//       if ((findMarkdownFiles(path).length) > 0) {
//         extractHttpLinksFromFile(path)
//           .then((arrLinks) => {
//             console.log('arrLinks', JSON.stringify(arrLinks, null, 2));
//             if (options && options.validate === true) {
//               linkIsActive(arrLinks)
//                 .then((res) => resolve(res))
//                 .catch((error) => {
//                   console.error(error);
//                   reject(error);
//                 });
//             } else {
//               resolve(arrLinks);
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//             reject(error);
//           });
//       } else {
//         reject('No Markdown (.md) files found');
//       }
//     } else {
//       reject('The path does not exist. Did you mean --help?');
//     }
//   });
// };

// export default mdLinks;

import { existsPath, absolutePath, findMarkdownFiles, extractHttpLinksFromFile, linkIsActive } from './api2.js';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (existsPath(path)) {
      absolutePath(path);
      if ((findMarkdownFiles(path).length) > 0) {
        console.log(`Markdown files found: ${findMarkdownFiles(path)}`);
        extractHttpLinksFromFile(path)
          .then((arrLinks) => {
            if (options && options.validate === true) {
              linkIsActive(arrLinks)
                .then((res) => resolve(res))
                .catch((error) => reject(error));
            } else {
              resolve(arrLinks);
            }
          })
          .catch((error) => reject(error));
      } else {
        reject('No Markdown (.md) files found');
      }
    } else {
      reject('The path does not exist. Did you mean --help?');
    }
  });
};
mdLinks('../prueba', { validate: true })
  .then(links => console.log(links))
  .catch(err => console.log(err));
export default mdLinks;
