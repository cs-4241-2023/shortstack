const addCharacter = async function (event) {


    event.preventDefault()

    const nameInput = document.querySelector('#characterName');
    const startInput = document.querySelector('#characterStart');
    const endInput = document.querySelector('#characterEnd');
    if (isNaN(startInput.value) || isNaN(endInput.value)) {
        document.getElementById("characterErrorMessage").style.display = "block";
    } else {

        document.getElementById("characterErrorMessage").style.display = "none";

        const json = { name: nameInput.value, start: startInput.value, end: endInput.value, era: "" }, body = JSON.stringify(json)

        const response = await fetch('/submit', {
            method: 'POST',
            body
        })

        const data = await response.json()

        console.log('text:', data)
        CreateCharacterTable(data);
    }

}

function CreateCharacterTable(data){

    const characterTable = document.getElementById("characterTable");
    characterTable.innerHTML = "";
    characterTable.append(CreateHeaderRow());
    for(let i = 0; i < data.length; i++){
        characterTable.append(CreateRow(data[i].name, data[i].start, data[i].end, data[i].era));
    }
}

function CreateHeaderRow() {
    let row = document.createElement("tr");
    row.append(CreateHeaderCell(""));
    row.append(CreateHeaderCell("Name"));
    row.append(CreateHeaderCell("Birth"));
    row.append(CreateHeaderCell("Death"));
    row.append(CreateHeaderCell("Eras"));
    return row;
}

function CreateHeaderCell(cellInfo) {
    const cell = document.createElement('th');
    cell.innerHTML = `<p>${cellInfo}</p>`;
    return cell;
}

function CreateCell(cellInfo){
    const cell = document.createElement('td');
    cell.innerHTML = `<p>${cellInfo}</p>`;
    return cell;
  }

function CreateRow(name, start, end, era) {
    let row = document.createElement("tr");
    row.append(CreateCell(name));
    row.append(CreateCell(start));
    row.append(CreateCell(end));
    row.append(CreateCell(era));
    return row;
}

// function DeleteRow(jsonString) {
//     console.log("Delete Row")
//     fetch("/json", {
//         method: "DELETE",
//         body: jsonString
//     }).then(() => {
//         console.log("Reload webpage")
//         location.reload()
//     })
// }

// function CreateDeleteButton(jsonString) {
//     const cell = document.createElement('td');
//     cell.className = "delete";

//     const button = document.createElement('button');
//     button.className = "delete-button";
//     button.innerHTML = `<i class="fa-solid fa-trash"></i>`;
//     button.onclick = () => {
//         DeleteRow(jsonString);
//     }

//     cell.append(button);
//     return cell;
// }

window.addEventListener('load', async function () {

    const button = document.getElementById("addCharacterButton");
    button.onclick = addCharacter;
    
    const response = await fetch('/characterData', {
        method: 'GET'
      })
    
    const data = await response.json();
    CreateCharacterTable(data);

  

})
