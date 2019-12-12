let chart;
export function drawChart(pipelineResult) {
  am4core.options.autoSetClassName = true;
  let dataset = buildDataset(pipelineResult.matrix, pipelineResult.instructions);
  if (chart) chart.dispose();
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
  valueAxis.renderer.minGridDistance = 70;
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
      return '#A30B37';
    case 'D':
      return '#92D5E6';
    case 'E':
      return '#6A0F49';
    case 'M':
      return '#0C7C59';
    case 'WB':
      return '#A1EF8B';
    case 'S':
      return '#aaaaaa';
  }
}
