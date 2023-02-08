// El módulo Path, es un módulo de Nodejs que nos brinda una serie
// de utilidades para trabajar con rutas de archivos y directorios.
// El módulo path es básico al momento de aprender Node. path nos permite
// poder manejar las rutas tanto relativas como absolutas de nuestra PC y de nuestro proyecto.
const path = require('path');
const { title } = require('process');
// contiene todas las funciones que necesita para leer, escribir y eliminar archivos en la máquina local. Este aspecto único de Node.js hace de JavaScript un
//  lenguaje útil para la programación de herramientas de back-end y CLI.
const fs = require('fs');
// modulo market
// const market=require('market');
// fetch () es un mecanismo que le permite realizar llamadas
// simples AJAX (JavaScript asíncrono y XML) con JavaScript.
//  Asincrónico significa que puede usar fetch para realizar una llamada a
//  una API externa sin detener la ejecución de otras instrucciones.
// const fetch=require('node-fetch');

// -------------FUNCIONES------------------------------
// ¿Existe la ruta?
const existsPath = (pathParam) => fs.existsSync(pathParam)
// console.log(existsPath('../prueba/prueba.js'))

// ¿Es una ruta absoluta? Si no lo es, lo convierte a absoluta
const absolutePath = (pathParam) => path.isAbsolute(pathParam) ? pathParam : path.resolve(pathParam);
// console.log(absolutePath('../prueba/prueba.js'))

// ¿El parametro es un directorio?
const isDirectory = (pathParam) => fs.statSync(pathParam).isDirectory();
// console.log(isDirectory('../prueba'))

// ¿El parametro es un archivo?
const isFile = (pathParam) => fs.statSync(pathParam).isFile();
// console.log(isFile('../prueba/prueba.txt'))

// ¿Tiene extención .md?
const fileMd = (pathParam) => path.extname(pathParam) === '.md';
// console.log(fileMd('../prueba/prueba.js'));

// Leer el archivo
const readFileMd = (pathParam) => fs.readFile(pathParam, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
// console.log(readFileMd('../prueba/prueba.md'));

// Leer el directorio
const readDirectory = (pathParam) => fs.readdirSync(pathParam);
// console.log(readDirectory('../prueba'))

fileWalker = (pathParam) => {
  let addArray = [];
  const existeOrNot = existsPath(pathParam);
  if (existeOrNot == true) {
    const conversor = absolutePath(existeOrNot)
    console.log(conversor)
    return addArray.push(conversor)
  }else {
    console.log('else')
  }
  return addArray
}
fileMd('../prueba/prueba.js')

// Buscar un archivo .md para guardarlos en un array.
// const fileWalker = (pathParam) => {
//   const pathExist = existsPath(pathParam);
//   const pathAbsolute = absolutePath(pathExist);
//   let addArray = [];
//   if (path.isAbsolute(pathAbsolute) && isFile(pathParam)) {
//     if (fileMd(pathAbsolute)) {
//       addArray.push(pathAbsolute);
//     }
//   } else {
//     const readDirectory = readDirectory(pathParam);
//     readDirectory.map((pathParam) => {
//       addArray = addArray.concat(fileWalker(path.join(pathAbsolute, pathParam)));
//     });
//   }
//   return addArray;

// }

// fileWalker('../prueba/prueba.md')



// Extraer links de un archivo .md
// const getLinkMd = (pathParam) => {
//   const mdLinks = fileWalker(pathParam);
//   let addLinks = [];
//   mdLinks.map((file) => {
//     const readFileMd = readFileMd(file);
//     const server = new marked.Renderer();
//     server.link = (href, title, text) => {
//       const infoLink = {
//         href:href,
//         text: text,
//         file:file
//       };
//       addLinks.push(infoLink);
//     };
//     marked(readFileMd, {renderer});
//   });
//   return addLinks;
// }


