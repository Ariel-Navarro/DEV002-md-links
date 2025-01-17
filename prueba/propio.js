const path = require('path');
const fs = require('fs');

// ¿Existe la ruta?
const existsPath = (pathParam) => fs.existsSync(pathParam);
// console.log(existsPath('../prueba/prueba.js'));

// ¿Es una ruta absoluta? Si no lo es, lo convierte a absoluta
const absolutePath = (pathParam) => path.isAbsolute(pathParam) ? pathParam : path.resolve(pathParam);
// console.log(absolutePath('../prueba/prueba.js'));

// ¿El parametro es un directorio?
const isDirectory = (pathParam) => fs.statSync(pathParam).isDirectory();
// console.log(isDirectory('../prueba'));

// ¿El parametro es un archivo?
const isFile = (pathParam) => fs.statSync(pathParam).isFile();
// console.log(isFile('../prueba/prueba.txt'));

// ¿Tiene extensión .md?
const fileMd = (pathParam) => path.extname(pathParam) === '.md';
// console.log(fileMd('../prueba/prueba.js'));

// const files = readDirectory('dir/b');
// const filesMd = files.filter(file => path.extname(file) === '.md');
// console.log(filesMd);


// Leer el archivo
const readFileMd = (pathParam) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathParam, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// ejemplo de uso
readFileMd('./prueba.md')
  .then((data) => console.log("data:"+data))
  .catch((err) => console.error(err));

// Leer el directorio
const readDirectory = (pathParam) => fs.readdirSync(pathParam);
// console.log(readDirectory('../prueba'));

// Función recursiva--------------------------------------------------------

// const fileWalkerRecursive = (dir) => {
//   let addArray = [];

//   const processFile = (file) => {
//     if (fileMd(file)) {
//       addArray.push(absolutePath(file));
//     }
//   };

//   const processDirectory = (directory) => {
//     const files = fs.readdirSync(directory);

//     for (const file of files) {
//       const filePath = path.join(directory, file);

//       if (isFile(filePath)) {
//         processFile(filePath);
//       }

//       if (isDirectory(filePath)) {
//         const subdirectoryFiles = fileWalkerRecursive(filePath);
//         addArray = addArray.concat(subdirectoryFiles);
//       }
//     }
//   };

//   processDirectory(dir);
//   return addArray;
// };

// // console.log(fileWalkerRecursive('../prueba'));

// // --------ENCONTRAR LINKS -----------------------------------
// const foundLinks = (ruta) => {
//   const readFileMd = (pathParam) => {
//     try {
//       const data = fs.readFileSync(pathParam, 'utf8');
//       return data;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fileContent = readFileMd(ruta);
//   const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
//   const links = fileContent && fileContent.match(linkPattern);

//   if (links) {
//     const json = JSON.stringify(links, null, 2);
//     console.log('Se encontraron los siguientes enlaces:');
//     console.log(json);
//   } else {
//     console.log('No se encontraron enlaces en el archivo.');
//   }
// }

// console.log(foundLinks('../prueba/prueba2/prueba3/hijoDePrueba3/nietoDePrueba3/nietoPrueba3.md'))


// const marked = require('marked');
// const { JSDOM } = require('jsdom');

// const toHtmlAndExtractLinks = (routeParameter) => {
//   const arrDom = [];
//   recursiveFunction(routeParameter).forEach((elm) => {
//     const readFiles = fs.readFileSync(elm, 'utf8');
//     const fileToHtml = marked.parse(readFiles);
//     const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
//     dom.forEach((el) => {
//       if (el.href.slice(0, 3) === 'htt') {
//         arrDom.push({
//           href: el.href,
//           text: (el.textContent).slice(0, 50),
//           file: elm,
//         });
//       }
//     });
//   });
//   return arrDom.flat(1);
// };

// const recursiveFunction = (route) => {
//   let paths = [];
//   const readDir = fs.readdirSync(route, 'utf8');
//   readDir.forEach((elm) => {
//     const concatPath = path.join(route, elm);
//     console.log(`concatPath:${concatPath}`)
//     console.log("route" + route)
//     console.log("elm:" + elm)
//     if (fs.statSync(concatPath).isDirectory()) {
//       paths = paths.concat(recursiveFunction(concatPath));
//     } else {
//       if (path.extname(concatPath) === '.md') {
//         paths.push(concatPath);
//       }
//     }
//   });
//   console.log(paths)
//   return paths;
// };


//   // const arrDom = [];
//   // const filePromises = recursiveFunction(ruta).map((elm) => {
//   //   return readFileMd(elm).then((readFiles) => {
//   //     const fileToHtml = marked.parse(readFiles);
//   //     const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
//   //     dom.forEach((el) => {
//   //       if (el.href.slice(0, 3) === 'htt') {
//   //         arrDom.push({
//   //           href: el.href,
//   //           text: (el.textContent).slice(0, 50),
//   //           file: elm,
//   //         });
//   //       }
//   //     });
//   //   });
//   // });

//   // return Promise.all(filePromises).then(() => {
//   //   return arrDom.flat(1);
//   // });


// console.log(toHtmlAndExtractLinks('../prueba/prueba2/prueba3/hijoDePrueba3/nietoDePrueba3')); // Cambiar por la ruta correspondiente a tus archivos

// // Status del link --------------------------------------------------------------------

// const axios = require('axios');


// const mdLinks = (arrLinks) => {
//   const linksStatus = arrLinks.map((el) => new Promise((resolve) => {
//     const link = () => axios.get(el.href)
//       .then((response) => {
//         if (response.status >= 200 && response.status < 400) {
//           el.message = 'Ok';
//           el.status = response.status;
//           resolve(el);
//         } else {
//           el.message = 'Fail';
//           el.status = response.status;
//           resolve(el);
//         }
//       }).catch(() => {
//         el.message = 'Fail';
//         el.status = 'Error request';
//         resolve(el);
//       });
//     link();
//   }));
//   return Promise.all(linksStatus);
// };

// mdLinks()

