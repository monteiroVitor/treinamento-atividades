//Atividade da aula no dia 10/12/2020

/* 
Prática 1 - Crie um lista com 10 valores e escreva quantos desses valores lidos estão no intervalo [10,20] 
(inlcuindo os valores 10 e 20 no intervalo) e quantos deles estão fora deste intervalo.
*/

const pratica1 = (list) => {
  const between = list.filter((num) => num >= 10 && num <= 20);
  return `Quantidade de números entre 10 e 20: ${between.length}, os numeros são: ${between}`;
};

/*
Pratica 2 - Faça um programa que leia uma lista A e uma lista B de inteiros de 10 posições. Depois gere 
uma lista C que será o produto dos valores correspondentes dos vetores A e B.
*/

const pratica2 = (listA, listB) => {
  const listC = [];
  for (let i in listA) listC.push(listA[i] * listB[i]);
  return listC;
};

/*
Pratica 3 - Crie duas listas de 10 posições e crie uma terceira lista contendo, nas posições pares os
valores do primeira lista e nas posições impares os valores do segunda lista.
*/

const pratica3 = (listA, listB) => {
  const listC = [];
  listA.forEach((num, idx) => {
    listC.push(listB[idx]);
    listC.push(num);
  });
  return listC;
};

export { pratica1, pratica2, pratica3 };
