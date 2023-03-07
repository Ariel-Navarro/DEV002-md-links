const api = require("./api2");

// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     if (api.existsPath(path)) {
//       api.absolutePath(path);
//       if ((api.findMarkdownFiles(path).length) > 0) {
//         const exthttp = api.extractHttpLinksFromFile(path)
//         if ((exthttp.length) > 0) {
//           if (options && options.validate === true) {
//             // console.log('exthttp', exthttp)
//             api.linkIsActive(exthttp)
//               .then((res) => resolve(res.flat(1)))
//               .catch((error) => reject('error de link is active' + error));
//           }
//           //   } else {
//           //     reject('No Markdown (.md) files found');
//           //   }
//           // } else {
//           //   reject('The path does not exist. Did you mean --help?');
//           // }
//         };
//       };
//     };
//   });
// };

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
};

// const mdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     if (api.existsPath(path)) {
//       api.absolutePath(path);
//       if ((api.findMarkdownFiles(path).length) > 0) {
//         // console.log(`Markdown files found: ${findMarkdownFiles(path)}`);
//         // console.log('PATH',path)
//         api.extractHttpLinksFromFile(path)
//           .then((arrLinks) => {
//             if (options && options.validate === true) {
//               console.log('arrLinks', arrLinks)
//               api.linkIsActive(arrLinks)
//                 .then((res) => resolve(res.flat(1)))
//                 .catch((error) => reject('error de link is active'+ error));
//             } else {
//               resolve(arrLinks);
//             }
//           })
//           .catch((error) => reject ('error de extract httplinksfile'+ error));
//       } else {
//         reject('No Markdown (.md) files found');
//       }
//     } else {
//       reject('The path does not exist. Did you mean --help?');
//     }
//   });
// };

// mdLinks('../prueba/prueba.md', { validate: true })
// .then((links) => {
//       console.log("Links " + JSON.stringify(links));
//     })
//     .catch((err) => {
//       console.error("Error: " + err);
//     });
module.exports = {
  mdLinks,
}
