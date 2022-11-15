const levels = { 1: 5, 2: 4, 3: 2, 4: 2, 5: 1 };

function getPower() {
  const levelsList = convertObjectToWeightArray(levels);
  const level =  Number(selectAnItemFromTheArray(levelsList));
  const attack = calculateValue(level);
  const defense = calculateValue(level);
  return { level, attack, defense };
}

function calculateValue(level) {
  switch (level) {
    case 1:
      return generateRandomValue(1, 200);
    case 2:
      return generateRandomValue(201, 400);
    case 3:
      return generateRandomValue(401, 600);
    case 4:
      return generateRandomValue(601, 800);  
    default:
      return generateRandomValue(801, 999);
  }
}