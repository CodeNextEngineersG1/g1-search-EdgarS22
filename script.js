/* write your script here */
var database = [
{
  name:"Salvador Avelar",
  born:"December 23, 2001",
  died:null,
  school:"Aspire Lionel Wilson Prep",
  picture:null,
  bio:"snip"
},
{
  name:"Devin Frisbey",
  born:"August 27, 2002",
  dead:null,
  school:"Aspire Golden State Prep",
  picture:null,
  bio:"snip"
},
{
  name:"Orlando Mojica",
  born:"August 23, 2002",
  died:null,
  school:"Aspire Golden State Prep",
  picture:null,
  bio:"snip"
},
{
  name:"Edgar Suarez",
  born:"February 22, 2002",
  died:null,
  school:"Aspire Lionel Wilson Prep",
  picture:null,
  bio:"snip"
},
{
  name:"Elias Cruz",
  born:"February 5, 2002",
  died:null,
  school:"Oakland Tech",
  picture:null,
  bio:"snip"
}
];
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var autoSuggestions = document.getElementById("auto-suggestions");
var display = document.getElementById("display");

searchBar.addEventListener("keypress", checkKey);
searchButton.addEventListener("click", processInput);


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

if(databaseRecord == NOT NULL){
  displayRecord(databaseRecord);
}else{
  alert("No results");
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



}
