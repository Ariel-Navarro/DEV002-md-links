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

async function mdLinks(arrLinks) {
  const results = await Promise.all(arrLinks.map(async (link) => {
    try {
      const response = await axios.get(link.href);
      link.message = 'Ok';
      link.status = response.status;
    } catch (error) {
      link.message = 'Fail';
      link.status = error.response ? error.response.status : 'Error request';
    }
    return link;
  }));
  return results;
}

const links = [
  { href: 'https://www.google.com', text: 'Google' },
  { href: 'https://www.github.com', text: 'GitHub' },
];

mdLinks(links).then((results) => {
  console.log(results);
}).catch((err) => {
  console.error(err);
});


// module.export = {
//   mdLinks,
//   recursiveFunction,
//   toHtmlAndExtractLinks,
// }

