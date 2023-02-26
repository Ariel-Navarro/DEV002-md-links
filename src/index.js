const chalk = require('chalk');

const totalLinks = (arrayOfLinks) => {
  const total = arrayOfLinks.length;
  return `${chalk.rgb(168, 159, 241)('• Total: ')} ${total}`
}

const brokenLinkStat = (arrLinks) => {
  const brokenLinks = arrLinks.filter((elm) => elm.message === 'Fail');
  return `${chalk.rgb(168, 159, 241)('• Broken: ')} ${brokenLinks.length}`;
};

const uniqueLinkStat = (arrLinks) => {
  const uniqueLinks = new Set(arrLinks.map((elm) => elm.href));
  return `${chalk.rgb(168, 159, 241)('• Unique: ')} ${uniqueLinks.size}`;
};


module.exports = {
  totalLinks,
  brokenLinkStat,
  uniqueLinkStat,
};

// const fs = require('fs');
// const path = require('path');
// const marked = require('marked');
// const axios = require('axios');
// const minimist = require('minimist');

// const args = minimist(process.argv.slice(2));
// const filePath = args._[0];

// if (!filePath) {
//   console.error('Debes proporcionar una ruta de archivo');
//   process.exit(1);
// }

// const fileContents = fs.readFileSync(filePath, 'utf8');
// const links = [];

// const renderer = new marked.Renderer();
// renderer.link = (href, title, text) => {
//   links.push({
//     href,
//     text: text.slice(0, 50),
//     file: filePath,
//   });
// };

// marked(fileContents, { renderer });

// if (!args.validate) {
//   console.log(links);
//   process.exit();
// }

// async function validateLink(link) {
//   try {
//     const response = await axios.get(link.href);
//     const statusText = response.statusText.toLowerCase();
//     const status = response.status;
//     const ok = (status >= 200 && status < 300) || status === 304;

//     return {
//       ...link,
//       status,
//       statusText,
//       ok,
//     };
//   } catch (error) {
//     return {
//       ...link,
//       status: error.response?.status,
//       statusText: error.message,
//       ok: false,
//     };
//   }
// }

// (async function main() {
//   const linkPromises = links.map(validateLink);
//   const results = await Promise.all(linkPromises);

//   if (args.stats) {
//     console.log(`Total: ${results.length}`);
//     console.log(`Unique: ${new Set(results.map((result) => result.href)).size}`);
//     console.log(`Broken: ${results.filter((result) => !result.ok).length}`);
//   } else {
//     console.log(results);
//   }
// })();
