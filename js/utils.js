function selectAnItemFromTheArray(array) {
  const arrayLength = array.length;
  let item = array[Math.floor(Math.random() * arrayLength - 1) + 1];
  return item;
}

function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertObjectToWeightArray(data) {
  const dataString = Object.entries(data).map(([value, quantity]) => multiplyData(value, quantity)).join('');
  const dataArray = dataString.replaceAll(',', '').split('');
  const dataShuffle = shuffle(dataArray);
  return dataShuffle;
}

function multiplyData(value, length) {
  const newArray = [];
  for (let i = 0; i < length; i++) {
    newArray.push(value);
  }
  return newArray;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}