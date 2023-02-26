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


const extractHttpLinksFromFile = (ruta) => {
  const concatPath = path.resolve(ruta); // obtiene la ruta absoluta del archivo
  const readFileMd = (pathParam) => {
    return new Promise((resolve, reject) => {
      fs.readFile(pathParam, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const paths = []
          const fileToHtml = marked.parse(data);
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



extractHttpLinksFromFile('./leg.md')
  .then((paths) => {
    console.log(paths); // los datos reales se muestran aquí
  })
  .catch((error) => {
    console.error(error); // si se produce un error, se muestra aquí
  });


// Fumcion recursiva-----------------------------------------------

const findMarkdownFiles = (dirPath, results = []) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
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

// linkIsActive(links)
//   .then((results) => {
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

module.exports = {
  existsPath,
  absolutePath,
  isDirectory,
  isFile,
  fileMd,
  readFileMd,
  readDirectory,
  extractHttpLinksFromFile,
  findMarkdownFiles,
  linkIsActive,
};
