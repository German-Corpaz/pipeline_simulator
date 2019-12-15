let chart;
let cpiChart;
export function drawChart(pipelineResult) {
  if (chart) chart.dispose();
  am4core.options.autoSetClassName = true;

  if (pipelineResult.instructions.length == 0) return;
  let dataset = buildDataset(pipelineResult.matrix, pipelineResult.instructions);
  let height = 50 * pipelineResult.instructions.length + 50;
  let lastInstruction = pipelineResult.matrix[pipelineResult.matrix.length - 1];
  let width = 50 * lastInstruction.length + 100;
  $('.chartGantt').css('height', height + 'px');
  $('.chartGantt').css('width', width + 'px');

  chart = am4core.create('ganttChart', am4charts.XYChart);
  chart.hiddenState.properties.opacity = 0;
  chart.data = dataset;

  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'name';
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.labels.template.fill = am4core.color('#ffffff');
  categoryAxis.renderer.labels.template.fontSize = 14;
  categoryAxis.renderer.minGridDistance = 1;

  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.strictMinMax = true;
  valueAxis.renderer.tooltipLocation = 0;
  valueAxis.renderer.minGridDistance = 1;
  valueAxis.renderer.labels.template.fill = am4core.color('#ffffff');
  valueAxis.renderer.labels.template.adapter.add('text', function(text, target) {
    if (text === undefined) return '';
    return text.match(/\./) ? '' : text;
  });
  var series1 = chart.series.push(new am4charts.ColumnSeries());
  series1.columns.template.width = am4core.percent(100);
  series1.columns.template.height = am4core.percent(100);

  series1.dataFields.openValueX = 'fromCycle';
  series1.dataFields.valueX = 'toCycle';
  series1.dataFields.categoryY = 'name';
  series1.columns.template.propertyFields.fill = 'color'; // get color from data
  series1.columns.template.propertyFields.stroke = 'color';
  series1.columns.template.strokeOpacity = 1;
  let level1_bullet = series1.bullets.push(new am4charts.LabelBullet());
  level1_bullet.locationY = 0.5;
  level1_bullet.locationX = 0.5;
  level1_bullet.label.text = '{instruction}';
  level1_bullet.label.fontSize = 16;
  level1_bullet.label.fill = am4core.color('#000000');
}

function buildDataset(matrix, instructions) {
  let dataset = [];
  for (let i = 0; i < instructions.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let value = matrix[i][j];
      if (value != null) {
        let data = {
          name: i + ': ' + instructions[i].fullInstruction,
          fromCycle: j,
          toCycle: j + 1,
          color: getColor(value),
          instruction: value
        };
        dataset.push(data);
      }
    }
  }
  return dataset;
}
function getColor(t) {
  switch (t) {
    case 'F':
      return '#E3F2FD';
    case 'D':
      return '#BBDEFB';
    case 'E':
      return '#90CAF9';
    case 'M':
      return '#64B5F6';
    case 'WB':
      return '#42A5F5';
    case 'S':
      return '#666666';
  }
}

export function drawCPIChart(nopipe, basicPipe) {
  // Create chart
  am4core.options.autoSetClassName = true;
  if (cpiChart) cpiChart.dispose();

  cpiChart = am4core.create('cpiChart', am4charts.XYChart);
  let dataset = buildCPIDataset(nopipe.matrix, 1);
  let dataset2 = buildCPIDataset(basicPipe.matrix, 2);

  let newData = dataset.concat(dataset2);

  cpiChart.data = newData;

  var dateAxis = cpiChart.xAxes.push(new am4charts.ValueAxis());
  dateAxis.renderer.minGridDistance = 50;
  dateAxis.renderer.labels.template.adapter.add('text', function(text, target) {
    if (text === undefined) return '';
    return text.match(/\./) ? '' : text;
  });
  dateAxis.strictMinMax = true;
  dateAxis.renderer.labels.template.fill = am4core.color('#ffffff');
  var valueAxis = cpiChart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.labels.template.adapter.add('text', function(text, target) {
    if (text === undefined) return '';
    return text.match(/\./) ? '' : text;
  });
  valueAxis.strictMinMax = true;
  valueAxis.renderer.labels.template.fill = am4core.color('#ffffff');
  var series = cpiChart.series.push(new am4charts.StepLineSeries());
  series.dataFields.valueX = 'cycle1';
  series.dataFields.valueY = 'value1';
  series.tooltipText = '{valueY.value}';
  series.strokeWidth = 3;
  var series2 = cpiChart.series.push(new am4charts.StepLineSeries());
  series2.dataFields.valueX = 'cycle2';
  series2.dataFields.valueY = 'value2';
  series2.tooltipText = '{valueY.value2}';
  series2.strokeWidth = 3;
}

function buildCPIDataset(matrix, index) {
  let cycleName = 'cycle' + index;
  let valueName = 'value' + index;
  let dataset = [];
  dataset.push({
    [cycleName]: '' + 0,
    [valueName]: 0
  });
  let instructionCount = 0;
  for (let i = 0; i < matrix.length; i++) {
    let instructionArray = matrix[i];
    if (instructionArray[instructionArray.length - 1] == 'WB') {
      dataset.push({
        [cycleName]: '' + instructionArray.length,
        [valueName]: ++instructionCount
      });
    }
  }
  return dataset;
}
