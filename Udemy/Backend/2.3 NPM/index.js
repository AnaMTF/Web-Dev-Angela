//var generateName = require("sillyname");
import generateName from "sillyname";
import superheroes from "superheroes";
import supervillains from "supervillains";

var sillyName = generateName();
var superHeroName = superheroes.random();
var superVillainName = supervillains.random();

console.log(`My name is ${sillyName}`);
console.log(
    `My superhero name is ${superHeroName} and I am going to fight ${superVillainName}!`
);
