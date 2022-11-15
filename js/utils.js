function selectAnItemFromTheArray(array) {
  const arrayLength = array.length;
  let item = array[Math.floor(Math.random() * arrayLength - 1) + 1];
  return item;
}

function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}