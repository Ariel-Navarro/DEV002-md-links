// // Buscar un archivo .md para guardarlos en un array.
// const fileWalker = (pathParam) => {
//   const pathExist = existsPath(pathParam);
//   const pathAbsolute = absolutePath(pathExist);
//   let addArray = [];
//   if (pathAbsolute(pathAbsolute) && isFile(pathParam)){
//     if (fileMd(pathAbsolute)){
//       addArray.push(pathAbsolute);
//     }
//   }else {
//     const readDirectory = readDirectory(pathParam);
//     readDirectory.map((pathParam) => {
//       addArray = addArray.concat(fileWalker(path.join(pathAbsolute, pathParam)));
//     });
//   }
//   return addArray;
// }

// // Extraer links de un archivo .md
// const getLinkMd = (pathParam) => {
//   const mdLinks = fileWalker(pathParam);
//   let addLinks = [];
//   mdLinks.map((file) => {
//     const readFileMd = readFileMd(file);
//     const server = new marked.Renderer();
//     server.link = (href, text, file) => {
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


