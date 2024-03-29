var dataPoints = [
    ['Date', 'Level'],
    ['1/4/2016', 3],
    ['1/5/2016', 3],
    ['1/6/2016', 4],
    ['1/7/2016', 1],
    ['1/9/2016', 4],
    ['1/11/2016', 6],
    ['1/12/2016', 2],
    ['1/13/2016', 3],
    ['1/14/2016', 5],
    ['1/16/2016', 2],
    ['1/18/2016', 2],
    ['1/20/2016', 3],
    ['1/23/2016', 6],
    ['1/25/2016', 4],
    ['1/27/2016', 4],
    ['1/30/2016', 1]
  ];
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var fullDate = (month + "/" + day + "/" + year);
  var scores = dataPoints.filter(function(dataPoint) {
      return Number.isInteger(dataPoint[1]);
    })
    .map(function(dataPoint) {
      return dataPoint[1];
    });
  
  calculateAverage(scores);
  function calculateAverage(numbers) {
    var sum = numbers.reduce(function(a, b) {
      return a + b;
    });
    var average = (sum / numbers.length).toFixed(1);
    $('#avg').html(average);ß
    return average;
  }
  