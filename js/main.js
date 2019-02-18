$(function () {
	$('#main').hide();
	$('#passwdfield').focus();
	$('#stop').hide();
	//form submit to check for valid password
	$('#passwd').submit((e) => {
		e.preventDefault();
		if ($('#passwdfield').val() == 'awsiot') {
			$('#top').hide();
			$('#main').show();
		}
	});
	var requestInterval;
	//handle start button
	$('#start').click(() => {
		$('#start').hide();
		$('#stop').show();
		requestInterval = setInterval(() => {
			$.get('https://55yc79y6i0.execute-api.us-east-1.amazonaws.com/Test/vitals', data => {
				console.log(data);
				$('#infoTable tbody').append('<tr class="row100 body">' +
					'<td class="cell100 column1">' + data.date + '</td>' +
					'<td class="cell100 column2">' + data.time + '</td>' +
					'<td class="cell100 column3">' + data.BP + '</td>' +
					'<td class="cell100 column4">' + data.Pulse + '</td>' +
					'<td class="cell100 column5">' + data.OSat + '</td>' +
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