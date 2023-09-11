// FRONT-END (CLIENT) JAVASCRIPT HERE

let playerData;

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const name = document.querySelector( '#name' )
  const outside = document.querySelector( '#outside' )
  const inside = document.querySelector( '#inside' )
  const athleticism = document.querySelector( '#athleticism' )
  const playmaking = document.querySelector( '#playmaking' )
  const defense = document.querySelector( '#defense' )
  const json = {
          "name": name.value,
          "outside": parseInt(outside.value),
          "inside": parseInt(inside.value),
          "athleticism": parseInt(athleticism.value),
          "playmaking": parseInt(playmaking.value),
          "defense": parseInt(defense.value),
          "rating": 1
        },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.text();

  getDataLoad()
}

const deletePlayerOnServer = async function(name){
  //event.preventDefault()

  // const dropdown = document.getElementById('deleteDropdown');
  // const name = dropdown.options[dropdown.selectedIndex].name;
  const body = name
  console.log("body", body)
  const response = await fetch( '/delete', {
    method:'POST',
    body 
  })
  const data = await response.text();
  console.log( 'data:', data )
  getDataLoad()
}

const getData = async function( event ) {
  event.preventDefault()

  const response = await fetch( '/data', {
    method:'GET' 
  })

  const data = await response.text()
  console.log( 'data:', JSON.parse(data) )
  const jsonData = JSON.parse(data)
  populateTable(jsonData);
}
const getDataLoad = async function( event ) {

  const response = await fetch( '/data', {
    method:'GET' 
  })

  const data = await response.text()
  const jsonData = JSON.parse(data)
  //update table
  populateTable(jsonData);
  //update dropdown
 
 
  loadDeleteDropdown(jsonData)
}

const loadDeleteDropdown = function (data){
  const dropdown = document.getElementById('deleteDropdown')
  dropdown.innerHTML = '';
  data.forEach(item => {
    const option = document.createElement('option');
    option.textContent = item.name;
    dropdown.appendChild(option);
  });
}


window.onload = function() {
  document.getElementById('tab1').style.display = "block";
  const button = document.querySelector("#submit");
  button.onclick = submit;
  getDataLoad();
}

function populateTable(data) {
  const tableBody = document.getElementById("playerData");
  tableBody.innerHTML = ''
  for(player in data){
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${data[player].name}</td>
          <td>${data[player].outside}</td>
          <td>${data[player].inside}</td>
          <td>${data[player].athleticism}</td>
          <td>${data[player].playmaking}</td>
          <td>${data[player].defense}</td>
          <td>${data[player].rating}</td>

      `;

      tableBody.appendChild(row);
  };
}

const nbaPlayerData = [
  {
    "name": "LeBron James",
    "outside": 88,
    "inside": 90,
    "athleticism": 92,
    "playmaking": 96,
    "defense": 85,
    "rating": 90
  },
  {
    "name": "Stephen Curry",
    "outside": 98,
    "inside": 75,
    "athleticism": 88,
    "playmaking": 92,
    "defense": 70,
    "rating": 85
  },
  {
    "name": "Giannis Antetokounmpo",
    "outside": 78,
    "inside": 95,
    "athleticism": 97,
    "playmaking": 84,
    "defense": 90,
    "rating": 89
  },
  {
    "name": "Kevin Durant",
    "outside": 95,
    "inside": 88,
    "athleticism": 90,
    "playmaking": 85,
    "defense": 82,
    "rating": 88
  },
  {
    "name": "Kawhi Leonard",
    "outside": 88,
    "inside": 80,
    "athleticism": 92,
    "playmaking": 75,
    "defense": 95,
    "rating": 86
  },
  {
    "name": "Luka Dončić",
    "outside": 90,
    "inside": 85,
    "athleticism": 86,
    "playmaking": 94,
    "defense": 78,
    "rating": 86
  },
  {
    "name": "Anthony Davis",
    "outside": 75,
    "inside": 92,
    "athleticism": 89,
    "playmaking": 72,
    "defense": 96,
    "rating": 85
  },
  {
    "name": "James Harden",
    "outside": 96,
    "inside": 85,
    "athleticism": 84,
    "playmaking": 93,
    "defense": 72,
    "rating": 86
  },
  {
    "name": "Joel Embiid",
    "outside": 72,
    "inside": 95,
    "athleticism": 87,
    "playmaking": 70,
    "defense": 89,
    "rating": 83
  },
  {
    "name": "Damian Lillard",
    "outside": 97,
    "inside": 75,
    "athleticism": 86,
    "playmaking": 90,
    "defense": 68,
    "rating": 83
  },
  {
    "name": "Jimmy Butler",
    "outside": 84,
    "inside": 88,
    "athleticism": 86,
    "playmaking": 82,
    "defense": 90,
    "rating": 86
  },
  {
    "name": "Karl-Anthony Towns",
    "outside": 80,
    "inside": 85,
    "athleticism": 84,
    "playmaking": 72,
    "defense": 78,
    "rating": 80
  },
  {
    "name": "Devin Booker",
    "outside": 92,
    "inside": 78,
    "athleticism": 86,
    "playmaking": 80,
    "defense": 70,
    "rating": 81
  },
  {
    "name": "Rudy Gobert",
    "outside": 45,
    "inside": 88,
    "athleticism": 80,
    "playmaking": 55,
    "defense": 96,
    "rating": 73
  },
  {
    "name": "Chris Paul",
    "outside": 87,
    "inside": 70,
    "athleticism": 82,
    "playmaking": 95,
    "defense": 76,
    "rating": 82
  },
 

];



// tab switcher
function openTab(event, tabName) {
  var i, tabcontent, tablinks;
  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  // Deactivate all tab links
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }
  // Show the selected tab content
  document.getElementById(tabName).style.display = "block";
  //if tab 2, update list
  if(tabName === 'tab2'){
    //update contents of dropdown 
  }
  // Activate the clicked tab link
  event.currentTarget.classList.add("active");
}



// Event listener for the delete button click

const deletePlayer = function(){
  //delete button for dropdown
  const dropdown = document.getElementById('deleteDropdown');
  // Get the selected option
  const selectedOption = dropdown.options[dropdown.selectedIndex];
  
  if (selectedOption) {
    // Remove the selected option
    dropdown.remove(selectedOption.index);
    //console.log(selectedOption.innerHTML)
    deletePlayerOnServer(selectedOption.innerHTML)
  } else {
    alert('No option selected to delete.');
  }
}
