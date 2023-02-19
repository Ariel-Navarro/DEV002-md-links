const path = require('path');
const fs = require('fs');

const marked = require('marked');
const { JSDOM } = require('jsdom');

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

  return recursiveFunction(ruta);
};

toHtmlAndExtractLinks('../prueba/prueba2/prueba3/hijoDePrueba3').then((links) => {
  console.log(links);
}).catch((err) => {
  console.error("error"+err);

});


// Status del link --------------------------------------------------------------------

const axios = require('axios');


const mdLinks = (arrLinks) => {
  const linksStatus = arrLinks.map((el) => new Promise((resolve) => {
    const link = () => axios.get(el.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          el.message = 'Ok';
          el.status = response.status;
          resolve(el);
        } else {
          el.message = 'Fail';
          el.status = response.status;
          resolve(el);
        }
      }).catch(() => {
        el.message = 'Fail';
        el.status = 'Error request';
        resolve(el);
      });
    link();
  }));
  return Promise.all(linksStatus);
};

module.export = {
  mdLinks,
  recursiveFunction,
  toHtmlAndExtractLinks,
}

