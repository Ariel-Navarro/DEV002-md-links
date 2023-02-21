const api = require('./api');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identifica si la ruta existe
    if (api.existsPath(path)) {
      // ¿Es una ruta absoluta? Si no lo es, lo convierte a absoluta
      api.absolutePath(path)
        // ¿El parametro es un directorio?
        if (api.recursiveFunction(path).length > 0) {
          const a = toHtmlAndExtractLinks(path);
          if (options.validate === true) {
            api.linkIsActive(a)
          }
      }

    } else {
      // Si no existe la ruta se rechaza la promesa
      reject('La ruta no existe')
    }
  })
}
