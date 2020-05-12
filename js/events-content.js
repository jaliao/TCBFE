/*js version 2020-5-4 4pm update*/ 
//events-content.js

// Client ID and API key from the Developer Console
var CLIENT_ID = '210078864362-qae06rotg828aeem1s1oprum0arv1ah3.apps.googleusercontent.com';
var API_KEY = 'AIzaSyC97R3obR1wbJRAxPafXZ954ukVHNPvDLQ';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.events";

var addEventBtn = document.getElementById('ADD_EVENT');
var viewEventBtn = document.getElementById('VIEW_EVENT');
var eventlink;
//var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

		addEventBtn.onclick = handleAuthClick

		//signoutButton.onclick = handleSignoutClick;
	}, function (error) {
		appendPre(JSON.stringify(error, null, 2));
	});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		//authorizeButton.style.display = 'none';
		//signoutButton.style.display = 'block';
		handleAddEvent();
	} else {
		//authorizeButton.style.display = 'block';
		//signoutButton.style.display = 'none';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
	var pre = document.getElementById('content');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

var _eventTitle = document.getElementById("EVENT_TITLE").textContent,
	_eventInfo = document.getElementById("EVENT_INFO").textContent,
	_eventStartDate = document.getElementById("EVENT_START_TIME").getAttribute("data-time"),
	_eventEndDate = document.getElementById("EVENT_END_TIME").getAttribute("data-time"),
	_eventLocation = document.querySelector(".footer .address").textContent;

_eventInfo = _eventInfo.trim()
_eventStartDate = moment(_eventStartDate)
_eventEndDate = moment(_eventEndDate)

//formalize

var event = {
	'summary': _eventTitle,
	'location': 'The Central Boulevard',
	'description': _eventInfo,
	'start': {
		'dateTime': _eventStartDate,//relpace with eventTime
	},
	'end': {
		'dateTime': _eventEndDate,//relpace with eventTime
	}
};

var handleAtferEventAdded = function () {

	addEventBtn.style.display = 'none';
	viewEventBtn.style.display = 'block';
	viewEventBtn.href = eventlink;
}

var handleAddEvent = function () {

	var request = gapi.client.calendar.events.insert({
		'calendarId': 'primary',
		'resource': event
	});

	request.execute(function (event) {
		handleSignoutClick()
		//window.open( event.htmlLink )
		//appendPre('Event created: ' + event.htmlLink);
		eventlink = event.htmlLink
		console.log("eventlink=", eventlink)
		handleAtferEventAdded()
	});

}


let eventAdded = false;

$(function(){


	function app(){

		handleClientLoad()

		let startDate = document.getElementById("EVENT_START_TIME"),
			endDate = document.getElementById("EVENT_END_TIME");

		let dateformat = 'HH:mm ddd, DD/MM/YYYY';

		let _startDate = startDate.getAttribute("data-time")
		let _endDate = endDate.getAttribute("data-time")


		startDate.textContent = dateFormalizing(_startDate,dateformat)
		endDate.textContent = dateFormalizing(_endDate,dateformat)
		
	}

	app()

})
