import path from 'path';
import { existsSync, statSync, readFile, readdirSync } from 'fs';
import axios from 'axios';
import { parse } from 'marked';
import { JSDOM } from 'jsdom';

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

// Leer el archivo
export const readFileMd = (pathParam) => {
  return new Promise((resolve, reject) => {
    readFile(pathParam, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// ejemplo de uso
// readFileMd('./prueba.md')
//   .then((data) => console.log("data:"+data))
//   .catch((err) => console.error(err));

// Leer el directorio
export const readDirectory = (pathParam) => readdirSync(pathParam);
// console.log(readDirectory('../prueba'));


// Funciones-------------------------------------------


export const extractHttpLinksFromFile = (ruta) => {
  const concatPath = path.resolve(ruta); // obtiene la ruta absoluta del archivo
  const readFileMd = (pathParam) => {
    return new Promise((resolve, reject) => {
      readFile(pathParam, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const paths = []
          const fileToHtml = parse(data);
          const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
          dom.forEach((el) => {
            if (el.href.slice(0, 3) === 'htt') {
              paths.push({
                href: el.href,
                text: (el.textContent).slice(0, 50),
                file: concatPath,
              });
            }
          });
          resolve(paths);
        }
      });
    });
  };
  return readFileMd(concatPath).then((data) => data.flat(1));
}




// extractHttpLinksFromFile('../prueba/leg.md')
//   .then((paths) => {
//     console.log('paths', JSON.stringify(paths, null, 2));
//   })
//   .catch((error) => {
//     console.error(error);
//   });



// Fumcion recursiva-----------------------------------------------

export const findMarkdownFiles = (dirPath, results = []) => {
  const files = readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, results);
    } else if (path.extname(filePath) === '.md') {
      results.push(path.resolve(filePath));
    }
  }
  return results;
};

// Ejemplo de uso:
// const dirPath = './prueba2';
// const markdownFiles = findMarkdownFiles(dirPath);
// console.log(markdownFiles);




// Status del link --------------------------------------------------------------------


export function linkIsActive(arrLinks) {
  return Promise.all(arrLinks.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        link.message = 'Ok';
        link.status = response.status;
        console.log(JSON.stringify(link, null, 2));
        return link;
      })
      .catch((error) => {
        link.message = 'Fail';
        link.status = error.response ? error.response.status : 'Error request';
        console.log(JSON.stringify(link, null, 2));
        return link;
      });
  }));
}


const links = [
  { href: 'https://www.google.com', text: 'Google' },
  { href: 'https://www.github.com', text: 'GitHub' },
];

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
