// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function(event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    const colorForm = document.querySelector('form');
    let colorName = colorForm["name"].value;
    let color1 = colorForm["primary_color"].value;
    let color2 = colorForm["secondary_color"].value;
    let color3 = colorForm["teritary_color"].value;
    let color4 = colorForm["accent_1"].value;
    let color5 = colorForm["accent_2"].value;
    let con = getContrast(color1, color2);
    if (colorName === "") {
        alert("Color palette needs a name!");
        return;
    }
    let json = { name: colorName, primary_color: color1, secondary_color: color2, teritary_color: color3, accent_1: color4, accent_2: color5, contrast: con };
    let body = JSON.stringify(json);
    const response = await fetch('/json', {
        method: 'POST',
        body
    });
    if (!response.ok) {
        alert("Color palette with that name already exists!");
        throw new Error("Database error");
    }
    const data = await response.json();
    getData(data);
    document.getElementById("colorForm").reset();
}

function getData(data) {
    const table = document.createElement("table");
    data.forEach(item => {
        const tr = table.insertRow();

        const deleteButton = tr.insertCell();
        deleteButton.appendChild(makeDeleteButton(item));

        const td = tr.insertCell();
        td.appendChild(document.createTextNode(item["name"]));

        const color1 = tr.insertCell();
        pc = item["primary_color"];
        color1.appendChild(document.createTextNode(pc))
        color1.style.backgroundColor = pc;
        if (checkBrightness(pc)) {
            color1.style.color = "black";
        }

        const color2 = tr.insertCell();
        pc = item["secondary_color"];
        color2.appendChild(document.createTextNode(pc))
        color2.style.backgroundColor = pc;
        if (checkBrightness(pc)) {
            color2.style.color = "black";
        }
        const color3 = tr.insertCell();
        pc = item["teritary_color"];
        color3.appendChild(document.createTextNode(pc))
        color3.style.backgroundColor = pc;
        if (checkBrightness(pc)) {
            color3.style.color = "black";
        }
        const color4 = tr.insertCell();
        pc = item["accent_1"];
        color4.appendChild(document.createTextNode(pc))
        color4.style.backgroundColor = pc;
        if (checkBrightness(pc)) {
            color4.style.color = "black";
        }
        const color5 = tr.insertCell();
        pc = item["accent_2"];
        color5.appendChild(document.createTextNode(pc))
        color5.style.backgroundColor = pc;
        if (checkBrightness(pc)) {
            color5.style.color = "black";
        }

    })
    let tableContainer = document.getElementById("displayTable");
    tableContainer.innerHTML = '';
    tableContainer.append(table);
}

// returns true if color is too bright for white text
function checkBrightness(color) {
    var c = color.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // function for luma value
    if (luma > 160) {
        return true;
    }
    return false;
}

function getContrast(color1, color2) {
    let brightness1 = checkBrightness(color1);
    let brightness2 = checkBrightness(color2);
    return (brightness1 + 0.05) / (brightness2 + 0.05);
}

function makeDeleteButton(item) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="fa-solid fa-x"></i>`;
    button.className = "deleteButton";
    button.onclick = () => {
        deleteItem(item)
    };
    return button;
}

async function deleteItem(item) {
    let body = JSON.stringify(item);
    const response = await fetch('/json', {
        method: 'DELETE',
        body
    })

    const data = await response.json()
    getData(data);
}

window.onload = async function() {
    const button = document.querySelector("button");
    button.onclick = submit;
    const table = await fetch('/json', { method: 'GET' });
    const data = await table.json();
    getData(data);
}