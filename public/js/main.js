let dte, list, appdata = [];

// Function to handle form submission
const submit = async function (event) {
  event.preventDefault();

  let json,
  evt = event.target

  if (evt.getAttribute('formaction') == '/submit'){
    let brandName = document.getElementById("brand-name");
    let designerName = document.getElementById("designer-name");
    let phoneNumber = document.getElementById("phone-number");
    let brandType = document.getElementById("brand-type");
    json = {
      brandName: brandName.value,
      designerName: designerName.value,
      phoneNumber: parseInt(phoneNumber.value),
      brandType: brandType.value,
    }
  } else {
    json = appdata[evt.getAttribute('id')]
  }

  const response = await fetch(evt.getAttribute('formaction'), {
    method: 'POST',
    body: JSON.stringify(json),
  });

  if (response.status === 400) {
    const errorResponse = await response.json();
    alert(errorResponse.error);
    return;
  }

  let data = await response.json();
  dte = await JSON.parse(data.data);
  document.getElementById('reset').click();

  // Update the designer list
  updateDesignerList(data);
};

// Function to update the designer list
function updateDesignerList(data) {
  list = document.getElementById('designerList');

  if (list == null) {
    list = document.createElement('ul');
    list.id = 'designerList';
    document.getElementById('designer-list').appendChild(list);
  } else {
    list.innerHTML = '';
  }

  document.getElementById('recordCount').innerHTML = "Designer List - " + data.recordCount;

  // Append designer information and buttons
  dte.forEach(d => {
    const listItem = document.createElement('li');

    // const designerInfoDiv = document.createElement('div');
    listItem.innerHTML = `Brand Name: ${d.brandName}, Designer Name: ${d.designerName}, Phone Number: ${d.phoneNumber}, Brand Type: ${d.brandType} <button id=${d.phoneNumber} formaction="/delete" class="delete-btn")>Delete</button>`;
    appdata[d.phoneNumber] = d
    list.appendChild(listItem);
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
      button.addEventListener('click', submit);
  });

}

window.onload = function () {
  const addDesigner = document.getElementById('addDesigner');
  addDesigner.onclick = submit;
};

