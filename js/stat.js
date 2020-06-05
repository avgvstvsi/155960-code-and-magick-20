'use strict';
// Объявляем константы и переменные
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGHT = 270; // Высота облока
var CLOUD_X = 100; // Положение балуна по X
var CLOUD_Y = 10; // Положение балуна по Y
var GAP = 10; // Зазор между облоками
var BAR_HEIGHT = 150; // Максимальная высота гистограммы
var COLUMN_WIDTH = 40; // Ширина колонки
var COLUMN_GAP = 50; // Расстояние между колонками
var BOTTOM_GAP = 20; // Нижний padding белого облака

// Отрисовываем облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Находим максимальный элемент в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Отрисовка
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Отрисовываем текст
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Максимальное время прохождения массива
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    var columnColor;

    if (players[i] === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    } else {
      columnColor = 'hsl(240, ' + Math.random() * 100 + '%, 40%)';
    }

    ctx.fillStyle = '#000';
    // Отрисовываем счёт
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT + CLOUD_Y - (times[i] / maxTime * BAR_HEIGHT) - 16 - BOTTOM_GAP - 10);
    // Отрисовываем имя
    ctx.fillText(players[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT + CLOUD_Y - BOTTOM_GAP);
    ctx.fillStyle = columnColor;
    // Отрисовываем Колонку
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT + CLOUD_Y - (times[i] / maxTime * BAR_HEIGHT) - 16 - BOTTOM_GAP, COLUMN_WIDTH, (times[i] / maxTime * BAR_HEIGHT));
  }
};
