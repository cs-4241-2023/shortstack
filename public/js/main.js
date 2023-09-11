let dte, list;

// Function to handle form submission
const submit = async function (event) {
  event.preventDefault();

  const brandName = document.getElementById("brand-name");
  const designerName = document.getElementById("designer-name");
  const phoneNumber = document.getElementById("phone-number");
  const brandType = document.getElementById("brand-type");
  const json = {
    brandName: brandName.value,
    designerName: designerName.value,
    phoneNumber: parseInt(phoneNumber.value),
    brandType: brandType.value,
  };
  let evt = event.target
  let dJSON = JSON.stringify(document.getElementById(evt.getAttribute('id')).innerText.replace('Delete', '').trim().replace('"',''))
  //let deleteJSON = dJSON.split(",")
  console.log(dJSON)
  const fJSON = document.getElementById(evt.getAttribute('id')).innerText.replace('Delete', '').trim().replace('"','')
  pairs = fJSON.split(", ")

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
    listItem.innerHTML = `Brand Name: ${d.brandName}, Designer Name: ${d.designerName}, Phone Number: ${d.phoneNumber}, Brand Type: ${d.brandType} <button id=${d.phoneNumber} formaction="/delete" class="delete-btn">Delete</button>`;
    listItem.id = d.phoneNumber
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
