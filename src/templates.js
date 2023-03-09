/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const chalk = require('chalk');

const introMessage = chalk.bgMagenta.bold('¡Bienvenido! Este es un programa que le ayudará a identificar el estado de los enlaces del o los archivo(s) Markdown (.md) deseado(s). '
+ 'También, le permite conocer algunas estadísticas . \n'
+ `Para conocer los comandos que puedes utilizar, por favor escribe ${chalk.white.bold('--h')}. \n`);


const helpMessage = `
  ${chalk.white.bold.underline('Prueba:')} ${chalk.rgb(168, 159, 241)('mdLinks')} <path-to-file> ${chalk.rgb(239, 255, 0)('[options]')}

  ${chalk.inverse.green('Options:')}

      ${chalk.rgb(239, 255, 0)('--validate | --v')}                 ----->     Devuelve la siguiente información: href, text, file y también el mensaje y status.
      ${chalk.rgb(239, 255, 0)('--stats | --s')}                    ----->     Devuelve estadísticas: el total de enlaces así como los unicos.
      ${chalk.rgb(239, 255, 0)('--validate --stats | --v --s')}     ----->     Devuelve la estadisticas de los enlaces totales,unicos y rotos.
      ${chalk.rgb(239, 255, 0)('--help | --h')}                     ----->     Para mostrarte una guía práctica de cómo usar el programa cada que lo necesites.

  ${chalk.white.bold.underline('Puedes poner de ruta un directorio o un archivo:')}

  $ ${chalk.italic.magenta('mdLinks prueba --validate')}
  ╔
  ║ ${chalk.rgb(168, 159, 241)('• href:')} 'https://www.google.com/',
  ║ ${chalk.rgb(168, 159, 241)('• text:')} 'Google',
  ║ ${chalk.rgb(168, 159, 241)('• file:')} 'C:\\Users\\USUARIO\\Documents\\mdLinks\\prueba,
  ║ ${chalk.cyan('message: Ok')},
  ║ ${chalk.cyan('status: 200')}
  ╚
  --------------------------------------------------------------------------------------------------------
  $ ${chalk.italic.magenta('mdLinks prueba --stats')}
  ${chalk.rgb(168, 159, 241)('• Total:')}: 3
  ${chalk.rgb(168, 159, 241)('• Unique:')} 3
  --------------------------------------------------------------------------------------------------------
  $ ${chalk.italic.magenta('mdLinks prueba --validate --stats')}
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
 ${chalk.rgb(168, 159, 241)('• text :')} ${el.text},
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

console.log(introMessage,helpMessage)

module.exports = {
  introMessage,
  helpMessage,
  validateFalseMessage,
  messageSuccess,
}
