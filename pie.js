var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');
// Global Options:
 Chart.defaults.global.defaultFontColor = 'black';
 Chart.defaults.global.defaultFontSize = 16;
var data = {
    labels: ["1", "2", "3","4", "5", "6"],
      datasets: [
        {
            fill: true,
            backgroundColor: [
                '#ED1C24',
                '#F68B1F',
                 '#E7E116',
                  '#57B947',
              '#4D6DB4',
              '#5B4EA0',       ],
            data: [10,10,10,10,10,10],
// Notice the borderColor 
            // borderColor:	['black', 'black'],
             borderWidth: [0,0,0,0,0,0]
        }
    ]
};

// Notice the rotation from the documentation.
var options = {
        title: {
                  display: true,
                  text: 'Emotional Balance',
                  position: 'top'
              },
        rotation: -0.7 * Math.PI
};
// Chart declaration:
var myBarChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
