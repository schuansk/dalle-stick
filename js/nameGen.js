const vowal = ['a', 'a', 'a', 'a', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'u', 'u'];
const consonant = ['b', 'b', 'c', 'c', 'd', 'd', 'f', 'f', 'g', 'g', 'j', 'k', 'l', 'l', 'm', 'm', 'n', 'n', 'n', 'p', 'p', 'q', 'q', 'r', 'r', 'r', 's', 's', 's', 't', 't', 'v', 'v', 'w', 'x', 'y', 'z'];

function syllable(firstSyllable) {
  const includeLetter = Math.random() < 0.5;
  let selectedConsonant =
    consonant[Math.floor(Math.random() * consonant.length - 1) + 1];
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
    default:
      break;
  }
  let availableVowels = vowal;
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
  const shouldYouStartWithTheVowel = Math.random() < 0.5;
  const currentFirstLetter = word[0];
  const promise = new Promise((resolve) => {
    let newFirstLetter;
    if (shouldYouStartWithTheVowel) {
      do {
        newFirstLetter = vowal[Math.floor(Math.random() * vowal.length - 1) + 1];
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