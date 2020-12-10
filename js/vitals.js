$(function () {
	$('#stop').hide();
	var requestInterval;
	//handle start button
	$('#start').click(() => {
		$('#start').hide();
		$('#stop').show();

		requestInterval = setInterval(() => {
			$.get('https://4tjqstr2vc.execute-api.us-east-2.amazonaws.com/test/vitalFunction', data => {
				$('#infoTable tbody').append('<tr class="row100 body">' +
					'<td class="cell100 column1">' + data.date + '</td>' +
					'<td class="cell100 column2">' + data.time + '</td>' +
					'<td class="cell100 column3">' + data.HR + '</td>' +
					'<td class="cell100 column4">' + data.BP.values[0]+ "," + data.BP.values[1] + '</td>' +
					'<td class="cell100 column5">' + data.Pulse + '</td>' +
					'<td class="cell100 column6">' + data.OSat + '</td>' +
					'<td class="cell100 column7">' + data.Temp + '</td>' +
					'<td class="cell100 column8">' + data.Resp + '</td>' +
					'</tr>');
			});
		}, 5000);
	});
	//handle stop button
	$('#stop').click(() => {
		$('#start').show();
		$('#stop').hide();
		clearInterval(requestInterval);
	});
	//handle clear button
	$('#clear').click(() => {
		$('#infoTable').empty();
	});

	$('.column100').on('mouseover', function () {
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable') + "";
		var column = $(this).data('column') + "";

		$(table2).find("." + column).addClass('hov-column-' + verTable);
		$(table1).find(".row100.head ." + column).addClass('hov-column-head-' + verTable);
	});

	$('.column100').on('mouseout', function () {
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable') + "";
		var column = $(this).data('column') + "";

		$(table2).find("." + column).removeClass('hov-column-' + verTable);
		$(table1).find(".row100.head ." + column).removeClass('hov-column-head-' + verTable);
	});
});