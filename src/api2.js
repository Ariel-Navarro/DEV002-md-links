import { resolve, join, extname, isAbsolute } from 'path';
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
export const absolutePath = (pathParam) => isAbsolute(pathParam) ? pathParam : resolve(pathParam);
// console.log(absolutePath('../prueba/prueba.js'));

// ¿El parametro es un directorio?
export const isDirectory = (pathParam) => statSync(pathParam).isDirectory();
// console.log(isDirectory('../prueba'));

// ¿El parametro es un archivo?
export const isFile = (pathParam) => statSync(pathParam).isFile();
// console.log(isFile('../prueba/prueba.txt'));

// ¿Tiene extensión .md?
export const fileMd = (pathParam) => extname(pathParam) === '.md';
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
      const filePath = join(pathParam, file);
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
  let array = [];
  const as = findMarkdownFiles(ruta).map((file) => {
    return new Promise((resolve) => {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          resolve(err);
        } else {
          const fileToHtml = parse(data);
          const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
          dom.forEach((el) => {
            if (el.href.slice(0, 3) === 'htt') {
              array.push({
                href: el.href,
                text: (el.textContent).slice(0, 50),
                file: ruta,
              });
            }
          });
          resolve(array.flat(1));
        }
      });
    });
  });
  return Promise.all(as);
}

// console.log(extractHttpLinksFromFile('../prueba'))
// .then((links) => {
//   console.log("Links: " + links);
// })
// .catch((err) => {
//   console.error("Error: " + err);
// });

// Status del link --------------------------------------------------------------------


export function linkIsActive(arrLinks) {

  const sa = arrLinks.map((link) => {
    return new Promise((resolve) => {
      return axios.get(link.href)
        .then((response) => {
          console.log('link', link)
          
          link.message = 'Ok';
          link.status = response.status;
          // console.log(JSON.stringify(link, null, 2));
          // console.log(link)
        resolve(link.flat(1));
        })
        .catch((error) => {
          link.message = 'Fail';
          link.status = error.response ? error.response.status : 'Error request';
          // console.log(JSON.stringify(link, null, 2));
          // console.log('LINK',link)
          resolve(link);
        });
    })
  });
  return Promise.all(sa)
};

let arrLinks;
extractHttpLinksFromFile('../prueba').then((response) => {
  arrLinks = response;
  linkIsActive(arrLinks).then(value => {
    console.log('VALUE',value);
    // console.log(arrLinks, arrLinks.flat(1))
  })
  .catch((err) => {
    console.log(err)
  })
})
