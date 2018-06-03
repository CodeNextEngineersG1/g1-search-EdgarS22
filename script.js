/* write your script here */
var database;
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var autoSuggestions = document.getElementById("auto-suggestions");
var display = document.getElementById("display");

searchBar.addEventListener("input", getAutoSuggestions);
searchBar.addEventListener("keypress", checkKey);
searchButton.addEventListener("click", processInput);

loadData();

function loadData() {
  searchBar.style.display = "none";
  searchButton.style.display = "none";
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj;
      console.log("Database Loaded Successfully");
    }).then(function() {
      searchBar.style.display = "block";
      searchButton.style.display = "block";
    })
      });
    }



function checkKey(e){
var key = e.which || e.keyCode;
if(key == 13){
  //console.log("You pressed enter!");
  processInput();
}

}

function processInput(){
let cleanedInput = searchBar.value.toLowerCase().trim();
document.getElementById("auto-suggestions").innerHTML= "";
document.getElementById("auto-suggestions").style.display= "none";
document.getElementById("search-bar").value= "";

let databaseRecord = getRecord(cleanedInput);

if(databaseRecord != null){
  displayRecord(databaseRecord);
}else{
  displaySuggestions(getSuggestions(cleanedInput));
}
}

function getRecord(cleanedInput){
  for(let i = 0; i < database.length; i++){
    let cleanedRecordName = database[i].name.toLowerCase().trim();
    if(cleanedInput == cleanedRecordName){
      return database[i];
    }
  }
  return null;
}

function displayRecord(databaseRecord){
  var recordName = document.createElement("h2");
  recordName.innerHTML = databaseRecord.name;
  var recordPicture = document.createElement("img");
  recordPicture.src = databaseRecord.picture;
  var recordBorn = document.createElement("p");
  recordBorn.innerHTML = "<b>Born:</b> " + databaseRecord.born;
  var recordSchool = document.createElement("p");
  recordSchool.innerHTML = "<b>School:</b> " + databaseRecord.school;
  var recordBio = document.createElement("p");
  recordBio.innerHTML = "<b>Bio:</b> " + databaseRecord.bio;
  var recordDied = document.createElement("p");
  if(databaseRecord.died != null) {
    recordDied.innerHTML = "<b>Died:</b> " + databaseRecord.died;
  }
    else {
      recordDied.innerHTML = "<b>Died:</b> N/A";
    }
  display.appendChild(recordName);
  display.appendChild(recordPicture);
  display.appendChild(recordBorn);
  display.appendChild(recordSchool);
  display.appendChild(recordBio);
  display.appendChild(recordDied);

}

function getAutoSuggestions(){
  let cleanedInput = searchBar.value.toLowerCase().trim();
  document.getElementById("auto-suggestions").innerHTML= "";
  for(let i = 0; i < database.length; i++){
    let cleanedRecordName = database[i].name.toLowerCase().trim();
  if(cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0){
    let matching = cleanedRecordName.substring(0, searchBar.value.length);
    let remaining = cleanedRecordName.substring(searchBar.value.length);
    let result = matching + "<b>" + remaining + "</b>";
    let button = document.createElement("button");
    button.innerHTML = result;
    button.style.display = "block";
    button.className = "suggestions";
    activateSuggestionButton(button, database[i]);
    autoSuggestions.appendChild(button);
  }
 }
if(autoSuggestions.hasChildNodes()){
  autoSuggestions.style.display = "block";
}else{
  autoSuggestions.style.display = "none";

}
}

function activateSuggestionButton(button, record) {
  button.addEventListener("click", function() {
    displayRecord(record);
    document.getElementById("auto-suggestions").innerHTML = "";
    document.getElementById("auto-suggestions").style.display = "none";
    document.getElementById("search-bar").value = "";
  });
}

function getSuggestions(cleanedInput){
  let suggestions = [i];
  for(let i = 0; i < database.length; i++){
    let cleanedRecordName = database[i].name.toLowerCase().trim();
    if(cleanedRecordName.startsWith(cleanedInput) && cleanedRecordName.length > 0){
      suggestions.push(database[i]);
    }
  }
  return suggestions;
}

function displaySuggestions(suggestions){
  document.getElementById("display").innerHTML = "";
  let paragraph = document.createElement("p");
  if(suggestion.length > 0){
    paragraph.innerHTML = "Did you mean:";
    display.appendChild(paragraph);
    for(let i = 0; i < database.length; i++){
      let button = document.createElement("button");
      button.innerHTML = suggestions[i].name;
      button.style.display = "block";
      button.className = "suggestion";
      activateSuggestionButton("button", suggestions[i]);
      document.getElementById("display").appendChild(button);
    }
  }else{
    paragraph.innerHTML = "No results!";
    display.appendChild(paragraph);
  }

}
