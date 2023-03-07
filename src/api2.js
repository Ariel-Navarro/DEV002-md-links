const path = require("path");
const fs = require("fs");
const  axios  = require("axios")
const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require('cheerio');

// console.log(axios)

const routeDirectory = (parameter) => fs.lstatSync(parameter).isDirectory();
// console.log(routeDirectory('../prueba/leg.md'))

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

// Fumcion recursiva-----------------------------------------------
const results = [];

const findMarkdownFiles = (pathParam) => {
  // Verificar si el path es un archivo con extensión .md
  if (isFile(pathParam) && fileMd(pathParam)) {
    results.push(absolutePath(pathParam));
  } else if (isDirectory(pathParam)) {
    const files = fs.readdirSync(pathParam);
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
  // console.log('RESULTADOSSSS' + results)
  return results;
};

// console.log(findMarkdownFiles('../prueba'))

// // Leer el archivo


// // Leer el directorio
// // export const readDirectory = (pathParam) => readdirSync(pathParam);
// // console.log(readDirectory('../prueba'));


// // Funciones-------------------------------------------
const extractHttpLinksFromFile = (routeParameter) => {
  const arrDom = [];
  findMarkdownFiles(routeParameter).forEach((elm) => {
    const readFiles = fs.readFileSync(elm, 'utf8');
    const fileToHtml = marked.parse(readFiles);
    const dom = new JSDOM(fileToHtml).window.document.querySelectorAll('a');
    // console.log('dom', dom)
    dom.forEach((el) => {
      if (el.href.slice(0, 3) === 'htt') {
        arrDom.push({
          href: el.href,
          text: (el.textContent).slice(0, 50),
          file: elm,
        });
      }
    });
  });
  return arrDom.flat(1);
};


const dom = new JSDOM(`<!DOCTYPE html><a>Hello world</a><p>Hello</p>`);
// console.log(dom.window.document.querySelector("p").textContent);

// const extractHttpLinksFromFile = (ruta) => {
//   let objt = {};
//   const as = findMarkdownFiles(ruta).map((file) => {
//     return new Promise((resolve) => {
//       fs.readFile(file, 'utf8', (err, data) => {
//         if (err) {
//           resolve(err);
//         } else {
//           const fileToHtml = marked.parse(data);
//           console.log(fileToHtml)
//           let $ = cheerio.load(fileToHtml);
//           console.log('TESTEO', $.attr('a'))

// const dom = new JSDOM(fileToHtml);
// let test = dom.window.document.querySelectorAll('a');
// console.log('dom', test);
// test.forEach((el) => {
//   if (el.href.slice(0, 3) === 'htt') {
//     // console.log('el', el)
//     objt = {
//       href: el.href,
//       text: (el.textContent).slice(0, 50),
//       file: ruta,
//     };
//     resolve(objt);
//   }
// });
// console.log('array', objt)
// resolve(objt);
//         }
//       });
//     });
//   });
//   return Promise.all(as);
// }

// console.log(extractHttpLinksFromFile('../prueba'))


// extractHttpLinksFromFile('../prueba')
//   .then((links) => {
//     console.log("Links .flat(2): " + links);
//   })
//   .catch((err) => {
//     console.error("Error: " + err);
//   });

// // Status del link --------------------------------------------------------------------


 function linkIsActive(arrLinks) {
  const sa = arrLinks.map((link) => {
    return new Promise((resolve) => {
      axios.get(link.href)
        .then((response) => {
          link.message = 'Ok';
          link.status = response.status;
          resolve(link);
        })
        .catch((error) => {
          link.message = 'Fail';
          link.status = error.response ? error.response.status : 'Error request';
          resolve(link);
        });
    })
  });
  return Promise.all(sa)
};


// let arrLinks;
// const prueba = extractHttpLinksFromFile('../prueba/leg.md')
// console.log(prueba)

// const prueba2 = linkIsActive(prueba)
// linkIsActive(prueba)
// .then((reso) => {
//       console.log(reso);
//     })
//     .catch((err) => {
//       console.error("Error: " + err);
//     });
// console.log('prueba2',prueba2)
// .then((response) => {
//   arrLinks = response.flat(1);
//   // console.log('arrLinks', arrLinks)
//   linkIsActive(arrLinks).then(value => {
//     console.log('VALUE',value.flat(1));
//     // console.log(arrLinks, arrLinks.flat(1))
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

module.exports = {
  routeDirectory,
  absolutePath,
  existsPath,
  isFile,
  fileMd,
  isDirectory,
  extractHttpLinksFromFile,
  findMarkdownFiles,
  linkIsActive,
};
