import { pratica1, pratica2, pratica3 } from './atividade-1.js';

const newArray = (size) => {
  const list = [];
  for (let i = 0; i < size; i++) {
    const num = Math.floor(Math.random() * 20) + 1;
    list.push(num);
  }
  return list;
};

const listA = newArray(10);
const listB = newArray(10);

console.log(`Array 1: ${listA} | Array 2: ${listB}`);

console.log('Pratica 1:', pratica1(listA));
console.log(`Pratica 2: ${pratica2(listA, listB)}`);
console.log(`Pratica 3: ${pratica3(listA, listB)}`);
