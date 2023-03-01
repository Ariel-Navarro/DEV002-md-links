import  mdLinks  from './mdLinks.js';
import infoTRB from './index.js';
import { helpMessage, validateFalseMessage, messageSuccces } from './templates.js';
const command = process.argv;
const path = process.argv[2];
const option1 = command[3];
const option2 = command[4];

if (command.length) {
  if (path === '--h' || path === '--help') {
    console.log(helpMessage);
  } else {
    mdLinks(path, { validate: false })
      .then((res) => validateFalseMessage(res))
      .catch((err) => console.log(err));
  }

  if (option1 === '--validate' || option1 === '--v') {
    mdLinks(path, { validate: true })
      .then((res) => messageSuccces(res))
      .catch((err) => console.log(err));
  } else if (option1 === '--stats' || option1 === '--s') {
    mdLinks(path, { validate: true })
      .then((res) => console.log(infoTRB.totalStat(res), infoTRB.uniqueLinkStat(res)))
      .catch((err) => console.log(err));
  } else if (option1 === '--h' || option1 === '--help') {
    console.log(helpMessage);
  } else {
    console.log(helpMessage);
  }

  if ((option1 === '--validate' || '--v') && (option2 === '--stats' || '--v')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(infoTRB.totalStat(res), infoTRB.uniqueLinkStat(res), infoTRB.brokenLinkStat(res)))
      .catch((err) => console.log(err));
  }
} else {
  console.log(helpMessage);
}

// node cli.js ../prueba/leg.md --validate --stats
// node cli.js ../prueba/leg.md --validate --stats
