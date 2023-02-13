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

// Función recursiva--------------------------------------------------------

const fileWalkerRecursive = (dir) => {
  let addArray = [];

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

// console.log(fileWalkerRecursive('../prueba'));

// --------ENCONTRAR LINKS -----------------------------------
const foundLinks = (ruta) => {
  const readFileMd = (pathParam) => {
    try {
      const data = fs.readFileSync(pathParam, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const fileContent = readFileMd(ruta);
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = fileContent && fileContent.match(linkPattern);

  if (links) {
    const json = JSON.stringify(links, null, 2);
    console.log('Se encontraron los siguientes enlaces:');
    console.log(json);
  } else {
    console.log('No se encontraron enlaces en el archivo.');
  }
}




console.log(foundLinks('../prueba/prueba2/prueba3/hijoDePrueba3/nietoDePrueba3/nietoPrueba3.md'))


