// _ = helper functions
let _calculateTimeDistance = (startTime, endTime) => {
	// Bereken hoeveel tijd er tussen deze twee periodes is.
	let starttime = new Date("1/1/2013 " + startTime);
	let endtime = new Date("1/1/2013 " + endTime);
	let timebetween = endtime.getTime() - starttime.getTime();
	console.info(timebetween / 1000);
	return timebetween / 1000;

	// Tip: werk met minuten.
}

// 5 TODO: maak updateSun functie
function updateSun(){

}

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = ( totalMinutes, sunset, sunrise, queryResponse ) => {
	// In de functie moeten we eerst wat zaken ophalen en berekenen.

	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	let sun = document.querySelector('.js-sun');
	let secleft = document.querySelector('.js-time-left');

	// Bepaal het aantal minuten dat de zon al op is.
	let currtime = new Date();
	secpassed = _calculateTimeDistance(currtime.getHours() + ':' + currtime.getMinutes(), sunset);
	minpassed = Math.floor(secpassed / 60);
	console.info(minpassed);

	secleft.innerHTML = _calculateTimeDistance(getTwentyFourHourTime(queryResponse.query.results.channel.lastBuildDate.substring(17, 26)),getTwentyFourHourTime(queryResponse.query.results.channel.astronomy.sunset))/60;
	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	let totalseconds = _calculateTimeDistance(sunrise, sunset);
	console.info(((totalseconds - secpassed) / totalseconds)*100 + "%");
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.


	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is

	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
}

// 3 Met de data van de API kunnen we de app opvullen
let showResult = ( queryResponse ) => {
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.

	let locatie = document.querySelector('.js-location');
	locatie.innerHTML = queryResponse.query.results.channel.location.city + ", " + queryResponse.query.results.channel.location.country;
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.

	let sunriselabel = document.querySelector('.js-sunrise');
	let sunrise = getTwentyFourHourTime(queryResponse.query.results.channel.astronomy.sunrise);
	sunriselabel.innerHTML = sunrise;

	let sunsetlabel = document.querySelector('.js-sunset');
	let sunset = getTwentyFourHourTime(queryResponse.query.results.channel.astronomy.sunset);
	sunsetlabel.innerHTML = sunset;

	timebetween = _calculateTimeDistance(sunrise, sunset);
	console.info(timebetween);
	// Hier gaan we een functie oproepen die de zon een bepaalde postie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
	placeSunAndStartMoving(timebetween, sunset, sunrise, queryResponse);


};

function getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2013 " + amPmString);
	console.info(d.getHours() + ':' + d.getMinutes());
    return d.getHours() + ':' + d.getMinutes();
}


// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = ( lat, lon ) => {
	// Eerst bouwen we onze url op
	const url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22(" + lat + "%2C%20" + lon + ")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	// en doen we een query met de Yahoo query language

	// Met de fetch API proberen we de data op te halen.
		fetch( url )
			.then(function (response) {
				console.log( response );
      			return response.json();
			})
		    .then(function ( json ) {
				console.log(json);
				showResult(json);
	});
	// Als dat gelukt is, gaan we naar onze showResult functie.

}

document.addEventListener( 'DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	getAPI( 50.8027841, 3.2097454 );
});
