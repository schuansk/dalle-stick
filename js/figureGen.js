const figureStyles = ['a photo', '3D render', 'a cartoon'];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'gray', 'brown', 'black'];
const creatureTypes = ['', 'cute', 'scare', 'angry', 'brillant', 'obscure'];
const creatureCategories = ['monster', 'animal'];
const figureEnvironments = ['cea', 'gale', 'forest', 'sky', 'volcano', 'moon', 'city', 'fire'];
const figureIlluminations = ['light', 'dark'];

function figureGenerator() {
  const figureStyle = selectAnItemFromTheArray(figureStyles);
  const creatureColor = selectAnItemFromTheArray(colors);
  const backgroundColor = selectAnItemFromTheArray(colors);
  const creatureType = selectAnItemFromTheArray(creatureTypes);
  const creatureCategory = selectAnItemFromTheArray(creatureCategories);
  const figureEnvironment = selectAnItemFromTheArray(figureEnvironments);
  const figureIllumination = selectAnItemFromTheArray(figureIlluminations);
  const phrase =
    `${figureStyle} of a ${creatureColor} ${creatureType} ${creatureCategory} in a ${figureEnvironment} on a ${figureIllumination} ${backgroundColor} background, digital art`
  return phrase.replace(/\s+/g, ' ');
}

function selectAnItemFromTheArray(array) {
  const arrayLength = array.length;
  let item = array[Math.floor(Math.random() * arrayLength - 1) + 1];
  return item;
}