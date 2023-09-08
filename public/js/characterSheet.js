// const addCharacter = async function (event) {


//     event.preventDefault()

//     const eraInput = document.querySelector('#era');
//     const dateInput = document.querySelector('#date');
//     const descriptionInput = document.querySelector('#description');
//     console.log(dateInput.value);
//     if (isNaN(dateInput.value)) {
//         document.getElementById("timelineErrorMessage").style.display = "block";
//     } else {

//         document.getElementById("timelineErrorMessage").style.display = "none";

//         const json = { era: eraInput.value, date: dateInput.value, description: descriptionInput.value }, body = JSON.stringify(json)

//         const response = await fetch('/submit', {
//             method: 'POST',
//             body
//         })

//         const data = await response.json()

//         console.log('text:', data)
//         CreateTimeline(data);
//     }

// }

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

function CreateRow(name, start, end, era) {
    let row = document.createElement("tr");
    row.append(CreateDeleteButton(index));
    row.append(CreateCell(task));
    row.append(CreateCell(creationDate));
    row.append(CreateCell(deadline));
    row.append(CreateCell(priority));
    return row;
}

function DeleteRow(jsonString) {
    console.log("Delete Row")
    fetch("/json", {
        method: "DELETE",
        body: jsonString
    }).then(() => {
        console.log("Reload webpage")
        location.reload()
    })
}

function CreateDeleteButton(jsonString) {
    const cell = document.createElement('td');
    cell.className = "delete";

    const button = document.createElement('button');
    button.className = "delete-button";
    button.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    button.onclick = () => {
        DeleteRow(jsonString);
    }

    cell.append(button);
    return cell;
}

window.addEventListener('load', function () {

    const characterTable = document.getElementById("characterTable");
    let header = CreateHeaderRow()
    characterTable.append(header);

})
