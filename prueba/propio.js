const path = require('path');
const fs = require('fs');

// ¿Existe la ruta?
const existsPath = (pathParam) => fs.existsSync(pathParam);
// console.log(existsPath('../prueba/prueba.js'));

// ¿Es una ruta absoluta? Si no lo es, lo convierte a absoluta
const absolutePath = (pathParam) => path.isAbsolute(pathParam) ? pathParam : path.resolve(pathParam);
// console.log(absolutePath('../prueba/prueba.js'));

// ¿El parametro es un directorio?
// const isDirectory = (pathParam) => fs.statSync(pathParam).isDirectory();
// console.log(isDirectory('../prueba'));

// ¿El parametro es un archivo?
// const isFile = (pathParam) => fs.statSync(pathParam).isFile();
// console.log(isFile('../prueba/prueba.txt'));

// ¿Tiene extensión .md?
// const fileMd = (pathParam) => path.extname(pathParam) === '.md';
// console.log(fileMd('../prueba/prueba.js'));

// const files = readDirectory('dir/b');
// const filesMd = files.filter(file => path.extname(file) === '.md');
// console.log(filesMd);


// Leer el archivo
const readFileMd = (pathParam) => {
  try {
    const data = fs.readFileSync(pathParam, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
// readFileMd('../prueba/prueba.md');

// Leer el directorio
const readDirectory = (pathParam) => fs.readdirSync(pathParam);
// console.log(readDirectory('../prueba'));



// const fileWalker = (pathParam) => {
//   let addArray = [];
//   const isFil = isFile(pathParam);
//   if (existsPath(pathParam) && isFil) {
//     if (fileMd(pathParam)) {
//       addArray.push(absolutePath(pathParam));
//     }

//   } else {
//     if (isDirectory(pathParam)) {
//       const files = readDirectory(pathParam);
//       const filesMd = files.filter(file => fileMd(path.join(pathParam, file)));
//       addArray = addArray.concat(filesMd);
//     }
//   }
//   return addArray
// }


// const fileWalker = (pathParam) => {
//   let addArray = [];
//   const isFil = isFile(pathParam);
//   if (existsPath(pathParam) && isFil) {
//     if (fileMd(pathParam)) {
//       addArray.push(absolutePath(pathParam));
//     }

//   } else {
//     if (isDirectory(pathParam)) {
//       const files = readDirectory(pathParam);
//       const filesMd = files.filter(file => fileMd(path.join(pathParam, file)));
//       addArray = addArray.concat(filesMd);

//       // Llamada recursiva para procesar subdirectorios
//       files.filter(file => isDirectory(path.join(pathParam, file)))
//         .forEach(dir => addArray = addArray.concat(fileWalker(path.join(pathParam, dir))));
//     }
//   }
//   return addArray
// }


const fileWalkerRecursive = (dir) => {
  let addArray = [];

  const isFile = (pathParam) => fs.statSync(pathParam).isFile();
  const isDirectory = (pathParam) => fs.statSync(pathParam).isDirectory();
  const fileMd = (pathParam) => path.extname(pathParam) === '.md';

  const processFile = (file) => {
    if (fileMd(file)) {
      addArray.push(absolutePath(file));
    }
  };

  const processDirectory = (directory) => {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);

      if (isFile(filePath)) {
        processFile(filePath);
      }

      if (isDirectory(filePath)) {
        const subdirectoryFiles = fileWalkerRecursive(filePath);
        addArray = addArray.concat(subdirectoryFiles);
      }
    }
  };

  processDirectory(dir);
  return addArray;
};

console.log(fileWalkerRecursive('../prueba'));



// const mdFiles = fileWalker('../prueba');
// console.log(mdFiles)

// --------ENCONTRAR LINKS -----------------------------------

// const fs = require('fs');

// const fileContent = fs.readFileSync('/ruta/al/archivo.md', 'utf-8');

// const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

// const links = fileContent.match(linkPattern);

// if (links) {
//   console.log('Se encontraron los siguientes enlaces:');
//   console.log(links);
// } else {
//   console.log('No se encontraron enlaces en el archivo.');
// }

