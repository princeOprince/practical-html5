const coffeeSales = [
  'Jan, 170',
  'Feb, 320',
  'Mar, 432',
  'Apr, 548',
  'May, 342',
  'Jun, 689',
  'Jul, 344',
  'Aug, 109',
  'Sep, 655',
  'Oct, 327',
  'Nov, 109',
  'Dec, 235'
];

function drawChart() {
  const canvas = document.getElementById('barChart');
  const context = canvas.getContext('2d');
  createBarChart(context, coffeeSales, 30, 20, (canvas.height - 20), 50);
}

function createBarChart(context, data, startX, barWidth, chartHeight, markDataIncrementsIn) {

  context.lineWidth = "1.2";
  const startY = 780;

  createAxis(context, startX, startY, startX, 30);    //vertical axis
  createAxis(context, startX, startY, 650, startY);   //horizontal axis

  context.lineWidth = "0.0";
  let maxValue = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i].split(",");
    const itemName = item[0];
    const itemValue = parseInt(item[1]);
    if (itemValue > maxValue) maxValue = itemValue;

    context.fillStyle = "blue";
    createBar(context, 20 + startX + (2.5 * i * barWidth), (chartHeight - itemValue), barWidth, itemValue);

    context.textAlign = "left";
    context.fillStyle = "black";
    context.fillText(itemName, 20 + startX + (2.5 * i * barWidth), chartHeight + 15, 200);
  }
}

function createAxis(context, startx, starty, endx, endy) {
  context.beginPath();
  context.moveTo(startx, starty);
  context.lineTo(endx, endy);
  context.closePath();
  context.stroke();
}

function createBar(context, x, y, width, height) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.closePath();
  context.stroke();
  context.fill();
}