import fetch from 'node-fetch';

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

const testandoExemplo2 = () => {
  let cepBuscado;
  console.log('Buscando Cep');
  cepBuscado = buscarCep('13845373');
  console.log('CEP buscado');
  console.log(`Cep encontrado: ${cepBuscado}`);
};

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

export { testandoExemplo1, testandoExemplo2 };
