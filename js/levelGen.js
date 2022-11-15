const levels = [1, 2, 3, 4, 5];

function getPower() {
  const level = selectAnItemFromTheArray(levels);
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