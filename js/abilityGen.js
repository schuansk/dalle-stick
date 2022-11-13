const skills = [];

function loadingAbility() {
  const url = window.location.href;
  fetch(`${url}assets/json/ability.json`)
    .then(response => response.json())
    .then(({ data }) => {
      skills.push(...data);
    });
}

function getAbility() {
  const position = Math.floor(Math.random() * (skills.length)) + 1;
  return skills[position];
}


loadingAbility();