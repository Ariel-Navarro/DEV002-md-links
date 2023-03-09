const mdLinks = require("./mdLinks");
const index = require("./index");
const templates = require("./templates");
const command = process.argv;
const path = process.argv[2];
const option1 = command[3];
const option2 = command[4];

if (command.length) {
  if (path === '--h' || path === '--help') {
    console.log(templates.helpMessage);
  }
  // else {
  //   mdLinks.mdLinks(path, { validate: false })
  //     .then((res) => templates.validateFalseMessage(res))
  //     .catch((err) => console.log(err));
  // }

  if (option1 === '--validate' || option1 === '--v') {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => templates.messageSuccess(res))
      .catch((err) => console.log(err));
  } else if (option1 === '--stats' || option1 === '--s') {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => console.log(index.totalLinks(res), index.uniqueLinkStat(res)))
      .catch((err) => console.log(err));
  } else if (option1 === '--h' || option1 === '--help') {
    console.log(templates.helpMessage);

  } else if ((option1 === '--validate' || '--v') && (option2 === '--stats' || '--v')) {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => console.log(index.totalLinks(res), index.uniqueLinkStat(res), index.brokenLinkStat(res)))
      .catch((err) => console.log(err));
  } else {
    console.log(templates.helpMessage);
  }
} else {
    console.log(templates.helpMessage);
  }
  
// node cli.js ../prueba/leg.md --h
// node cli.js ../prueba/leg.md --validate --stats
