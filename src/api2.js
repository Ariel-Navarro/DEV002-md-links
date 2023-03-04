import { resolve } from 'path';
import { lstatSync, existsSync, statSync, readFile, readdirSync } from 'fs';
import axios from 'axios';
import { parse } from 'marked';
import { JSDOM } from 'jsdom';
// const fs = require('fs');

const routeDirectory = (parameter) => lstatSync(parameter).isDirectory();
// console.log(routeDirectory('../prueba/leg.md'))

// ¿Existe la ruta?
export const existsPath = (pathParam) => existsSync(pathParam);
// console.log(existsPath('../prueba/prueba.js'));

// ¿Es una ruta absoluta? Si no lo es, lo convierte a absoluta
export const absolutePath = (pathParam) => path.isAbsolute(pathParam) ? pathParam : path.resolve(pathParam);
// console.log(absolutePath('../prueba/prueba.js'));

// ¿El parametro es un directorio?
export const isDirectory = (pathParam) => statSync(pathParam).isDirectory();
// console.log(isDirectory('../prueba'));

// ¿El parametro es un archivo?
export const isFile = (pathParam) => statSync(pathParam).isFile();
// console.log(isFile('../prueba/prueba.txt'));

// ¿Tiene extensión .md?
export const fileMd = (pathParam) => path.extname(pathParam) === '.md';
// console.log(fileMd('../prueba/prueba.js'));

// export const readFileMd = (pathParam) => {
//   return new Promise((resolve, reject) => {
//     readFile(pathParam, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// Fumcion recursiva-----------------------------------------------
const results = [];

export const findMarkdownFiles = (pathParam) => {
  // Verificar si el path es un archivo con extensión .md
  if (isFile(pathParam) && fileMd(pathParam)) {
    results.push(absolutePath(pathParam));
  } else if (isDirectory(pathParam)) {
    const files = readdirSync(pathParam);
    // console.log('files' + files)
    for (const file of files) {
      // console.log('file' + file)
      const filePath = path.join(pathParam, file);
      // console.log('filePath' + filePath)
      if (isFile(filePath) && fileMd(filePath)) {
        results.push(absolutePath(filePath));
      } else if (isDirectory(filePath)) {
        findMarkdownFiles(filePath);
      }
    }
  }
  // console.log('results' + results)
  return results;
};

// console.log(findMarkdownFiles('../prueba'))

// Leer el archivo


// Leer el directorio
// export const readDirectory = (pathParam) => readdirSync(pathParam);
// console.log(readDirectory('../prueba'));


// Funciones-------------------------------------------


export const extractHttpLinksFromFile = (ruta) => {
  // const concatPath = resolve(ruta); // obtiene la ruta absoluta del archivo
  // console.log('concatPath',concatPath)
  const array = [];
  // const readFileMd = (pathParam) => {
  findMarkdownFiles(ruta).forEach((file) => {
    return new Promise((resolve, reject) => {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.log('error del if', err)
          reject(err);
        } else {
          const paths = []
          const fileToHtml = parse(data);
          console.log('filetohtml', fileToHtml)
          const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
          console.log('dom', dom)
          dom.forEach((el) => {
            if (el.href.slice(0, 3) === 'htt') {
              paths.push({
                href: el.href,
                text: (el.textContent).slice(0, 50),
                file: concatPath,
              });
            }
          });
          console.log('paths', paths)
          resolve(paths);
        }
      });
    });
  })

  // };
  // return readFileMd(concatPath).then((data) => {
  //   const a = data.flat(1)
  //   console.log('a',a)
  // })
}

// Status del link --------------------------------------------------------------------


export function linkIsActive(arrLinks) {
  return Promise.all(arrLinks.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        link.message = 'Ok';
        link.status = response.status;
        // console.log(JSON.stringify(link, null, 2));
        return link;
      })
      .catch((error) => {
        link.message = 'Fail';
        link.status = error.response ? error.response.status : 'Error request';
        // console.log(JSON.stringify(link, null, 2));
        return link;
      });
  }));
};

// linkIsActive(links)
//   .then((results) => {
//     console.log('avero')

//     console.log(results);
//   })
//   .catch((err) => {
//     console.error(err);
//   });



// toHtmlAndExtractLinks('../prueba/prueba2/prueba3/hijoDePrueba3').then((links) => {
//   console.log("Links" *links);
// }).catch((err) => {
//   console.error("error" + err);

// });
