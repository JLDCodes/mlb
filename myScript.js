function initialize() {
	//create pulldown menus
	document.getElementById("yearPulldown").options.length = 0;
	document.getElementById("monthPulldown").options.length = 0;
        document.getElementById("dayPulldown").options.length = 0;
            
        //create elements inside the pulldown menu
        var year = ["2015", "2016", "2017"];
        var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var day = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
	              "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
            
	// make the first space blank as default 
	document.getElementById("yearPulldown").options[0] = new Option("");
        // make the first space blank as default 
	document.getElementById("monthPulldown").options[0] = new Option("");
        // make the first space blank as default 
        document.getElementById("dayPulldown").options[0] = new Option("");
            
			
        // add new items to the pulldown list
        for (var i = 0; i < year.length; i++) {
	document.getElementById("yearPulldown").options[i + 1] = new Option(year[i]);
	}
          
	for (var i = 0; i < day.length; i++) {
	document.getElementById("dayPulldown").options[i + 1] = new Option(day[i]);
	}
        document.getElementById("monthPulldown").options[0] = new Option("");
            
	for (var i = 0; i < month.length; i++) {
	document.getElementById("monthPulldown").options[i + 1] = new Option(month[i]);
	}
}
		
	
// return code values from requests
	const ISFINISHED = 4;
	const ISOK = 200;
        var jsObject;//making it global in order to save changes

	// AJAX asynchronous XMLHttpRequest for the JSON
	// from the site which includes year/month/day
	// callback function
	var counter = 0;
function getJSONAsync(url) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
	if (request.readyState === ISFINISHED && request.status === ISOK) {
			
      	// convert the returned data to a JavaScript object
	jsObject = JSON.parse(request.responseText);
	counter = 0;
	fetch();    
	}
                
};
	// open a connection using the URL
	request.open("GET", url);
	// send the GET request
	request.send();
	}

	// onload event handler creates the URL
	// for the given year month and day
	function getBaseballDataAsynch() {
		var year = yearPulldown.options[yearPulldown.selectedIndex].text;
		var month = monthPulldown.options[monthPulldown.selectedIndex].text;
		var day = dayPulldown.options[dayPulldown.selectedIndex].text;
		// concact our data to the url
		var tempURL = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
		// use an asynchronous call to gather data
		// the result will be seen above in the callBack function
		getJSONAsync(tempURL);
	}
        
function nextGame(){
       counter++;
       // if we are at the end of the list- cycle back to the start
       if (counter > jsObject.data.games.game.length-1){
       counter = 0;
	}
      	fetch();			
}
        
 function previousGame(){
     counter--;
    //if we are at the start and try to go back- go to the end
    if (counter < 0 ) {
      counter = jsObject.data.games.game.length-1;
      }
    fetch();
 }
        
        
function fetch() {
   //set up variables to be displayed 
     var homeTeam = jsObject.data.games.game[counter].home_team_name;
     var venue = jsObject.data.games.game[counter].venue;
     var winPitFirst = jsObject.data.games.game[counter].winning_pitcher.first;
     var winPitLast = jsObject.data.games.game[counter].winning_pitcher.last;
	 var fullNameWinner = winPitFirst + " " + winPitLast;
	 var loserPitFirst = jsObject.data.games.game[counter].losing_pitcher.first;
     var loserPitLast = jsObject.data.games.game[counter].losing_pitcher.last;
     var fullNameLoser = loserPitFirst + " " + loserPitLast;
     var awayTeam = jsObject.data.games.game[counter].away_team_name;  
                    
	 // display all the data
	document.getElementById("homeTeam").value = homeTeam;
    document.getElementById("awayTeam").value = awayTeam;
	document.getElementById("winPitch").value = fullNameWinner;
    document.getElementById("losingPitch").value = fullNameLoser;
    document.getElementById("venue").value = venue;
}
        

        //***********************************************************************************
        //I was having fun doing this project and decided to try to implement a save function
        //It will save changes made to the displayed details, Once you load
        //another game day the changes get overridden by the JSON. Awesome!
//***********************************************************************************
function saveData() {

	jsObject.data.games.game[counter].home_team_name = document.getElementById("homeTeam").value;
	jsObject.data.games.game[counter].away_team_name = document.getElementById("awayTeam").value;
	var nameArray = document.getElementById("winPitch").value.split(' ');
	jsObject.data.games.game[counter].winning_pitcher.first = nameArray[0];
	jsObject.data.games.game[counter].winning_pitcher.last = nameArray[1];
	var nameArrayLoser = document.getElementById("losingPitch").value.split(' ');
	jsObject.data.games.game[counter].losing_pitcher.first = nameArrayLoser[0];
	jsObject.data.games.game[counter].losing_pitcher.last = nameArrayLoser[1];
	fullNameLoser = document.getElementById("awayTeam").value;
	jsObject.data.games.game[counter].venue = document.getElementById("venue").value;
}
        
    // acceptable text	
    var alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ  &";
    // unacceptable text
    var phoneNums = "0123456789-() "
function filterText(ref) {
			
            
		if (ref.id === "homeTeam" || ref.id === "awayTeam" || ref.id === "winPitch" || ref.id === "losingPitch" || ref.id === "venue" ) {
			filterSet = alphas;
		}				
		// Chrome, Edge and Safari use returnValue
		if (window.event.keyCode === 13) {
		alert("You pressed the enter key");
		}
    	else if (!nCharOK(window.event.keyCode)) {
		window.event.returnValue = null;
	}
}

		
function nCharOK(c) {
	var ch = (String.fromCharCode(c));
	ch = ch.toUpperCase();
	// set the flag to fail if the current char is not found in the set of numbers
	if (filterSet.indexOf(ch) !== -1) {
		return true;
	}
	else {
		return false;
	}
}
        
        
  
