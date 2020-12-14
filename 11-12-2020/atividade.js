import fetch from 'node-fetch';
import fs from 'promise-fs';

//slide - 40
const testandoExemplo1 = () => {
  function fazRequisicao() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolvida');
      }, 5000);
    });
  }

  fazRequisicao()
    .then(console.log)
    .catch(console.log)
    .finally(() => console.log('finalizando...'));

  console.log('Fazendo o meu teste');
};

//slide - 41
const testandoExemplo2 = () => {
  let cepBuscado;
  console.log('Buscando Cep');
  cepBuscado = buscarCep('13845373');
  console.log('CEP buscado');
  console.log(`Cep encontrado: ${cepBuscado}`);
};

//meu exemplo de promise
const novoExemploPromise = () => {
  fs.readFile('./text.txt')
    .then((content) => String(content))
    .then((stringContent) => stringContent.split(/\n/g))
    /*.then pode receber 2 funções:
      1 - lidar com a resolved
      2 - lidar com a rejected
      Portanto se meu .then ou na resolução da promise eu tiver um err eu posso usar o .then
      para "capturar" o error
      Ex:
      .then(
        (arrayContent) => console.log(arrayContent),
        (err) => console.log(err.message)
      )
    */
    .then((arrayContent) => console.log(arrayContent))
    .catch((err) => console.log(err.message))
    /* .catch é um .then(null, lidarComOError)
       Ex:
      .then(null, (err) => {
        console.log(err.message);
      })
    */
    /* .then após .catch ou .then que "lida" com o error será executado sempre, "meio que um .finally"
      Ex:
      .then(() => console.log('Não importa o que aconteça eu vou ser chamado'));
     */
    .finally(() =>
      console.log('Não importa o que aconteça eu vou ser chamado')
    );
};

//Função que faz o fetch - slide 41
function buscarCep(parametro) {
  let cep;
  fetch(`https://viacep.com.br/ws/${parametro}/json/`)
    .then((res) => res.json())
    .then((data) => {
      cep = data.cep;
      console.log(`.then Cep encontrado: ${cep}`);
    })
    .catch(console.error);
  return cep;
}

export { testandoExemplo1, testandoExemplo2, novoExemploPromise };
