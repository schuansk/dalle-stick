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
        const { level, attack, defense } = getPower();
        figureEle.setAttribute('src', newImage.src);
        uuid = uuidv4();
        uuidEle.textContent = uuid;
        attackEle.textContent = attack;
        defenseEle.textContent = defense;
        levelEle.textContent = level;
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