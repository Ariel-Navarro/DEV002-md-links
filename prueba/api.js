const path = require('path');
const fs = require('fs');

const marked = require('marked');
const { JSDOM } = require('jsdom');

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
// readFileMd('./prueba.md')
//   .then((data) => console.log("data:"+data))
//   .catch((err) => console.error(err));

// Leer el directorio
const readDirectory = (pathParam) => fs.readdirSync(pathParam);
// console.log(readDirectory('../prueba'));


// Funciones-------------------------------------------


const toHtmlAndExtractLinks = (ruta) => {
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



  const recursiveFunction = (route) => {
    return new Promise((resolve, reject) => {
      let paths = [];

      // Check if route is a file
      if (fs.statSync(route).isFile()) {
        if (path.extname(route) === '.md') {
          paths.push({
            href: null,
            text: null,
            file: route,
          });
        }
        resolve(paths);
        return;
      }

      const readDir = fs.readdirSync(route, 'utf8');
      Promise.all(readDir.map((elm) => {
        const concatPath = path.join(route, elm);
        if (fs.statSync(concatPath).isDirectory()) {
          return recursiveFunction(concatPath);
        } else {
          if (path.extname(concatPath) === '.md') {
            return readFileMd(concatPath).then((readFiles) => {
              const fileToHtml = marked.parse(readFiles);
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
            }).catch((err) => {
              console.error(err);
            });
          }
        }
      })).then(() => {
        resolve(paths);
      }).catch((err) => {
        reject(err);
      });
    });
  };







  // Status del link --------------------------------------------------------------------

  const axios = require('axios');

  function linkIsActive(arrLinks) {
    return Promise.all(arrLinks.map((link) => {
      return axios.get(link.href)
        .then((response) => {
          link.message = 'Ok';
          link.status = response.status;
          return link;
        })
        .catch((error) => {
          link.message = 'Fail';
          link.status = error.response ? error.response.status : 'Error request';
          return link;
        });
    }));
  }

  const links = [
    { href: 'https://www.google.com', text: 'Google' },
    { href: 'https://www.github.com', text: 'GitHub' },
  ];

  linkIsActive(links)
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error(err);
    });
}

// toHtmlAndExtractLinks('../prueba/prueba2/prueba3/hijoDePrueba3').then((links) => {
//   console.log("Links" *links);
// }).catch((err) => {
//   console.error("error" + err);

// });

module.export = {
  existsPath,
  absolutePath,
  isDirectory,
  isFile,
  fileMd,
  readFileMd,
  readDirectory,
  toHtmlAndExtractLinks,
  recursiveFunction,
  linkIsActive,
};
