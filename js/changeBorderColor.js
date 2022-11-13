function changeBorderColor() {
  const imageEle = document.getElementById('figure');
  const elements = document.getElementsByClassName('border');
  const colors = getColors(draw(imageEle));
  const color = getProdominantColor(colors);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.borderColor = `#${color}`;
  }
}

function draw(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext('2d');
  context.width = canvas.width = image.width;
  context.height = canvas.height = image.height;
  context.clearRect (0, 0, context.width, context.height);
  context.drawImage(image, 0, 0, image.width, image.height);
  return context;
}

function getColors(context) {
  let column, colors = {};
  let pixels, red, green, blue, alpha;
  red = green = blue = alpha = 0;
  pixels = context.getImageData(0, 0, context.width, context.height);
  for (var i = 0, data = pixels.data; i < data.length; i += 4) {
    red = data[i];
    green = data[i + 1];
    blue = data[i + 2];
    alpha = data[i + 3];
    if (alpha < (255 / 2)) continue; 
    column = rgbToHex(red, green, blue);
    if (!colors[column]) colors[column] = 0;
    colors[column]++;
  }
  return colors;
}

function rgbToHex(red, greem, blue) {
  if (red > 255 || greem > 255 || blue > 255)
    throw "Invalid color component";
  return ((red << 16) | (greem << 8) | blue).toString(16);
}

function getProdominantColor(colors) {
  let totalOfPixels = 0;
  let color;
  for (var hex in colors) {
    if (colors[hex] > totalOfPixels) {
      color = pad(hex);
      totalOfPixels = colors[hex];
    }
  }
  return color;
}

function pad(hex) {
  return ("000000" + hex).slice(-6);
}
