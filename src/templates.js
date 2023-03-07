/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const chalk = require('chalk');

 const introMessage = ' Welcome to sanmdlinks! This is a tool that allows you to identify the state of the links of the desired Markdown (.md) file.'
+ ' It offers \n support for both files and directories. Also, it lets you know some interesting statistics! \n'
+ ` To know how it works, please type the command ${chalk.white.bold('--h')} to offer help. \n`;

 const helpMessage = `
  ${chalk.white.bold.underline('Usage:')} ${chalk.rgb(168, 159, 241)('mdLinks')} <path-to-file> ${chalk.rgb(239, 255, 0)('[options]')}

  ${chalk.white.bold.underline('Options:')}

      ${chalk.rgb(239, 255, 0)('--validate | --v')}                 ----->     Return links with they status and messages.
      ${chalk.rgb(239, 255, 0)('--stats | --s')}                    ----->     Show statics like total and unique.
      ${chalk.rgb(239, 255, 0)('--validate --stats | --v --s')}     ----->     Show total, unique and broken statics links.
      ${chalk.rgb(239, 255, 0)('--help | --h')}                     ----->     Brings informartion about usage and options.

  ${chalk.white.bold.underline('For example:')} in this case we will enter the name of a directory:

  $ mdLinks prueba --validate
  ╔
  ║ ${chalk.rgb(168, 159, 241)('• href:')} 'https://www.npmjs.com/',
  ║ ${chalk.rgb(168, 159, 241)('• text:')} 'Sitio oficial de npm (en inglés)',
  ║ ${chalk.rgb(168, 159, 241)('• file:')} 'C:\\Users\\USUARIO\\Documents\\Labo\\md-links\\prueba-1,
  ║ ${chalk.cyan('message: Ok')},
  ║ ${chalk.cyan('status: 200')}
  ╚
  --------------------------------------------------------------------------------------------------------
  $ mdLinks prueba --stats
  ${chalk.rgb(168, 159, 241)('• Total:')}: 3
  ${chalk.rgb(168, 159, 241)('• Unique:')} 3
  --------------------------------------------------------------------------------------------------------
  $ mdLinks prueba.md --validate --stats
  ${chalk.rgb(168, 159, 241)('• Total:')} 3
  ${chalk.rgb(168, 159, 241)('• Unique:')} 3
  ${chalk.rgb(168, 159, 241)('• Broken:')} 1
`;

 const validateFalseMessage = (resParameter) => resParameter.forEach((el) => console.log(`╔
║ ${chalk.rgb(168, 159, 241)('• href: ')} ${el.href},
║ ${chalk.rgb(168, 159, 241)('• text: ')} ${el.text},
║ ${chalk.rgb(168, 159, 241)('• file: ')} ${el.file}
╚`));

 const messageSuccess = (resParameter) => {
  resParameter.forEach((el) => {
    if (el.message === 'Ok') {
      console.log(` ${chalk.rgb(168, 159, 241)('• href:')} ${el.href},
 ${chalk.rgb(168, 159, 241)('• text:')} ${el.text},
 ${chalk.rgb(168, 159, 241)('• file:')} ${el.file},
 ${chalk.cyan('message:')} ${el.message},
 ${chalk.cyan('status:')} ${el.status}`);
    } else {
      console.log(` ${chalk.rgb(168, 159, 241)('• href:')} ${el.href},
 ${chalk.rgb(168, 159, 241)('• text:')} ${el.text},
 ${chalk.rgb(168, 159, 241)('• file:')} ${el.file},
 ${chalk.red('message:')} ${el.message},
 ${chalk.red('status:')} ${el.status}`);
    }
  });
};

module.exports = {
  introMessage,
  helpMessage,
  validateFalseMessage,
  messageSuccess,
}
