const mdLinks = require('./api2.js');
const infoTRB = require('./index.js');
const templates = require('./templates.js')
const command = process.argv;
const path = process.argv[2];
const option1 = command[3];
const option2 = command[4];

if (command.length) {
  if (path === '--h' || path === '--help') {
    console.log(templates.helpMessage);
  } else {
    mdLinks.mdLinks(path, { validate: false })
      .then((res) => templates.validateFalseMessage(res))
      .catch((err) => console.log(err));
  }

  if (option1 === '--validate' || option1 === '--v') {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => templates.messageSuccces(res))
      .catch((err) => console.log(err));
  } else if (option1 === '--stats' || option1 === '--s') {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => console.log(stats.totalStat(res), stats.uniqueLinkStat(res)))
      .catch((err) => console.log(err));
  } else if (option1 === '--h' || option1 === '--help') {
    console.log(templates.helpMessage);
  } else {
    console.log(templates.helpMessage);
  }

  if ((option1 === '--validate' || '--v') && (option2 === '--stats' || '--v')) {
    mdLinks.mdLinks(path, { validate: true })
      .then((res) => console.log(stats.totalStat(res), stats.uniqueLinkStat(res), stats.brokenLinkStat(res)))
      .catch((err) => console.log(err));
  }
} else {
  console.log(templates.helpMessage);
}

// node cli.js ../prueba/leg.md --validate --stats
