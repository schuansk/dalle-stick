const skills = [];

function loadingAbility() {
  const baseUrl = window.location.origin;
  fetch(`${baseUrl}/assets/json/ability.json`)
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