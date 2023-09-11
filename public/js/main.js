let total = 0.00
const submit = async function( event ) {
  event.preventDefault()
  
  let err = document.getElementsByClassName("errorMsg")[0];
  const itemin = document.querySelector( "#item" ),
        pricein = document.querySelector("#price"),
        json = { item: {itemName: itemin.value, price: pricein.value} },
        body = JSON.stringify( json )
  if(isNaN(parseFloat(json.item.price)))
  {
    err.style.display = "flex"
    err.style.visibility = "visible"
    return false;
  }
  else{
    err.style.display = "none"
    err.style.visibility = "hidden"
  }

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()
  let list;
  let tmp;
  if(document.getElementById("groceryList") === null)
  {
    list = document.createElement('ul')
    list.setAttribute("id", "groceryList")
  }
  else{
    list = document.getElementById("groceryList")
    tmp = [].slice.call(list.children);
  }
  console.log(tmp)
  if(tmp[1].innerText ==  "Item Name: Price($)")
  {
    console.log(tmp[1])
    list.removeChild(tmp[1])
    const li = document.createElement('li')
    const myIn = document.createElement('input')
    const checkLabel = document.createElement("label")
    checkLabel.appendChild(document.createTextNode(data.groceryList[0].itemName[0].toUpperCase() + data.groceryList[0].itemName.slice(1) + `: $${data.groceryList[0].price}`))
    myIn.setAttribute("type", "checkbox")
    myIn.className = "giBox" 
    li.className = "groceryItem"
    li.appendChild(myIn);
    li.appendChild(checkLabel);
    list.appendChild( li )
  }
    for(let i = 0; i < data.groceryList.length; i++)
    {
      console.log(i, tmp.length)
      if(i >= (tmp.length - 1))
      {
        const li = document.createElement('li')
        const myIn = document.createElement('input')
        const checkLabel = document.createElement("label")
        checkLabel.appendChild(document.createTextNode(data.groceryList[i].itemName[0].toUpperCase() + data.groceryList[i].itemName.slice(1) + `: $${data.groceryList[i].price}`))
        myIn.setAttribute("type", "checkbox")
        myIn.className = "giBox" 
        li.className = "groceryItem"
        li.appendChild(myIn);
        li.appendChild(checkLabel);
        list.appendChild( li )
      }
    }
    let tp = document.getElementById("tpNum");
    tp.innerText = `$${data.totalPrice.totalPrice.toFixed(2)}`
    total = parseFloat(data.totalPrice.totalPrice.toFixed(2))
  
}

const reset = async function( event )
{
  event.preventDefault();
  workingTotal = 0.0
  let body = JSON.stringify({id: "reset"})

  const resetResponse = await fetch( "/reset", {
    method:'DELETE',
    body 
  })

  let list;
  if(document.getElementById("groceryList") === null)
  {
    list = document.createElement('ul')
    list.setAttribute("id", "groceryList")
    list.appendChild(listLabel)
    list.appendChild(defaultListItem);
    document.getElementById("lists-container").appendChild(list)
  }
  else{
    list = document.getElementById("groceryList")
    list.innerHTML = ""
  }
  list.appendChild(listLabel)
  list.appendChild(defaultListItem);

  let tp = document.getElementById("tpNum");
  tp.innerText = `$0.00`
  tp = document.getElementById("icNum")
  tp.innerText = `$0.00`
  tp = document.getElementById("difNum")
  tp.innerText = `$0.00`

  document.getElementById("cartList").innerHTML = ""
  document.getElementById("cartList").appendChild(cartLabel)
}

const defaultListItem = document.createElement("li");
const defaultIn = document.createElement('input')
const defaultLabel = document.createElement("label")
const cartLabel = document.createElement("label")
const listLabel = document.createElement("label")

let workingTotal = 0.00;
let glist;
window.onload = function() {

  defaultLabel.appendChild(document.createTextNode("Item Name: Price($)"))
  defaultIn.setAttribute("type", "checkbox")
  defaultListItem.className = "groceryItem"
  defaultListItem.appendChild(defaultIn);
  defaultListItem.appendChild(defaultLabel);
  listLabel.appendChild(document.createTextNode("Check items In Cart"))
  listLabel.id = "glist-lab"
  cartLabel.appendChild(document.createTextNode("In Your Cart"))
  cartLabel.id = "cart-lab"

  const button = document.getElementById("submit");
  const resetBut = document.getElementById("reset");
  button.onclick = submit;
  resetBut.onclick = reset;

  gList = document.getElementById("groceryList");

  gList.addEventListener('change', function(e){

  if(e.target.classList.contains("giBox")){
    let myLi = e.target.parentElement;
    let cartList = document.getElementById("cartList");
    if(e.target.checked){
      let temp = myLi.cloneNode();
      let txt = myLi.innerText;
      let num = txt.slice(txt.indexOf("$") + 1)
      if(isNaN(parseFloat(num)))
      {
        //workingTotal+= parseFloat(num.slice(num.indexOf("$")))
        console.log(parseFloat(num.slice(num.indexOf(" "))))
        console.log(num.slice(num.indexOf("$") + 1), "NaN")
        console.log(workingTotal)
      }
      else{
        workingTotal+= parseFloat(num);
        console.log(parseFloat(num), "Num")
        console.log(workingTotal)
      }
      document.getElementById("icNum").innerText= `$${workingTotal.toFixed(2)}`;
      document.getElementById("difNum").innerText= `$${(total - workingTotal).toFixed(2)}`;
      temp.innerHTML = ""
      temp.innerText = txt
      cartList.appendChild(temp)
    }
    else{
      let arr = [].slice.call(cartList.children)
      arr.every(i => {
        if(i.innerText === myLi.innerText)
        {
          let tnum = i.innerText.slice(i.innerText.indexOf("$") + 1)
          if(isNaN(parseFloat(tnum)))
          {
            workingTotal-= parseFloat(tnum.slice(tnum.indexOf(" ") + 1))
          }
          else{
            workingTotal-= parseFloat(tnum);
          }
          document.getElementById("icNum").innerText= `$${workingTotal.toFixed(2)}`;
          document.getElementById("difNum").innerText= `$${Math.abs((total - workingTotal).toFixed(2))}`;
          i.remove()
          return false; 
        }
        return true;
      })
    }
  }
})
}
