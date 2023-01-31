// const fs=require('fs');
// fs.readFile('prueba.txt', 'utf-8', (error,data) => {
//   if (error){
//     console.log(`Error ${error}`)
//   }else {
//     console.log(data)
//   }
// })
const path=require('path');
// pathabsolute=path.resolve('prueba')
// console.log(pathabsolute);

// if (path.existsSync("/prueba/prueba")) {
//   console.log('si existe')
// }

const pathValidate = route => existsSync(route);
console.log(pathValidate)

