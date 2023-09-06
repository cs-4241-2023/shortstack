// FRONT-END (CLIENT) JAVASCRIPT HERE

const toggleView = function() {
  const formSwitch = document.getElementById("formSwitch");
  const addDesignerSection = document.getElementById("add-designer-section");
  const updateDesignerSection = document.getElementById("update-designer-section");

  formSwitch.addEventListener("change", function () {
      if (formSwitch.checked) {
          addDesignerSection.style.display = "none";
          updateDesignerSection.style.display = "flex";
      } else {
          addDesignerSection.style.display = "flex";
          updateDesignerSection.style.display = "none";
      }
  });
}

const submit = async function( event ) {
  event.preventDefault()
  
  const brandName = document.getElementById("brand-name");
  const designerName = document.getElementById("designer-name");
  const phoneNumber = document.getElementById("phone-number");
  const brandType = document.getElementById("brand-type");
  const json = { 
          brandName: brandName.value ,
          designerName: designerName.value ,
          phoneNumber: parseInt(phoneNumber.value) ,
          brandType: brandType.value 
        }


  const response = await fetch( '/submit', {
    method:'POST',
    body: JSON.stringify(json) 
  })

  if (response.status === 400) {
        const errorResponse = await response.json();
        alert(errorResponse.error);
        return;
    }

  const data = await response.json()

  brandName.value = '';
  designerName.value = '';
  phoneNumber.value = '';
  brandType.value = '';

  console.log( 'text:', text )
}

window.onload = function() {
  const addDesigner = document.getElementById('addDesigner')
  addDesigner.onclick = submit;

  const updateDesigner = document.getElementById('updateDesigner')
  updateDesigner.onclick = submit;

  const formSwitch = document.getElementById('formSwitch')
  formSwitch.addEventListener('click', toggleView)
}