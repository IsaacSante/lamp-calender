google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataPoints);
    var options = {
      // title: 'Mood Chart',
      curveType: 'function',
      chartArea: {
        // leave room for y-axis labels
        width: '94%'
      },
  
      legend: {
        position: 'bottom',
      },
      
      backgroundColor: { fill:'transparent' },
     height: 500,
  
      height: 500,
      width: 1000,
      alignment: 'left',
      lineWidth: 2,
      pointSize: 10,
      dataOpacity: 1,
      hAxis: {
        textStyle: { color: 'black', 
                     fontName: 'Cormorant', 
                     fontSize: '20' },
        
        title: 'Date',
        slantedText: 'true',
        gridlines: {
          count: -1
        }
      },
      vAxis: {
        textStyle: { color: 'black', 
                     fontName: 'Cormorant', 
                     fontSize: '20' },
      
        maxValue: 6,
        minValue: 1,
        gridlines: {
          count: -1
        }
      }
    };
  
    
  
  
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
    chart.draw(data, options);
  }
  