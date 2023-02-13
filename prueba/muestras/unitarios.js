const FileWaler = (pathParam) => {
  if (existsPath(pathParam)) {
    console.log('Sí existe')
  } else {
    console.log('No existe')
  }
}
FileWaler('../prueba.txt')

const absoluteRuta = (pathParam) => {
  if (absolutePath(pathParam)) {
    console.log('sí es absoluta')
  } else {
    console.log('No es absoluta')
  }
}
absoluteRuta('../prueba.md')

try {
  filePath = '../prueba/prueba.md'
  const fileStats = fs.statSync(filePath);
  console.log(`Size of ${filePath}: ${fileStats.size} bytes`);
} catch (error) {
  console.error(`Error reading file: ${error}`);
}

const readFileMd = (pathParam) => fs.readFile(pathParam, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
console.log(readFileMd('../prueba/prueba.md'));
