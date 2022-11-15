const vowal = { 'a': 5, 'e': 4, 'i': 3, 'o': 4, 'u': 2 }
const consonant = { 'b': 4, 'c': 4, 'd': 4, 'f': 4, 'g': 4, 'j': 1, 'k': 1, 'l': 4, 'm': 4, 'n': 3, 'p': 4, 'q': 4, 'r': 3, 's': 3, 't': 4, 'v': 4, 'w': 1, 'x': 1, 'y': 1, 'z': 1 };

function syllable(firstSyllable) {
  const includeLetter = Math.random() < 0.5;
  const availableConsonant = convertObjectToWeightArray(consonant);
  let selectedConsonant = availableConsonant[Math.floor(Math.random() * availableConsonant.length - 1) + 1];
  switch (selectedConsonant) {
    case 'l':
    case 'n':
      if(includeLetter) selectedConsonant += 'h';
      break;
    case 'q':
      selectedConsonant += 'u';
      break; 
    case 's':
      if(includeLetter && !firstSyllable) selectedConsonant += 's';
      break; 
    case 'b': 
      if(includeLetter && !firstSyllable) selectedConsonant = `m${selectedConsonant}`;
      break; 
    case 'g': 
      if(includeLetter) selectedConsonant += 'u';
      break;
    case 'r':
      if(includeLetter && !firstSyllable) selectedConsonant += 'r';
      break;  
    default:
      break;
  }
  const vowalList = convertObjectToWeightArray(vowal);
  let availableVowels = vowalList;
  switch (selectedConsonant[selectedConsonant.length - 1]) {
    case 'u':
      availableVowels = removeByValue(availableVowels, 'u');
      break;
    case 'y':
      availableVowels = removeByValue(availableVowels, 'i');
      break;
    default:
      break;
  }
  selectedVowal =
    availableVowels[Math.floor(Math.random() * availableVowels.length - 1) + 1];
  return `${selectedConsonant}${selectedVowal}`;
}

async function wordGenerator(limit) {
  const numberOfSyllable =
    Math.floor(Math.random() * (limit - 2 + 1)) + 2;
  const syllables = [];
  for (let index = 0; index < numberOfSyllable; index++) {
    syllables.push(syllable(index === 0));
  }
  let word = syllables.join('');
  const newFirstLetter = await startWithVowelOrNot(word);
  if (typeof newFirstLetter !== 'undefined') {
    word = newFirstLetter + word;
  }
  const firstLetterToUpperCase = word[0];
  const newWord = word.replace(firstLetterToUpperCase, firstLetterToUpperCase.toUpperCase());
  return newWord;
}

async function nameGenerator() {
  const itWillBeComposed = Math.random() < 0.5;
  const firstName = await wordGenerator(4);
  if (itWillBeComposed) {
    const secondName = await wordGenerator(3);
    return `${firstName} ${secondName}`;
  }
  return firstName;
}

function startWithVowelOrNot(word) {
  const vowalList = Object.keys(vowal);
  const shouldYouStartWithTheVowel = Math.random() < 0.5;
  const currentFirstLetter = word[0];
  const promise = new Promise((resolve) => {
    let newFirstLetter;
    if (shouldYouStartWithTheVowel) {
      do {
        newFirstLetter = vowalList[Math.floor(Math.random() * vowalList.length - 1) + 1];
      } while (newFirstLetter === currentFirstLetter);
      resolve(newFirstLetter);
    }
    resolve();
  });
  return promise;
}

function removeByValue(array, value) {
  const newArray = array.filter(element => element !== value);
  return newArray;
}