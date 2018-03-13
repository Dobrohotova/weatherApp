// $(function (){

// 	$('#button').on('click', function(){
// 		$.ajax('https://api.openweathermap.org/data/2.5/weather', {
// 			"type" : "GET",
// 			"data" : {
// 				"q" : "Skopje"
// 			}
// 		}).success(function(data){
// 			$('#cityName').html(data.name);
// 		});
// 	});
// });


$(document).ready(function(){

	getLocation();



var x = document.getElementById("mapP");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";

    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=87df752ff544d906183cc03f17b4c9fc', function (data) {
			// console.log(city);

			$('#cityName').html(data.name);
			$('#description').html(data.weather[0].main);
			$('#temperature').html(data.main.temp);
			$('#humidity').html(data.main.humidity);
			$('#mainPressure').html(data.main.pressure);
			$('#windSpeed').html(data.wind.speed);

			var iconUrl = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
			$('#image').attr("src", iconUrl);

	});

	$.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=87df752ff544d906183cc03f17b4c9fc', function (data) {
			for(var i = 0; i < 7; i++){
				var date = data.list[i].dt_txt;
				var time = date.substr(11, 18);
				$('#dayTime' + i).html(time);
				$('#temp' + i).html(data.list[i].main.temp);
				var iconUrl1 = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
				$('#img' + i).attr("src", iconUrl1);
				$('#description' + i).html(data.list[i].weather[0].description);
			}



		});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}



$(function (){

	$('#button').on('click', function (){
		var city = $('#city').val().replace(' ', '+');
		$.get('http://api.openweathermap.org/data/2.5/weather?q='+city+',mk&units=metric&APPID=87df752ff544d906183cc03f17b4c9fc', function (data) {
			// console.log(city);
			$('#cityName').html(data.name);
			$('#description').html(data.weather[0].main);
			$('#temperature').html(data.main.temp);
			$('#humidity').html(data.main.humidity);
			$('#mainPressure').html(data.main.pressure);
			$('#windSpeed').html(data.wind.speed);

			var iconUrl = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
			$('#image').attr("src", iconUrl);


		});
		
		$.get('http://api.openweathermap.org/data/2.5/forecast?q='+city+',mk&units=metric&APPID=87df752ff544d906183cc03f17b4c9fc', function (data) {
			for(var i = 0; i < 7; i++){
				var date = data.list[i].dt_txt;
				var time = date.substr(11, 18);
				$('#dayTime' + i).html(time);
				$('#temp' + i).html(data.list[i].main.temp);
				var iconUrl1 = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
				$('#img' + i).attr("src", iconUrl1);
				$('#description' + i).html(data.list[i].weather[0].description);
			}
	
			

			// $('#dayTime2').html(data.list[1].dt_txt);
			// $('#two').html(data.list[1].main.temp);
			// var iconUrl2 = 'http://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png';
			// $('#img2').attr("src", iconUrl2);

			// $('#dayTime3').html(data.list[2].dt_txt);
			// $('#three').html(data.list[2].main.temp);
			// var iconUrl3 = 'http://openweathermap.org/img/w/' + data.list[2].weather[0].icon + '.png';
			// $('#img3').attr("src", iconUrl3);

			// $('#dayTime4').html(data.list[3].dt_txt);
			// $('#four').html(data.list[3].main.temp);
			// var iconUrl4 = 'http://openweathermap.org/img/w/' + data.list[3].weather[0].icon + '.png';
			// $('#img4').attr("src", iconUrl4);

			// $('#dayTime5').html(data.list[4].dt_txt);
			// $('#five').html(data.list[4].main.temp);
			// var iconUrl5 = 'http://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png';
			// $('#img5').attr("src", iconUrl5);

			// $('#dayTime6').html(data.list[5].dt_txt);
			// $('#six').html(data.list[5].main.temp);
			// var iconUrl6 = 'http://openweathermap.org/img/w/' + data.list[5].weather[0].icon + '.png';
			// $('#img6').attr("src", iconUrl6);

			// $('#dayTime7').html(data.list[6].dt_txt);
			// $('#seven').html(data.list[6].main.temp);
			// var iconUrl7 = 'http://openweathermap.org/img/w/' + data.list[6].weather[0].icon + '.png';
			// $('#img7').attr("src", iconUrl7);



		});

	});
});

});