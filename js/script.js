const OPENAI_TOKEN = '';
const figureEle = document.getElementById('figure');
const attackEle = document.getElementById('attack');
const defenseEle = document.getElementById('defense');
const levelEle = document.getElementById('level');
const titleEle = document.getElementById('title');
const abilityEle = document.getElementById('ability');
const uuidEle = document.getElementById('uuid');
let uuid = '';

const handleNewCard = document.getElementById('generate');
handleNewCard.addEventListener('click', pupulateCard);
document.getElementById('save').addEventListener('click', renderCanva)

function pupulateCard() {
  handleNewCard.querySelector('span').innerText = 'Gerando...';
  const attackValue = generateRandomValue();
  const defenseValue = generateRandomValue();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${OPENAI_TOKEN}`);
  const raw = JSON.stringify({
    'prompt': figureGenerator(),
    'n': 1,
    'size': '256x256',
    'response_format': 'b64_json',
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch('https://api.openai.com/v1/images/generations', requestOptions)
    .then(response => response.json())
    .then(async (response) => {
      const [ { b64_json } ] = response.data;
      const newImage = new Image();
      newImage.src = `data:image/png;base64,${b64_json}`;
      newImage.decode().then(async () => {
        figureEle.setAttribute('src', newImage.src);
        uuid = uuidv4();
        uuidEle.textContent = uuid;
        attackEle.textContent = attackValue;
        defenseEle.textContent = defenseValue;
        const level = calculateLevel(attackValue, defenseValue)
        const recalculatedLevel = (attackValue >= 850 || defenseValue >= 850) && level < 4 ? level + 1 : level;
        levelEle.textContent = recalculatedLevel;
        titleEle.textContent = await nameGenerator();
        abilityEle.textContent = getAbility();
        setTimeout(changeBorderColor, 10);
        handleNewCard.querySelector('span').innerText = 'Gerar novamente';
      });
    })
    .catch(error => {
      handleNewCard.querySelector('span').innerText = 'Tentar novamente';
      console.log('error', error);
      alert('Ocorreu um erro.');
    });
}

function generateRandomValue() {
  return Math.floor(Math.random() * (999 - 1 + 1)) + 1;
}

function calculateLevel(attackValue, defenseValue) {
  const average = (attackValue + defenseValue) / 2;
  if (average <= 200) {
    return 1;
  } else if (average > 200 && average <= 400) {
    return 2;
  } else if (average > 400 && average <= 600) {
    return 3;
  } else if (average > 600 && average <= 800) {
    return 4;
  } else {
    return 5;
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function renderCanva() {
  const container = document.querySelector('.container');
  container.style.borderRadius = 0;
  html2canvas(container, {
    logging: false,
  })
    .then((canvas) => saveAs(canvas.toDataURL()))
    .catch((error) => console.error(error))
    .finally(() => {
      container.style.borderRadius = '40px';
    });
}

function saveAs(uri) {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = `${uuid}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}