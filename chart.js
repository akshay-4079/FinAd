function drawChart(insur,postoff,stocks,mutfunds,savings) {
	  var data = google.visualization.arrayToDataTable([
	  ['Option', 'Amount'],
	  ['Insurance', savings*insur*0.01],
	  ['PostOffice & Assets', savings*postoff*0.01],
	  ['Stocks', savings*stocks*0.01],
	  ['Mutual Funds',savings*mutfunds*0.01],
	]);
	  var options = {'title':'Your Ideal Portfolio'}
	  var chart = new google.visualization.PieChart(document.getElementById('chartContainer'));
	  chart.draw(data, options);
	}